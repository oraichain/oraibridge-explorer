import { Bech32Address } from '@keplr-wallet/cosmos';
import config from 'src/config';
import networks, { NetworkKey } from './networks';
/**
 * A list of Cosmos chain infos. If we need to add / remove any chains, just directly update this variable.
 */

// temporary. When use Wallet => no need to suggest chain
export const embedChainInfos = [
    {
        rpc: networks[NetworkKey.MAINNET].rpc,
        rest: networks[NetworkKey.MAINNET].lcd,
        chainId: networks[NetworkKey.MAINNET].chainId,
        chainName: 'Oraichain',
        stakeCurrency: {
            coinDenom: 'ORAI',
            coinMinimalDenom: networks[NetworkKey.MAINNET].denom,
            coinDecimals: 6,
            coinGeckoId: 'oraichain-token',
            coinImageUrl:
                'https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png'
        },
        bip44: {
            coinType: networks[NetworkKey.MAINNET].coinType
        },
        bech32Config: Bech32Address.defaultBech32Config(networks[NetworkKey.MAINNET].prefix),
        get currencies() {
            return [
                this.stakeCurrency,
                {
                    coinDenom: 'AIRI',
                    coinMinimalDenom:
                        'cw20:orai10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg:aiRight Token',
                    coinDecimals: 6,
                    coinGeckoId: 'airight',
                    coinImageUrl:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/11563.png'
                }
            ];
        },
        get feeCurrencies() {
            return [this.stakeCurrency];
        },
        gasPriceStep: {
            low: 0,
            average: 0.000025,
            high: 0.00004
        },
        features: ['stargate', 'no-legacy-stdTx', 'ibc-transfer', 'cosmwasm']
    }
];