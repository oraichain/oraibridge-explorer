import {useEffect, useState} from "react";
import {useHistory} from "src/hooks";
import {useSelector} from "react-redux";

import {_, searchProperties, stringNumCheck} from "src/lib/scripts";
import consts from "src/constants/consts";

export default function useSearch() {
	const history = useHistory();
	const assets = useSelector(state => state.assets.assets);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search === "") return;
		const type = checkType(search);
		const trimmedSearch = _.trim(search);
		if (type === "block") history.push(`/blocks/${trimmedSearch}`);
		else if (type === "account") history.push(`/account/${trimmedSearch}`);
		else if (type === "validator") history.push(`/validators/${trimmedSearch}`);
		else if (type === "asset") {
			const find = _.find(assets, v => {
				return searchProperties(v, consts.ASSET.NAME_SEARCH_PROPERTY, trimmedSearch.toUpperCase());
			});
			history.push(`/assets/${find?.asset ? find.asset : "notFound"}`);
		} else if (type === "orderId") {
			history.push(`/txs/${trimmedSearch}`);
		} else history.push(`/txs/${trimmedSearch}`);
		setSearch("");
	}, [search, history, assets]);

	return setSearch;
}

const checkType = input => {
	if (!_.isString(input)) return null;
	if (stringNumCheck(input)) return "block";
	else if (input.length < 20) return "asset";
	else if (input.substring(0, 4).toLowerCase() === "orai" && input.length === 43) return "account";
	else if (input.substring(0, 11).toLowerCase() === "oraivaloper" && input.length === 50) return "validator";
	else if (stringNumCheck(input.split("-")[1])) return "orderId";
	else return "tx";
};
