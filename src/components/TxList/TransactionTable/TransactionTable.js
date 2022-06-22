// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, reduceString, processText, setAgoTime, formatNumber, parseIbcMsgTransfer, parseIbcMsgRecvPacket, reduceStringAssets } from "src/lib/scripts";
import { formatOrai, formatFloat, getTxTypeNew } from "src/helpers/helper";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import styles from "./TransactionTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = (royalty = false) => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	// const ibcAmountHeaderCell = <div className={cx("header-cell", "align-center")}>IBC Amount </div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-center")}>Result</div>;
	let amountHeaderCell = <div className={cx("header-cell", "align-right")}>{"Amount"}</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>{"Fee"}</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	let headerCells = [
		txHashHeaderCell,
		typeHeaderCell,
		// ibcAmountHeaderCell,
		resultHeaderCell,
		amountHeaderCell,
		feeHeaderCell,
		heightHeaderCell,
		timeHeaderCell,
	];
	let headerCellStyles = [
		{ width: "14%", minWidth: "140px" }, // TxHash
		{ width: "18%", minWidth: "180px" }, // Type
		// {width: "6%", minWidth: "100px"}, // IBC Amount
		{ width: "10%", minWidth: "100px" }, // Result
		{ width: "22%", minWidth: "220px" }, // Amount
		{ width: "10%", minWidth: "140px" }, // Fee
		{ width: "10%", minWidth: "100px" }, // Height
		{ width: "10%", minWidth: "100px" }, // Time
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

export const getTokenId = (rawLog = "[]", result = "") => {
	let tokenId = "";
	if (result === "Failure") {
		return tokenId;
	}

	let rawLogArr = JSON.parse(rawLog);
	for (let event of rawLogArr[0].events) {
		if (event["type"] === "wasm") {
			for (let att of event["attributes"]) {
				if (att["key"] === "token_id") {
					tokenId = att["value"];
					break;
				}
			}

			break;
		}
	}

	return tokenId;
};

const TransactionTable = memo(({ data, rowMotions, account, royalty = false }) => {
	const status = useSelector(state => state.blockchain.status);
	const checkAmountOrai = (denom, amount, newDenom, noDenomName) => {
		if (denom?.toLowerCase()?.includes("ibc")) {
			if (newDenom?.toLowerCase()?.includes(consts.GRAVITY)) {
				denom = newDenom ? reduceStringAssets(newDenom.toLowerCase()) : noDenomName;
				return (
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount)}</span>
						<span className={cx("amount-denom")}>{denom}</span>
						<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (amount / 1000000), 4) + ")" : ""}</div>
					</div>
				);
			}
		} else {
			if (denom?.toLowerCase()?.includes(consts.GRAVITY)) {
				denom = newDenom ? reduceStringAssets(newDenom.toLowerCase()) : noDenomName;
				return (
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount)}</span>
						<span className={cx("amount-denom")}>{denom}</span>
						<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (amount / 1000000), 4) + ")" : ""}</div>
					</div>
				);
			}
		}
		return (
			<div className={cx("amount")}>
				<span className={cx("amount-value")}>{formatOrai(amount)}</span>
				<span className={cx("amount-denom")}>{consts.DENOM_UORAIB}</span>
				{denom?.toLowerCase() === consts.DENOM_UORAIB ? (
					<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (amount / 1000000), 4) + ")" : ""}</div>
				) : (
					<></>
				)}
			</div>
		);
	};

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			let newDenom = item?.messages?.[0]?.sent_funds?.[0]?.denom_name;
			let noDenomName = item?.amount?.[0]?.sent_funds?.[0]?.denom;
			let amountDenomName = item?.amount?.[0]?.amount?.denom;
			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
					{reduceString(item.tx_hash, 6, 6)}
				</NavLink>
			);

			const typeDataCell = _.isNil(item?.messages?.[item?.messages?.length - 1]?.["@type"]) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[item?.messages?.length - 1]["@type"], item?.raw_log, item?.result)}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
				</div>
			);

			let resultDataCellContent;
			if (item?.result?.toLowerCase?.() === "success") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<CheckIcon className={cx("result-icon", "result-icon-success")} />
						<span className={cx("result-text")}>Success</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === "failure") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<TimesIcon className={cx("result-icon", "result-icon-failed")} />
						<span className={cx("result-text")}>Failure</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === "pending") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<RedoIcon className={cx("result-icon", "result-icon-pending")} />
						<span className={cx("result-text")}>Pending</span>
					</div>
				);
			}

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>{resultDataCellContent}</div>
			);

			let transferStatus = null;
			if (account && getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgSend" && item?.messages?.[0]?.from_address) {
				if (account === item.messages[0].from_address) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				} else {
					transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
				}
			} else if (account && getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgMultiSend" && item?.messages[0]?.inputs[0]?.address) {
				if (account === item.messages[0].inputs[0].address) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				} else {
					transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
				}
			} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket")) {
				let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket");
				if (message?.packet?.data) {
					const data = JSON.parse(atob(message?.packet?.data));
					if (account === data.receiver) {
						transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
					}
				}
			} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer")) {
				let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer");
				if (account === message.sender) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				}
			}

			let amountDataCell;
			let amount;
			let denom;
			if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgMultiSend")) {
				try {
					let outputs = item?.messages?.[0]?.outputs.find(e => e.address === account);
					amount = outputs ? outputs?.coins?.[0]?.amount : item?.messages?.[0]?.inputs?.[0]?.coins?.[0]?.amount;
					denom = outputs ? outputs?.coins?.[0]?.denom : item?.messages?.[0]?.inputs?.[0]?.coins?.[0]?.denom || consts.DENOM;
				} catch (err) {
					if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
						amount = item?.amount?.[0]?.amount;
						denom = item?.amount?.[0]?.denom;
					}
				}
			} else {
				if (item?.amount?.length > 1) {
					amount = 0;
					denom = consts.MORE;
				} else if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
					amount = item?.amount?.[0]?.amount;
					denom = newDenom ? reduceStringAssets(newDenom) : amountDenomName;
				}
			}

			let denomMore;
			if (denom === consts.MORE) {
				denomMore = (
					<div className={cx("amount")}>
						<NavLink to={`${consts.PATH.TXLIST}/${item.tx_hash}`} style={{ cursor: "pointer" }}>
							<span className={cx("amount-denom")}>{denom}</span>
						</NavLink>
					</div>
				);
			} else {
				denomMore = checkAmountOrai(denom, amount, newDenom, noDenomName);
			}

			amountDataCell =
				_.isNil(amount) || _.isNil(denom) ? (
					<div className={cx("amount-data-cell", { "amount-data-cell-with-transfer-status": transferStatus }, "align-right")}>
						{transferStatus && transferStatus}
						{amount ? (
							<>
								{checkAmountOrai(item?.amount?.[0]?.denom, amount, item?.amount?.[0]?.denom_name, noDenomName)}
							</>
						) : (
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>0</span>
								<span className={cx("amount-denom")}>{consts.DENOM_UORAIB}</span>
								<div className={cx("amount-usd")}>($0)</div>
							</div>
						)}
					</div>
				) : (
					<div className={cx("amount-data-cell", { "amount-data-cell-with-transfer-status": transferStatus }, "align-right")}>
						{transferStatus && transferStatus}
						{denomMore}
					</div>
				);

			let feeDataCell;
			feeDataCell = _.isNil(item?.fee?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-right")}>
					<div className={cx("fee")}>
						<span className={cx("fee-value")}>{formatOrai(item.fee.amount[0] || 0)}</span>
						<span className={cx("fee-denom")}>{consts.DENOM_UORAIB}</span>
						{/* <span className={cx("fee-usd")}>
									{status?.price ? "($" + (status?.price * Number(formatOrai(item.fee.amount[0].amount))).toFixed(8) + ")" : ""}
								</span> */}
					</div>
				</div>
			);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-right")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(royalty), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.LIGHT}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			rowMotions={rowMotions}
		/>
	);
});

TransactionTable.propTypes = {
	data: PropTypes.array,
	rowMotions: PropTypes.array,
	account: PropTypes.string,
	pending: PropTypes.bool,
};

TransactionTable.defaultProps = {
	data: [],
	rowMotions: [],
	pending: false,
};

export default TransactionTable;
