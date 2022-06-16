import {networks} from "./constants/networks";

export const isTestnet = process.env.REACT_APP_IS_TEST_NET || localStorage?.getItem("network") === networks.TESTNET;
// export const isTestnet = true;
const config = Object.freeze({
	SCAN_API: process.env.REACT_APP_API_PROD || process.env.REACT_APP_API_DEV || "https://api.bridge.orai.io/v1",
	LCD_API: process.env.REACT_APP_LCD_API || "https://bridge-v2.lcd.orai.io",
});

export default config;
