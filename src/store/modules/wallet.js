import {createAction, handleActions} from "redux-actions";

export const initWallet = createAction("INIT_WALLET");

const initState = {
	address: "",
};

const handlers = {
	INIT_WALLET: (state, action) => {
		state.address = action.payload.address || "";
		state.account = action.payload.account || "";
		return {...state};
	},
};

export default handleActions(handlers, initState);
