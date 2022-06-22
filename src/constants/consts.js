// TODO : use this if prod server is ready
import config from "src/config";
import _ from "lodash";

const api = config.SCAN_API;
const lcdApi = config.LCD_API;

export default Object.freeze({
	DEFAULT_ARRAY: [],
	API_BINANCE_DEX: "https://www.binance.org/en/trade",
	API_BINANCE_ACCELERATED: ["https://dex-asiapacific.binance.org/api/v1", "https://dex-atlantic.binance.org/api/v1", "https://dex-european.binance.org/api/v1"],
	BINANCE_API_ENDPOINTS: {
		TX: tx => `/tx/${tx}?format=json`,
	},
	API_COINGECKO: {
		// BASE: "https://api.coingecko.com/api/v3",
		// GET_MARKET_CHART_RANGE: (id = "BNB", from, to) => `/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
		PRICE: (ids, currency) => `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency}`,
	},
	COIN_ID: "oraichain-token",
	DENOM: "orai",
	GRAVITY: "gravity",
	ORAIB: "oraib",
	DENOM_ORAI: "orai",
	MORE: "more",
	TABLE: {
		PAGE_SIZE: 20,
	},
	MIN_MAINTAINANCE: 200,
	NUM: {
		BASE_MULT: 100000000,
		DEFAULT_DECIMALS: 8,
		PAGE_SIZE: 20,
		SPARE_PAGE_CNT: 2, //  amount of pages to preload in pagination
		BINACE_API_ROWS_LIMIT: 1000, //  max rows binance api allows
		BINANCE_API_PAGES_LIMIT: 100, //  max page binance api allows
		REAL_TIME_DELAY_MS: 2000, //  real-time refetch interval(for indexedPagination)
		DASH_REAL_TIME_DELAY_MS: 3000, //  dashboard refetch interval
		DETAIL_REAL_TIME_DELAY_MS: 7000, // detail display refetch interval
		ACCOUNT_REFETCH_INTERVAL_MS: 5000, // TODO : currently not used
		ASSET_REFETCH_INTERVAL_MS: 80000,
		ASSET_REFETCH_PRICE_INTERVAL_MS: 80000,
		BASIC_DATA_FETCH_INTERVAL_MS: 30000,
	},
	ASSET: {
		NAME_SEARCH_PROPERTY: ["asset", "mappedAsset", "name"],
		ORDER_COMPARE: ["mappedAsset", "marketCap", "price", "supply"],
	},
	GET_LOGO_LINK: symbol =>
		_.isString(symbol) ? `https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/thumnail/${_.split(symbol)[0]}}.png` : "",
	API_BASE: api,
	LCD_API_BASE: lcdApi,
	API: {
		STATUS: "/status",
		BLOCKLIST: "/blocks",
		BLOCK: "/block",
		TXS_BLOCK: "/txs-block",
		ACCOUNT: "/account",
		ACCOUNTS: "/accounts",
		ACCOUNT_TXS: acc => `/account/txs/${acc}?page=1&rows=20`,
		TXLIST: "/txs",
		TX: "/txs",
		ORDERS: "/orders",
		ASSET_IMAGES: "/assets-images?page=1&rows=1000",
		ASSETS: "/assets?page=1&rows=1000",
		ASSETS_BEP8: "/assets/mini-tokens?page=1&rows=1000",
		ASSET_PRICES: "/assets?page=1&rows=1000&only_price=true",
		ASSET: "/asset?asset=",
		ASSET_TXS: "/assets/txs?page=1&rows=20&txAsset=",
		ASSET_HOLDERS: "/asset-holders?&page=1&rows=20&asset=",
		TOP_ASSETS: "/market/coin/list",
		CHARTS: "/stats/assets/chart",
		FEE: "/fees",
		VALIDATORS: "/validators",
		UNBONDINGS: "/account/unbonding",
		TXS_ACCOUNT: "/txs-account",
		TXS_CONTRACT: "/txs-contract",
		ORAICHAIN_INFO: "/oraichain_info",
		ACCOUNT_COINS: "/account/coins",
		ACCOUNT_BALANCE: "/account/balance",
		VALIDATOR: "/validator",
		DELEGATOR: "/delegator",
		PROPOSED_BLOCKS: "/proposed-blocks",
		MISSED_BLOCKS: "/validator/missed-block",
		DELEGATIONS: "/delegations",
		PROPOSALS: "proposals",
		PROPOSAL_STATUS: "proposal/status",
		PROPOSALS_TRANSACTIONS: "/proposals/transactions",
		VALIDATOR_ANALYTICS: "/validator-analytics",
		PROPOSAL_VOTES: "/proposal/votes",
		PROPOSALS_TOTAL_TXS: "/proposals/total_txs",
		WALLET: {
			CLAIM_REWARD: "/wallet/claim_reward",
			WITHDRAW: "/wallet/withdraw",
			DELEGATOR: "/wallet/delegator",
			VALIDATOR: "/wallet/validator",
		},
		MIN_FEE: "min_gas",
		FIREBASE_FCM_TOKEN: "/firebase_token",
		EXPORT_DATA: "/account/txs_csv",
		IBC_TOKENS: "/ibc/tokens",
		UPLOAD_IMAGES_VALIDATORS: "/validator/update-image",
		GET_IMAGES_VALIDATORS: "/validator-detail",
		IBC_RELAYERS: "/ibc/relayers",
		IBC_RELAYERS_DETAIL: "/ibc/relayers/channel",
	},
	LCD_API: {
		ACCOUNT_DETAIL: "/cosmos/auth/v1beta1",
		BALANCES: "/cosmos/bank/v1beta1/balances",
		CLAIM_REWARD: "/cosmos/distribution/v1beta1/delegators",
		DELEGATION: "/cosmos/staking/v1beta1/delegations",
		TXS: "/cosmos/tx/v1beta1/txs",
		DENOM_TRACES: "ibc/applications/transfer/v1beta1/denom_traces",
	},
	NETWORK: {
	},
	PREFIX: {
		ORAI_ADDR: "orai",
		ORAI_OPER: "oraivaloper",
		ORAI_CONS: "oraivalcons",
	},
	LINK: {
		GOOGLE: "https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion",
		IOS: "https://apple.co/2IAM3Xm",
		WEB: "https://wallet.cosmostation.io",
		COSMOSTATION: "https://www.cosmostation.io/",
		BINANCEDEX: "https://www.binance.org/",
		COINGECKO_ORAI: "https://www.coingecko.com/en/coins/oraichain-token",
	},
	MENU: [
		{
			display: "DASHBOARD",
			route: "/",
			primary: true,
		},
		{
			display: "VALIDATOR",
			route: "/validators",
		},
		{
			display: "BLOCKS",
			route: "/blocks",
		},
		{
			display: "TRANSACTIONS",
			route: "/txs",
		},
	],
	REQUEST: {
		LIMIT: 10, // Number of records per page
		TIMEOUT: 10000,
		PROPOSED_BLOCKS_LIMIT: 9,
		REQUESTS_LIMIT: 12,
	},
	DOMAIN: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}/`,
	PATH: {
		BLOCKLIST: "/blocks",
		VALIDATORS: "/validators",
		TXLIST: "/txs",
		ACCOUNT: "/account",
		PROPOSALS: "/proposals",
		EXPORT_DATA: "/export-data",
	},
	ADDRESS_PREFIX: {
		VALIDATOR: "oraivaloper",
		ACCOUNT: "orai",
	},
	ANIMATION: {
		DELAY: 100,
	},
	VALID_ORIGINS: ["https://testnet-wallet.web.app", "https://api.wallet.orai.io", "http://localhost:3001", "https://prerelease.wallet.orai.io"],
	DENOM_UORAIB: "oraib"
});
