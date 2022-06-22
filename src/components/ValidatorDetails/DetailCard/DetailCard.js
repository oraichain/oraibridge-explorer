import React, { memo, useState } from "react";
import classNames from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import styles from "./DetailCard.scss";
import { formatOrai, formatInteger, formatPercentage } from "src/helpers/helper";
import { NavLink } from "react-router-dom";
import { Progress } from "antd";
import RightArrowIcon from "src/icons/RightArrowIcon";
import Dialog from "@material-ui/core/Dialog";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import { isNil } from "lodash";
import consts from "src/constants/consts";

const cx = classNames.bind(styles);

const DetailCard = memo(({ data }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [open, setOpen] = useState(false);

	const websiteInfo = data?.description?.website ?? "-";
	const websiteElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Website</div>
			<a target='_blank' href={websiteInfo} className={cx("info-link")}>
				{websiteInfo}
			</a>
		</div>
	);

	let commissionRateInfo;
	if (isNaN(data?.commission_rate)) {
		commissionRateInfo = "-";
	} else {
		const commissionRate = formatPercentage(data?.commission_rate);
		commissionRateInfo = commissionRate + "%";
	}
	const commissionElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Commission</div>
			<div className={cx("info-text")}>{commissionRateInfo}</div>
		</div>
	);

	let uptimeInfo;
	if (isNaN(data?.uptime)) {
		uptimeInfo = "-";
	} else {
		const uptime = formatPercentage(data?.uptime, 2);
		uptimeInfo = uptime + "%";
	}
	const uptimeElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Uptime</div>
			<div className={cx("info-text")}>{uptimeInfo}</div>
		</div>
	);

	let votingPowerInfo;
	if (isNaN(data?.voting_percentage) || isNaN(data?.voting_power)) {
		votingPowerInfo = "-";
	} else {
		const votingPowerPercent = formatPercentage(data?.voting_percentage / 100);
		const votingPower = formatInteger(data.voting_power);
		votingPowerInfo = (
			<div className={cx("info-text")}>
				{votingPowerPercent} % ({votingPower}) <span className={cx("info-denom")}>{consts.DENOM_UORAIB}</span>
			</div>
		);
	}
	const votingPowerElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Voting Power</div>
			<div className={cx("info-link")}>{votingPowerInfo}</div>
		</div>
	);

	let bondedHeightInfo;
	if (isNaN(data?.bond_height)) {
		bondedHeightInfo = "-";
	} else {
		bondedHeightInfo = formatInteger(data?.bond_height);
	}
	const bondedHeightElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Bonded Height</div>
			<div className={cx("info-text")}>{bondedHeightInfo}</div>
		</div>
	);

	const selfBondedElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Self Bonded</div>
			<div className={cx("info-text")}>
				{!isNil(data?.self_bonded) ? formatOrai(data?.self_bonded) : "-"} <span className={cx("info-denom")}>{consts.DENOM_UORAIB}</span>{" "}
			</div>
		</div>
	);

	const detailsInfo = data?.description?.details ?? "-";
	const detailsElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Details</div>
			<div className={cx("info-text")}>{detailsInfo}</div>
		</div>
	);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const missedBlockElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}># missed blocks</div>
			<div className={cx("info-text")}>
				{data?.missed_block ?? "-"} / {data?.blocks ?? "-"}
			</div>
		</div>
	);

	return (
		<div className={cx("detail-card")}>
			{isLargeScreen ? (
				<Grid container spacing={0}>
					<Grid container item xs={12}>
						<Grid item xs={4}>
							{websiteElement}
						</Grid>
						<Grid item xs={4}>
							{votingPowerElement}
						</Grid>
						<Grid item xs={4}>
							{detailsElement}
						</Grid>
						<Grid item xs={4}>
							{commissionElement}
						</Grid>
						<Grid item xs={4}>
							{bondedHeightElement}
						</Grid>
						<Grid item xs={4}>
							{uptimeElement}
						</Grid>
						<Grid item xs={4}>
							{selfBondedElement}
						</Grid>
						<Grid item xs={4}>
							{missedBlockElement}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>{websiteElement}</td>
						</tr>
						<tr>
							<td>{commissionElement}</td>
							<td>{uptimeElement}</td>
						</tr>
						<tr>
							<td>{votingPowerElement}</td>
							<td>{missedBlockElement}</td>
						</tr>
						<tr>
							<td>{selfBondedElement}</td>
							<td>{bondedHeightElement}</td>
						</tr>
						<tr>
							<td colSpan={2}>{detailsElement}</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
});

export default DetailCard;
