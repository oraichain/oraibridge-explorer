import React, { useMemo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import { Fade, Tooltip } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { foundation } from "react-syntax-highlighter/dist/esm/styles/hljs";
import BigNumber from "bignumber.js";
import copy from "copy-to-clipboard";
import Interweave from "interweave";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import { themeIds } from "src/constants/themes";
import useGithubSource from "src/hooks/useGithubSource";
import { formatOrai, formatFloat, extractValueAndUnit, getTxTypeNew } from "src/helpers/helper";
import { showAlert } from "src/store/modules/global";
import { loadMore, loadAll } from "src/store/modules/txs";
import { divide } from "src/lib/Big";
import { _, tryParseMessage, setAgoTime, getTotalTime, reduceString, reduceStringAssets } from "src/lib/scripts";
import Address from "src/components/common/Address";
import LinkRow from "src/components/common/LinkRow";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TxMessage.module.scss";
import copyIcon from "src/assets/common/copy_ic.svg";
const cx = cn.bind(styles);

const tryParseMessageBinary = data => {
	try {
		const obj = JSON.parse(atob(data));
		if (!obj) return;
		for (let key in obj) {
			if (obj[key].msg && typeof obj[key].msg === "string") {
				try {
					obj[key].msg = JSON.parse(atob(obj[key].msg));
				} catch { }
			}
		}
		return obj;
	} catch (e) {
		return { data };
	}
};

const TxMessage = ({ key, msg, data }) => {
	const dispatch = useDispatch();
	const fees = useSelector(state => state.blockchain.fees);
	const status = useSelector(state => state.blockchain.status);
	const storageData = useSelector(state => state.contact);
	const activeThemeId = useSelector(state => state.activeThemeId);
	const loadMoreValue = useSelector(state => state.txs.loadMore);
	const { data: storeCodeData, loading: loadingStoreCode, error: storeCodeError, fetch: fetchStoreCode } = useGithubSource();
	const value = msg;
	let type = msg["@type"] || "";
	const { memo } = data;

	const toolTippedImg = useMemo(() => {
		const feeValue = !_.isNil(fees[type]?.fee) ? divide(fees[type].fee, consts.NUM.BASE_MULT) : "none";
		return (
			<Tooltip
				placement='right-start'
				TransitionComponent={Fade}
				TransitionProps={{ timeout: 300 }}
				title={`Tx Fee: ${feeValue}${feeValue !== "none" ? ` BNB` : ""}`}
				disableTouchListener
				disableFocusListener>
				<img className={cx("icon")} src={getTxTypeIcon(type)} alt='' />
			</Tooltip>
		);
	}, [type, fees]);

	const messageDetails = useMemo(() => {
		const getMultiSendHeaderRow = () => {
			const validatorHeaderCell = <div className={cx("header-cell")}>Address</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [validatorHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ minWidth: "150px" }, // Address
				{ minWidth: "150px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getMultiSendDataRows = data => {
			if (!Array.isArray(data)) {
				return [];
			}
			let dataLoadMore = (loadMoreValue * 5 === value?.outputs?.length ? data : data?.slice(0, loadMoreValue * 5)) || [];
			return dataLoadMore.map(item => {
				const addressDataCell = _.isNil(item?.address) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
						{item?.address_tag || item?.address}
					</NavLink>
				);

				const amountDataCell =
					_.isNil(item?.coins?.[0]?.amount) || _.isNil(item?.coins?.[0]?.denom) ? (
						<div className={cx("align-center")}>-</div>
					) : (
						<div className={cx("amount-data-cell")}>
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>{formatOrai(item?.coins?.[0]?.amount) + " "}</span>
								<span className={cx("amount-denom")}>{item?.coins?.[0]?.denom}</span>
								<span className={cx("amount-usd")}>
									{status?.price ? " ($" + formatFloat((item?.coins?.[0]?.amount / consts.NUM.COSMOS_DECIMAL) * status.price, 4) + ")" : ""}
								</span>
							</div>
						</div>
					);

				return [addressDataCell, amountDataCell];
			});
		};

		const getInfoRow = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text")}>{_.isNil(value) ? "-" : value}</span>
			</InfoRow>
		);

		const getInfoRowThreeDots = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text-three-dots")}>{_.isNil(value) ? "-" : value}</span>
			</InfoRow>
		);

		const getInfoRowSummary = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text")}>{_.isNil(value) ? "-" : reduceStringAssets(value, 80, 10)}</span>
			</InfoRow>
		);

		const getIbcReceivedRows = value => {
			const data = JSON.parse(atob(value));
			return (
				<div>
					{getInfoRow("Denom", reduceString(data.denom))}
					{getInfoRow("Amount", data.amount)}
					{getAddressRow("Receiver", data.receiver)}
					{getInfoRow("Sender", data.sender)}
				</div>
			);
		};

		const getHtmlRow = (label, value) => (
			<InfoRow label={label}>
				<div className={cx("html")}>{_.isNil(value) ? "-" : <Interweave content={value} />}</div>
			</InfoRow>
		);

		const getCurrencyRowFromString = (label, inputString) => {
			if (_.isNil(value)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			const { valueString, unitString } = extractValueAndUnit(inputString);
			const amount = parseFloat(valueString);
			const denom = unitString;

			return (
				<InfoRow label={label}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount)}</span>
						<span className={cx("amount-denom")}>{reduceString(denom)}</span>
						<span className={cx("amount-usd")}>{!_.isNil(amount) ? " ($" + formatFloat((amount / consts.NUM.COSMOS_DECIMAL) * status.price, 4) + ")" : ""}</span>
					</div>
				</InfoRow>
			);
		};

		const parseRawEvents = (events, type) => {
			return events.find(event => event.type === type);
		};

		const getCurrencyRowFromObject = (label, inputObject, keepOriginValue = false, isEthCurrency = false) => {
			// if (_.isNil(inputObject?.amount) || _.isNil(inputObject?.denom)) {
			// 	return null;
			// (

			// <InfoRow label={label}>
			// 	<span>-</span>
			// </InfoRow>
			// );
			// }
			if (!inputObject || inputObject.length <= 0) {
				return 0;
			}
			const { amount, denom, denom_name } = inputObject[0] ? inputObject[0] : inputObject;
			let finalDenom = denom;
			if (denom !== consts.DENOM) {
				const logs = JSON.parse(data.raw_log);
				const ibcTransferEvent = parseRawEvents(logs[0].events, "send_packet");
				// process denom for msg transfer case
				if (ibcTransferEvent) {
					const packetData = JSON.parse(ibcTransferEvent.attributes.find(attr => attr.key === "packet_data").value).denom;
					finalDenom = packetData.split("/")[2]; // syntax: transfer/channel-15/uatom. trim the first character and upper everything
					if (finalDenom.charAt(0) === "u") finalDenom = finalDenom.substring(1).toUpperCase();
					else finalDenom = finalDenom.toUpperCase();
				}
			}
			// const priceInUSD = new BigNumber(amount || 0).multipliedBy(status?.price || 0).toFormat(2);
			let formatedAmount;
			let calculatedValue;
			if (keepOriginValue) {
				calculatedValue = amount;
				formatedAmount = formatOrai(amount, 1);
			} else {
				const decimal = isEthCurrency ? consts.NUM.ETH_DECIMAL : consts.NUM.COSMOS_DECIMAL;
				calculatedValue = amount / decimal;
				console.log("calculated amount: ", calculatedValue)
				formatedAmount = formatOrai(amount, decimal);
			}

			return (
				<InfoRow label={label}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatedAmount + " "}</span>
						<span className={cx("amount-denom")}>
							{denom_name || denom || (finalDenom && String(finalDenom).toLowerCase() === consts.DENOM ? finalDenom : consts.MORE)}
						</span>
						{finalDenom === consts.DENOM && (
							<span className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(calculatedValue * status.price, 4) + ")" : ""}</span>
						)}
					</div>
				</InfoRow>
			);
		};

		const getImageRow = (label, src) => (
			<InfoRow label={label}>
				<img src={src} className={cx("responsive-image")} />
			</InfoRow>
		);

		const getNameByAddress = address => {
			return storageData?.[address]?.name;
		};

		const getAddressRow = (label, address, name, isSmartContract = false) => (
			<InfoRow label={label}>
				<Address name={name ?? getNameByAddress(address)} address={address} showCopyIcon={true} size='lg' isSmartContract={isSmartContract} />
			</InfoRow>
		);

		const getMultiAddressRow = (label, address) => (
			<InfoRow label={label}>
				<ThemedTable
					headerCellStyles={getMultiSendHeaderRow()?.headerCellStyles}
					headerCells={getMultiSendHeaderRow()?.headerCells}
					dataRows={getMultiSendDataRows(address)}
				/>
				<div className={cx("load-more")}>
					<div
						className={cx("load-more-result")}
						onClick={() => {
							if (loadMoreValue * 5 >= value?.outputs?.length) {
								return;
							}
							dispatch(loadMore());
						}}>
						Load More Result (+5)
					</div>
					<div
						className={cx("load-more-result")}
						onClick={() => {
							dispatch(
								loadAll({
									loadMore: loadMoreValue * 5 < value?.outputs?.length ? value?.outputs?.length : 1,
								})
							);
						}}>
						{loadMoreValue * 5 < value?.outputs?.length ? "Load More All Result" : "Load More Less"}
					</div>
				</div>
			</InfoRow>
		);

		const getLinkRow = (label, name, id, href) => (
			<InfoRow label={label}>
				<LinkRow name={name} id={id} href={href} showCopyIcon={true} size='lg' />
			</InfoRow>
		);

		const getWebsiteRow = (label, href) => {
			if (_.isNil(href)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			return (
				<InfoRow label={label}>
					<a href={href} target='_blank' className={cx("link")}>
						{href}
					</a>
				</InfoRow>
			);
		};

		const getSubmitProposalContent = proposalType => {
			switch (proposalType) {
				case "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal":
					return (
						<>
							<InfoRow label='Plan'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={value?.content.plan}
								/>
							</InfoRow>
						</>
					);
				case "/cosmos.params.v1beta1.ParameterChangeProposal":
					return (
						<>
							<InfoRow label='Changes'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={value?.content.changes}
								/>
							</InfoRow>
						</>
					);
				default:
					break;
			}
		};

		const getTransferHeaderRow = () => {
			const recipientHeaderCell = <div className={cx("header-cell")}>Recipient</div>;
			const senderHeaderCell = <div className={cx("header-cell")}>Sender</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [recipientHeaderCell, senderHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ width: "326px" }, // Recipient
				{ width: "326px" }, // Sender
				{ minWidth: "80px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getFundsHeaderRow = () => {
			const denomHeaderCell = <div className={cx("header-cell")}>Denom</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [denomHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ width: "652px" }, // Demon
				{ minWidth: "80px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getTransfer = (key = 0, rawLog = "[]", result = "") => {
			let checkTransfer = false;
			let msgTransfer = [];
			if (result === "Success") {
				let rawLogArr = JSON.parse(rawLog);
				for (let event of rawLogArr[key].events) {
					if (event["type"] === "transfer") {
						checkTransfer = true;
						let start = false;
						let obj = {};
						for (let att of event["attributes"]) {
							if (att["key"] === "recipient") {
								start = true;
								obj = { recipient: att["value"] };
								continue;
							}

							if (start && att["key"] === "sender") {
								obj.sender = att["value"];
								continue;
							}

							if (start && att["key"] === "amount") {
								// const index = att["value"].indexOf("orai");
								const value = att["value"].split(",");
								// const amount = index !== -1 ? att["value"].slice(0, index) : att["value"];
								// obj.amount = value;
								for (let i = 0; i < value.length; i++) {
									const e = value[i];
									let splitValue = e.split("/");
									let splitTextNumber = processText(splitValue?.[0]);
									obj = {
										...obj,
										amount: +splitTextNumber?.[0]?.[0] / Math.pow(10, 6),
										demon: splitTextNumber?.[0]?.[1],
										txs: splitValue?.[1],
									};
									msgTransfer.push(obj);
								}
								// start = false;
								// msgTransfer.push(obj);
								continue;
							}
						}

						break;
					}
				}
			}
			return { checkTransfer: checkTransfer, transfers: msgTransfer };
		};

		const processText = inputText => {
			let output = [];
			let json = inputText.split(" ");
			json.forEach(function (item) {
				output.push(
					item
						.replace(/\'/g, "")
						.split(/(\d+)/)
						.filter(Boolean)
				);
			});
			return output;
		};

		const getTransferRow = (label, key = 0, rawLog = "[]", result = "") => {
			const transfer = getTransfer(key, rawLog, result);

			return (
				transfer.checkTransfer && (
					<InfoRow isTransfer={true} label={label}>
						{Array.isArray(transfer.transfers) && transfer?.transfers?.length !== 0 && (
							<ThemedTable
								headerCellStyles={getTransferHeaderRow()?.headerCellStyles}
								headerCells={getTransferHeaderRow()?.headerCells}
								dataRows={getTransferDataRows(transfer.transfers)}
							/>
						)}
					</InfoRow>
				)
			);
		};

		const getFundsRow = (label, key = 0, rawLog = [], result = "") => {
			return (
				<InfoRow isTransfer={true} label={label}>
					{Array.isArray(rawLog) && rawLog.length !== 0 && (
						<ThemedTable
							headerCellStyles={getFundsHeaderRow()?.headerCellStyles}
							headerCells={getFundsHeaderRow()?.headerCells}
							dataRows={getFundsDataRows(rawLog)}
						/>
					)}
				</InfoRow>
			);
		};

		const getRedelegateTime = (key = 0, rawLog = "[]", result = "") => {
			let time = null;
			if (result === "Success") {
				let rawLogArr = JSON.parse(rawLog);
				for (let event of rawLogArr[key].events) {
					if (event["type"] === "redelegate") {
						for (let att of event["attributes"]) {
							if (att["key"] === "completion_time") {
								time = att["value"];

								break;
							}
						}

						break;
					}
				}
			}

			return time;
		};

		const getTransferDataRows = data => {
			return data.map(item => {
				const recipientDataCell = _.isNil(item?.recipient) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.recipient}`}>
						{item?.recipient}
					</NavLink>
				);

				const senderDataCell = _.isNil(item?.sender) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.sender}`}>
						{item?.sender}
					</NavLink>
				);

				const amountDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{item?.amount ? item?.amount : "0" + " "}</span>
							<span className={cx("amount-denom")}>{item?.demon}</span>
							<span className={cx("amount-usd")}>
								{/* {!item?.amount ? " ($0)" : status?.price ? " ($" + formatFloat(item?.amount * status.price, 4) + ")" : ""} */}
								{item?.txs ? reduceStringAssets(item?.txs, 3, 3) : " "}
							</span>
						</div>
					</div>
				);

				return [recipientDataCell, senderDataCell, amountDataCell];
			});
		};

		const getFundsDataRows = data => {
			return data.map(item => {
				let denomSplit = item?.denom?.split("/") || [];
				const denomDataCell = _.isNil(item?.denom) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.denom}`}>
						{item?.denom}
					</NavLink>
				);
				const amountDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							{console.log({ item, denomSplit })}
							<span className={cx("amount-value")}>{item?.amount ? item?.amount / Math.pow(10, 6) : "0"}</span>
							<span className={cx("amount-denom")}>{item?.denom_name || item?.denom || denomSplit?.[0]}</span>
							{/* <span className={cx("amount-denom")}>{reduceStringAssets(item?.denom_name) || reduceStringAssets(item?.demom) || reduceStringAssets(denomSplit?.[0])}</span> */}
							{/* <span className={cx("amount-usd")}>
								{denomSplit[1] ? reduceStringAssets(denomSplit?.[1], 3, 3) : " "}
							</span> */}
						</div>
					</div>
				);

				return [denomDataCell, amountDataCell];
			});
		};

		return (
			<>
				<div className={cx("card-header")}>
					{/* {toolTippedImg} */}
					<span className={cx("title")}>{getTxTypeNew(type, data?.result, value)}</span>
				</div>
				<div className={cx("card-body")}>
					{type === txTypes.COSMOS_SDK.MSG_CREATE_VALIDATOR && (
						<>
							{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
							{getAddressRow("Validator Address", value?.validator_address)}
							{getCurrencyRowFromObject("Amount", value?.value)}
							{getInfoRow("Min Self Delegation", value?.min_self_delegation)}
							<div className={cx("card")}>
								<div className={cx("card-header")}>Pubkey</div>
								<div className={cx("card-body")}>
									{getInfoRow("Type", value?.pubkey?.type)}
									{getInfoRow("Value", value?.pubkey?.value)}
								</div>
							</div>
							<div className={cx("card")}>
								<div className={cx("card-header")}>Commission</div>
								<div className={cx("card-body")}>
									{getInfoRow("Rate", formatFloat(value?.commission?.rate, 6))}
									{getInfoRow("Max Rate", formatFloat(value?.commission?.max_rate, 6))}
								</div>
							</div>
							<div className={cx("card")}>
								<div className={cx("card-header")}>Description</div>
								<div className={cx("card-body")}>
									{getInfoRow("Details", value?.description?.details)}
									{getInfoRow("Moniker", value?.description?.moniker)}
									{getWebsiteRow("Website", value?.description?.website)}
									{getInfoRow("Identity", value?.description?.identity)}
									{getInfoRow("Security Contact", value?.description?.security_contact)}
								</div>
							</div>
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_DELEGATE && (
						<>
							{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
							{getAddressRow("Validator Address", value?.validator_address)}
							{getCurrencyRowFromObject("Amount", value?.amount)}
						</>
					)}
					.
					{type === txTypes.COSMOS_SDK.MSG_UNDELEGATE && (
						<>
							{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
							{getAddressRow("Validator Address", value?.validator_address)}
							{getCurrencyRowFromObject("Amount", value?.amount)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_SEND && (
						<>
							{getAddressRow("From Address", value?.from_address, value?.from_address_tag)}
							{getAddressRow("To Address", value?.to_address, value?.to_address_tag)}
							{getCurrencyRowFromObject("Amount", value?.amount?.[0])}
							{getInfoRow("Memo", memo)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_MULTI_SEND && (
						<>
							{getAddressRow("From Address", value?.inputs?.[0]?.address, value?.inputs?.[0]?.address_tag)}
							{getCurrencyRowFromObject("Total Amount", value?.inputs?.[0]?.coins?.[0])}
							{getMultiAddressRow("To Address", value?.outputs)}
							{getInfoRow("Memo", memo)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_EDIT_VALIDATOR && (
						<>
							{getAddressRow("Validator Address", value?.validator_address)}
							{getInfoRow("Commission Rate", new BigNumber(value?.commission_rate || 0).toFixed(6))}
							<div className={cx("card")}>
								<div className={cx("card-header")}>Description</div>
								<div className={cx("card-body")}>
									{getInfoRow("Details", value?.description?.details)}
									{getInfoRow("Moniker", value?.description?.moniker)}
									{getWebsiteRow("Website", value?.description?.website)}
									{getInfoRow("Identity", value?.description?.identity)}
									{getInfoRow("Security Contact", value?.description?.security_contact)}
								</div>
							</div>
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_DELEGATOR_REWARD && (
						<>
							{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
							{getAddressRow("Validator Address", value?.validator_address)}
							{getCurrencyRowFromObject("Amount", value?.amount)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_VALIDATOR_COMMISSION && <>{getAddressRow("Validator Address", value?.validator_address)}</>}
					{type === txTypes.COSMOS_SDK.MSG_VOTE && (
						<>
							{getInfoRow("Option", value?.option)}
							{getLinkRow("Proposal ID", "Proposal", value?.proposal_id, `/proposals/${value?.proposal_id}`)}
							{getAddressRow("Voter", value?.voter, value?.voter_tag)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_IBC_TRANSFER && (
						<>
							{getInfoRow("Source Port", value?.source_port)}
							{getInfoRow("Source Channel", value?.source_channel)}
							{/* {getCurrencyRowFromObject("Amount", value?.sent_funds?.[0])} */}
							{getCurrencyRowFromObject("Token", value?.amount)}
							{getAddressRow("Sender", value?.sender)}
							{getAddressRow("Receiver", value?.receiver)}
							{getInfoRow("Timeout Height", value?.timeout_height?.revision_height)}
							{getInfoRow("Timeout Timestamp", value?.timeout_timestamp)}
							{/* <InfoRow label='Message'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={tryParseMessage(value?.msg)}
							/>
						</InfoRow> */}
							{/* {getTransferRow("Transfer", key, data?.raw_log, data?.result)}
						{getMultiRoyaltyRow("Royalty", key, data?.raw_log, data?.result)} */}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_IBC_UPDATE_CLIENT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Client ID", value?.client_id)}
							{getInfoRow("Block", value?.header.signed_header.header.version.block)}
							{getInfoRow("App", value?.header.signed_header.header.version.app)}
							{getInfoRow("Chain ID", value?.header.signed_header.header.chain_id)}
							{getInfoRow("Height", value?.header.signed_header.header.height)}
							{getInfoRow("Time", value?.header.signed_header.header.time)}
							{getInfoRow("Last Commit Hash", value?.header.signed_header.header.last_commit_hash)}
							{getInfoRow("Data Hash", value?.header.signed_header.header.data_hash)}
							{getInfoRow("Validators Hash", value?.header.signed_header.header.validators_hash)}
							{getInfoRow("Next Validators Hash", value?.header.signed_header.header.next_validators_hash)}
							{getInfoRow("Consensus Hash", value?.header.signed_header.header.consensus_hash)}
							{getInfoRow("App Hash", value?.header.signed_header.header.app_hash)}
							{getInfoRow("Last Results Hash", value?.header.signed_header.header.last_results_hash)}
							{getInfoRow("Evidence Hash", value?.header.signed_header.header.evidence_hash)}
							{getInfoRow("Proposer Address", value?.header.signed_header.header.proposer_address)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_IBC_RECV_PACKET && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Sequence", value?.packet.sequence)}
							{getInfoRow("Source Channel", value?.packet.source_channel)}
							{getInfoRow("Destination Channel", value?.packet.destination_channel)}
							{getInfoRow("Proof Height", value?.proof_height.revision_height)}
							{getIbcReceivedRows(value?.packet.data)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_SUBMIT_PROPOSAL && (
						<>
							{getAddressRow("Proposer", value?.proposer, value?.proposer_tag)}
							{value?.content && getInfoRow("Proposal type", value?.content["@type"])}
							{getInfoRow("Title", value?.content?.title)}
							{getHtmlRow("Description", value?.content?.description)}
							{value?.content && getSubmitProposalContent(value?.content["@type"])}
							{getCurrencyRowFromObject("Initial deposit", value?.initial_deposit?.[0])}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_DEPOSIT && (
						<>
							{getAddressRow("Depositor", value?.depositor, value?.depositor_tag)}
							{getCurrencyRowFromObject("Amount", value?.amount?.[0])}
							{getLinkRow("Proposal ID", "Proposal", value?.proposal_id, `/proposals/${value?.proposal_id}`)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_BEGIN_REDELEGATE && (
						<>
							{getAddressRow("Delegator Address", value?.delegator_address, "")}
							{getAddressRow("Source Validator", value?.validator_src_address, "")}
							{getAddressRow("Destination Validator", value?.validator_dst_address, "")}
							{getCurrencyRowFromObject("Amount", value?.amount)}
							{/* <InfoRow label='Time'>
							<div className={cx("text")}>
								{_.isNil(getRedelegateTime(key, data?.raw_log, data?.result))
									? "-"
									: setAgoTime(getRedelegateTime(key, data?.raw_log, data?.result)) +
									" (" +
									getTotalTime(getRedelegateTime(key, data?.raw_log, data?.result)) +
									")"}
							</div>
						</InfoRow> */}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_CONFIRM && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Connection ID", value?.connection_id)}
							{getInfoRow("Height", value?.proof_height?.revision_height)}
							{getInfoRow("Number", value?.proof_height?.revision_number)}
							{getInfoRowSummary("Proof Ack", value?.proof_ack)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CREATE_CLIENT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Chain ID", value?.client_state?.chain_id)}
							{/* {getInfoRow("Trusting", value?.client_state?.trusting_period)} */}
							{/* {getInfoRow("Unbonding", value?.client_state?.unbonding_period)} */}
							{getInfoRow("Height", value?.client_state?.latest_height?.revision_height)}
							{getInfoRow("Revision", value?.client_state?.latest_height?.revision_number)}
							{getInfoRow("Next Validators Hash", value?.consensus_state?.next_validators_hash)}
							{getInfoRow("Max Clock Drift", value?.client_state?.max_clock_drift)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_TRY && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Chain ID", value?.client_state?.chain_id)}
							{getInfoRow("Height", value?.client_state?.latest_height?.revision_height)}
							{/* {getInfoRow("Revision", value?.client_state?.latest_height?.revision_number)} */}
							{getInfoRow("Max Clock Drift", value?.client_state?.max_clock_drift)}
							{getInfoRowSummary("Proof Client", value?.proof_client)}
							{getInfoRowSummary("Proof Consensus", value?.proof_consensus)}
							{getInfoRowSummary("Proof Init", value?.proof_init)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_TRY && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Port ID", value?.port_id)}
							{getInfoRow("Counterparty Version", value?.counterparty_version)}
							{getInfoRow("Channel ID", value?.channel?.counterparty?.channel_id)}
							{getInfoRowSummary("Proof Init", value?.proof_init)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_CONFIRM && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Port ID", value?.port_id)}
							{getInfoRow("Channel ID", value?.channel_id)}
							{getInfoRowSummary("Proof Ack", value?.proof_ack)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CONNECT_OPEN_INIT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Client ID", value?.client_id)}
							{getInfoRow("Delay", value?.delay_period)}
							{getInfoRow("Connection ID", value?.connection_id)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_ACK && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Chain ID", value?.client_state?.chain_id)}
							{getInfoRow("Connection ID", value?.connection_id)}
							{getInfoRowSummary("Proof Client", value?.proof_client)}
							{getInfoRowSummary("Proof Consensus", value?.proof_consensus)}
							{getInfoRowSummary("Proof Try", value?.proof_try)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_INIT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Port ID", value?.port_id)}
							{getInfoRowSummary("Version", value?.channel?.version)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_ACK && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Port ID", value?.port_id)}
							{getInfoRow("Channel ID", value?.channel_id)}
							{getInfoRow("Version", value?.counterparty_version)}
							{getInfoRowSummary("Proof Try", value?.proof_try)}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_CHANNEL_ACKNOWLEDGEMENT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Sequence", value?.packet.sequence)}
							{getInfoRow("Source Port", value?.packet?.source_port)}
							{getInfoRow("Source Channel", value?.packet?.source_channel)}
							{getInfoRow("Desination Port", value?.packet?.destination_port)}
							{getInfoRow("Desination Channel", value?.packet?.destination_channel)}
							<InfoRow label='Data'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={JSON.parse(atob(value?.packet?.data))}
								/>
							</InfoRow>
							{getInfoRow("Revision Number", value?.packet?.timeout_height?.revision_number)}
							{getInfoRow("Revision Height", value?.packet?.timeout_height?.revision_height)}
							{getInfoRow("Proof Number", value?.proof_height?.revision_number)}
							{getInfoRow("Proof Height", value?.proof_height?.revision_height)}
							{getInfoRow("Timeout Timestamp", new Date(value?.packet?.timeout_timestamp / Math.pow(10, 9)).toTimeString())}
						</>
					)}
					{type === txTypes.COSMOS_SDK.MSG_TIMEOUT && (
						<>
							{getAddressRow("Signer", value?.signer)}
							{getInfoRow("Sequence", value?.packet?.sequence)}
							{getInfoRow("Next Sequence Recv", value?.next_sequence_recv)}
							{getInfoRow("Destination Channel", value?.packet?.destination_channel)}
							{getInfoRow("Destination Port", value?.packet?.destination_port)}
							{getInfoRow("Source Channel", value?.packet?.source_channel)}
							{getInfoRow("Source Port", value?.packet?.source_port)}
							{getInfoRow("Height", value?.proof_height?.revision_height)}
							{getInfoRow("Timeout Timestamp", new Date(value?.packet?.timeout_timestamp / Math.pow(10, 9)).toTimeString())}
							{getInfoRowThreeDots("Unreceived", value?.proof_unreceived)}
							<InfoRow label='Message'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={JSON.parse(atob(value?.packet?.data))}
								/>
							</InfoRow>
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_BATCH_SEND_TO_COSMOS_CLAIM && (
						<>
							{getInfoRow("Sender", value?.ethereum_sender)}
							{getInfoRow("Token Contract", value?.token_contract)}
							{getAddressRow("Receiver", value?.cosmos_receiver)}
							{getCurrencyRowFromObject("Amount", value?.amount, false, true)}
							{getAddressRow("Orchestrator", value?.orchestrator)}
							{getInfoRow("Block Height", value?.block_height)}
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_BATCH_SEND_TO_ETH_CLAIM && (
						<>
							{getInfoRow("Token Contract", value?.token_contract)}
							{getAddressRow("Orchestrator", value?.orchestrator)}
							{getInfoRow("Block Height", value?.block_height)}
							{getInfoRow("Batch Nonce", value?.batch_nonce)}
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_CONFIRM_BATCH && (
						<>
							{getInfoRow("Token Contract", value?.token_contract)}
							{getAddressRow("Orchestrator", value?.orchestrator)}
							{getInfoRow("ETH signer", value?.eth_signer)}
							{getInfoRow("Signature", value?.signature)}
							{getInfoRow("Nonce", value?.nonce)}
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_REQUEST_BATCH && (
						<>
							{getAddressRow("Sender", value?.sender)}
							{getInfoRow("Denom", value?.denom)}
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_EXECUTE_IBC_AUTO_FORWARDS && (
						<>
							{getAddressRow("Executor", value?.executor)}
							{getInfoRow("Forwards To Clear", value?.forwards_to_clear)}
						</>
					)}
					{type === txTypes.ORAI_BRIDGE.MSG_SEND_TO_ETH && (
						<>
							{getAddressRow("Sender", value?.sender)}
							{getInfoRow("Eth Destination", value?.eth_dest)}
							{getCurrencyRowFromObject("Amount", value?.amount, false, true)}
							{getCurrencyRowFromObject("Bridge Fee", value?.bridge_fee, false, true)}
						</>
					)}
				</div>
			</>
		);
	}, [type, value, storageData, activeThemeId, loadingStoreCode, status, storeCodeData, storeCodeError, memo, dispatch, data, loadMoreValue]);

	return (
		<div className={cx("card")}>
			<div>{messageDetails}</div>
		</div>
	);
};

TxMessage.propTypes = {
	msg: PropTypes.any,
	data: PropTypes.any,
};
TxMessage.defaultProps = {};

export default TxMessage;
