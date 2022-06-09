import { isTestnet } from "src/config";

export const NetworkKey = {
    MAINNET: 'mainnet',
}

const networks = {
    [NetworkKey.MAINNET]: {
        chainId: 'Oraichain',
        prefix: 'orai',
        denom: 'orai',
        coinType: 118,
        lcd: 'https://lcd.orai.io',
        rpc: 'https://rpc.orai.io',
        id: NetworkKey.MAINNET,
        fee: { gasPrice: '0', amount: '0', gas: '2000000' }, // 0.000500 ORAI
    },
};

export default networks;

export const network = networks[NetworkKey.MAINNET];

export const mobileBlacklistNetworks = [];
