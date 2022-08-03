import * as React from "react";
import cn from "classnames/bind";
import {formatNumber} from "src/lib/scripts";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";

import BlockTimeIcon from "src/icons/Dashboard/BlockTimeIcon";
import {ThemeSetup} from "src/helpers/helper";
import OraiBridgeIcon from "src/icons/OraiBridgeIcon.svg";
import OraiBridgeIconDark from "src/icons/OraiBridgeIconDark.svg";
import consts from "src/constants/consts";
import OraiIcon from "src/icons/OraiIcon";
import styles from "./PriceDisplay.module.scss";

const cx = cn.bind(styles);

export default function() {
	const status = useSelector(state => state.blockchain.status);
	const {isDarkTheme} = ThemeSetup();
	// React.useEffect(() => {
	// 	const cancelToken = axios.CancelToken;
	// 	const source = cancelToken.source();
	// 	dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
	// 	dispatch(getCryptoStatus(source.token));
	// 	return () => {
	// 		source.cancel("cleanup cancel");
	// 	};
	// }, [dispatch]);

	return React.useMemo(
		() => (
			<div className={cx("PriceDisplay")}>
				<div className={cx("iconBlockTime-wrapper")}>
					<div className={cx("logo")}>
						{/* <img alt='ORAI_icon' /> */}
						<OraiIcon className={cx("logo-icon")} />
						{/* {isDarkTheme ? (
							<img className={cx("logo-icon")} src={OraiBridgeIcon} alt={"logo"} />
						) : (
							<img className={cx("logo-icon")} src={OraiBridgeIconDark} alt={"logo"} />
						)} */}
						<div className={cx("logo-text")}>ORAI</div>
						{/* <div className={cx("logo-text")}>{consts.DENOM_UORAIB.toUpperCase()}</div> */}
					</div>
					<div className={cx("BlockTime")}>
						<BlockTimeIcon className={cx("BlockTime-icon")}></BlockTimeIcon>
						<p>
							Block time <span>{status?.block_time?.toFixed(2)}ms</span>
						</p>
					</div>
				</div>
				<div className={cx("price")}>{status?.price ? `$${status?.price}` : <Skeleton width={"92px"} height={"34px"} />}</div>
				<div className={cx("volume24h-wrapper")}>
					<div>Coingecko:&nbsp;</div>
					<div className={status.change_24h >= 0 ? cx("content", "green") : cx("content", "red")}>
						{status.change_24h ? (
							<>
								{status.change_24h >= 0 ? "+" : ""}
								{status.change_24h}% (24h)
							</>
						) : (
							<Skeleton width={"122px"} height={"19px"} />
						)}
					</div>
				</div>
				<div className={cx("CapVolume-wrapper")}>
					<ul>
						<li>Market Cap</li>
						<li>{status.market_cap ? `$${formatNumber(status.market_cap)}` : <Skeleton width={"134px"} />}</li>
					</ul>
					<ul>
						<li>24h Vol</li>
						<li>{status.vol_24h ? `$${formatNumber(status.vol_24h)}` : <Skeleton width={"134px"} />}</li>
					</ul>
				</div>
			</div>
		),
		[status, isDarkTheme]
	);
}
