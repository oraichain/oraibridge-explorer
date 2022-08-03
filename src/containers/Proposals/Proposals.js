import React, {useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
import {useForm, Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import * as bech32 from "bech32-buffer";
import * as yup from "yup";
import _ from "lodash";
import {yupResolver} from "@hookform/resolvers/yup";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import {isNil} from "lodash-es";
import {formatFloat} from "src/helpers/helper";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/common/FilterSection";
import FilterSectionSkeleton from "src/components/common/FilterSection/FilterSectionSkeleton";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import {Fee, Gas} from "src/components/common/Fee";
import TopProposalCardList from "src/components/Proposals/TopProposalCardList";
import TopProposalCardListSkeleton from "src/components/Proposals/TopProposalCardList/TopProposalCardListSkeleton";
import ProposalsTable from "src/components/Proposals/ProposalsTable/ProposalsTable";
import ProposalsTableSkeleton from "src/components/Proposals/ProposalsTable/ProposalsTableSkeleton";
import ProposalCardList from "src/components/Proposals/ProposalCardList/ProposalCardList";
import ProposalCardListSkeleton from "src/components/Proposals/ProposalCardList/ProposalCardListSkeleton";
import SelectBox from "src/components/common/SelectBox";
import AddIcon from "src/icons/AddIcon";
import styles from "./Proposals.module.scss";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [status, setStatus] = useState("PROPOSAL_STATUS_ALL");
	const [topPageId, setTopPageId] = useState(1);
	const totalTopPagesRef = useRef(null);
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const type = queryStringParse?.type ?? null;
	const fields = [
		{
			label: "Unbonding time",
			value: "UNBONDING_TIME",
		},
	];
	const [fieldValue, setFieldValue] = useState("UNBONDING_TIME");

	const minFee = useSelector(state => state.blockchain.minFee);
	const {address, account} = useSelector(state => state.wallet);
	const [gas, setGas] = useState(200000);
	const [fee, setFee] = useState(0);

	const defaultValues = {
		title: "",
		description: "",
		amount: 10,
		unbondingTime: 3600,
	};
	const schema = yup.object().shape({
		title: yup.string().required("The Title is required"),
		description: yup.mixed().required("The Description is required"),
		amount: yup
			.string()
			.required("The Amount is required.")
			.isNumeric("The Unbonding time must be a number."),
		unbondingTime: yup
			.string()
			.required("The Unbonding time is required.")
			.isNumeric("The Unbonding time must be a number."),
	});
	const {
		handleSubmit,
		register,
		control,
		formState: {errors},
	} = useForm({defaultValues, resolver: yupResolver(schema)});

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onTopPageChange = page => {
		setTopPageId(page);
	};

	const onPageChange = page => {
		setPageId(page);
	};

	const topPath = `${consts.API.PROPOSALS}?status${!isNil(type) ? "&type=" + type : ""}&limit=3&page_id=${topPageId}`;
	const {data: topData, loading: topLoading, error: topError} = useGet({
		path: topPath,
	});

	const statusPath = consts.API.PROPOSAL_STATUS;
	const {data: statusData, loading: statusLoading, error: statusError} = useGet({
		path: statusPath,
	});

	const basePath = `${consts.API.PROPOSALS}?limit=${consts.REQUEST.LIMIT}${type ? "&type=" + type : ""}`;
	let path;
	if (status === "PROPOSAL_STATUS_ALL") {
		path = `${basePath}&page_id=${pageId}`;
	} else {
		path = `${basePath}&status=${status}&page_id=${pageId}`;
	}
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let createButton;
	let topProposalCardList;
	let filterSection;
	let tableSection;
	let paginationTopSection;
	let paginationSection;
	let isValidator = false;

	// if (!_.isNil(address) && address?.trim()?.length === 43) {
	// 	const decodedObj = bech32.decode(address);
	// 	const operatorAddress = bech32.encode("oraivaloper", decodedObj.data);

	// 	if (logoBrand.find(item => item.operatorAddress === operatorAddress)) {
	// 		isValidator = true;
	// 	}
	// }

	// if (isValidator && type === "ParameterChangeProposal") {
	// 	createButton = (
	// 		<div className={cx("create-button")} onClick={handleOpen}>
	// 			<span className={cx("create-button-text")}>Create Proposal</span>
	// 			<AddIcon className={cx("create-button-icon")} />
	// 		</div>
	// 	);
	// } else {
	// 	createButton = <></>;
	// }

	createButton = (
		<div className={cx("create-button")} onClick={handleOpen}>
			<span className={cx("create-button-text")}>Create Proposal</span>
			<AddIcon className={cx("create-button-icon")} />
		</div>
	);

	const onSubmit = data => {
		// const msg = [
		// 	{
		// 		type: "/cosmos.params.v1beta1.ParameterChangeProposal",
		// 		value: {
		// 			title: data.title,
		// 			description: draftToHtml(data.description),
		// 			changes: [
		// 				{
		// 					subspace: "staking",
		// 					key: "UnbondingTime",
		// 					value: JSON.stringify(data.unbondingTime),
		// 				},
		// 			],
		// 			amount: data.amount,
		// 		},
		// 	},
		// ];
		// const minGasFee = (fee * 1000000 + "").split(".")[0];
		// const payload = {
		// 	type: "/cosmos.params.v1beta1.ParameterChangeProposal",
		// 	value: {
		// 		msg,
		// 		fee: {
		// 			amount: [minGasFee],
		// 			gas,
		// 		},
		// 		signatures: null,
		// 		memo: "",
		// 	},
		// };
		// const popup = myKeystation.openWindow("transaction", payload, account);
		// let popupTick = setInterval(function() {
		// 	if (popup.closed) {
		// 		clearInterval(popupTick);
		// 	}
		// }, 500);
	};

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Proposals"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='proposals' />;
	}

	if (topLoading) {
		topProposalCardList = <TopProposalCardListSkeleton />;
	} else {
		if (topError) {
			totalPagesRef.current = null;
			topProposalCardList = <TopProposalCardList data={[]} />;
		} else {
			if (!isNaN(topData?.page?.total_page)) {
				totalTopPagesRef.current = topData?.page?.total_page;
			} else {
				totalTopPagesRef.current = null;
			}

			if (Array.isArray(topData?.data) && topData?.data?.length > 0) {
				topProposalCardList = <TopProposalCardList data={topData?.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	if (statusLoading) {
		filterSection = <FilterSectionSkeleton />;
	} else {
		let filterData;
		if (statusError) {
			filterData = [
				{
					label: "ALL",
					value: "PROPOSAL_STATUS_ALL",
				},
			];
		} else {
			filterData = statusData.map(value => {
				const filterItem = {
					label: value.replace("PROPOSAL_STATUS_", "").replace("_", " "),
					value: value,
				};
				return filterItem;
			});

			filterData.unshift({
				label: "ALL",
				value: "PROPOSAL_STATUS_ALL",
			});
		}

		filterSection = (
			<FilterSection
				className={cx("filter-section")}
				data={filterData}
				value={status}
				onChange={value => {
					setStatus(value);
				}}
			/>
		);
	}

	if (loading) {
		tableSection = isLargeScreen ? <ProposalsTableSkeleton /> : <ProposalCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <ProposalsTable data={data.data} type={type} /> : <ProposalCardList data={data.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationTopSection = totalTopPagesRef.current ? (
		<Pagination pages={totalTopPagesRef.current} page={topPageId} onChange={(e, page) => onTopPageChange(page)} />
	) : (
		<></>
	);
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("proposals")}>
				{createButton}
				{topProposalCardList}
				{paginationTopSection}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
			<Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='create-proposal-dialog' onClose={handleClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={cx("dialog-header")}>
						<div className={cx("close-button")} onClick={handleClose}>
							<CloseIcon />
						</div>
					</div>
					<div className={cx("dialog-body")}>
						<div className={cx("field")}>
							<SelectBox value={fieldValue} data={fields} onChange={setFieldValue} />
						</div>

						{fieldValue === "UNBONDING_TIME" && (
							<>
								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='title'>
										Title
									</label>
									<input type='text' className={cx("text-field")} name='title' ref={register} />
									<ErrorMessage errors={errors} name='title' render={({message}) => <p className={cx("error-message")}>{message}</p>} />
								</div>

								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='description'>
										Description
									</label>
									<div className={cx("editor-wrapper")}>
										<Controller
											name='description'
											control={control}
											render={props => (
												<Editor
													{...props}
													onEditorStateChange={editorState => {
														if (editorState.blocks) {
															props.onChange(editorState.blocks[0]);
														}
													}}
												/>
											)}
										/>
									</div>
									<ErrorMessage errors={errors} name='description' render={({message}) => <p className={cx("error-message")}>{message}</p>} />
								</div>

								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='unbondingTime'>
										Unbonding time
									</label>
									<input type='number' className={cx("text-field")} name='unbondingTime' ref={register} />
									<ErrorMessage errors={errors} name='unbondingTime' render={({message}) => <p className={cx("error-message")}>{message}</p>} />
								</div>

								<div className={cx("field")}>
									<label className={cx("label")} htmlFor='amount'>
										Amount
									</label>
									<input type='number' className={cx("text-field")} name='amount' ref={register} />
									<ErrorMessage errors={errors} name='amount' render={({message}) => <p className={cx("error-message")}>{message}</p>} />
								</div>
							</>
						)}

						<Fee handleChooseFee={setFee} minFee={minFee} className={cx("fee")} />
						<div className={cx("message")}>Minimin Tx Fee: {formatFloat(minFee)} ORAI</div>
						<Gas gas={gas} onChangeGas={setGas} className={cx("gas")} />
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Create</span>
						</button>
					</div>
				</form>
			</Dialog>
		</>
	);
}
