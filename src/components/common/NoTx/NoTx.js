import React from "react";
import cn from "classnames/bind";

import listNone from "src/assets/misc/noitem_ic.svg";
import styles from "./NoTx.module.scss";

const cx = cn.bind(styles);

export default function({text}) {
	return (
		<div className={cx("no-tx-wrapper")}>
			<img src={listNone} alt='nodata' />
			<p className={cx("no-tx")}>{text}</p>
		</div>
	);
}
