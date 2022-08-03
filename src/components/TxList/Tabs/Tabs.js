/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import styles from "./Tabs.module.scss";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab, address, isTab = false}) {
	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Transactions</div>
			</div>
		</div>
	);
}
