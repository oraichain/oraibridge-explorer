// @ts-nocheck
import Cosmos from "@oraichain/cosmosjs";
import config from "src/config.js";
import { network } from "src/lib/config/networks";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import CosmosMessages from "@oraichain/cosmos-messages";
import typeSend from "src/constants/typeSend";
import consts from "src/constants/consts";
import messagesErrors from 'src/constants/messages';

export const broadcastModeObj = {
    BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
    BROADCAST_MODE_ASYNC: "BROADCAST_MODE_ASYNC",
    BROADCAST_MODE_SYNC: "BROADCAST_MODE_SYNC",
    BROADCAST_MODE_UNSPECIFIED: "BROADCAST_MODE_UNSPECIFIED",
};

export default class WalletStation {
    constructor() {
        const cosmos = new Cosmos(network.lcd, network.chainId);
        cosmos.setBech32MainPrefix(consts.DENOM);
        this.cosmos = cosmos;
    }

    broadcastMsg = async (wallet, txBody, broadcastMode, fees) => {
        try {
            return this.cosmos.submit(wallet, txBody, broadcastMode, fees);
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    collectWallet = async () => {
        const keplr = await window.Wallet.getKeplr();
        if (!keplr) {
            throw messagesErrors.INSTALL_KEPLR_FIRST;
        }
        return keplr.getOfflineSigner(this.cosmos.chainId);
    };

    sendCoin = async (args, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const { type = typeSend.SEND, totalAmount, fromAddress, toAddress, arr_send, msg } = args;
        const wallet = await this.collectWallet();
        const amount = [{ denom: this.cosmos.bech32MainPrefix, amount: totalAmount?.toString() }];
        let message = "";
        switch (type) {
            case typeSend.SEND:
                message = CosmosMessages.getMsgSend(fromAddress, toAddress, amount);
                break;
            case typeSend.MULTISEND:
                message = CosmosMessages.getMsgMultiSend(fromAddress, amount, arr_send);
                break;
            default:
                break;
        }
        const txBody = this.cosmos.constructTxBody({ messages: [message] });
        return this.broadcastMsg(wallet, txBody, broadcastMode);
    };

    delegate = async (delegator_address, validator_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgDelegate(delegator_address, validator_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages: [message] }), broadcastMode);
    }

    undelegate = async (delegator_address, validator_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgUndelegate(delegator_address, validator_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages: [message] }), broadcastMode);
    }

    redelegate = async (validator_src_address, validator_dst_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgReDelegate(validator_src_address, validator_dst_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages: [message] }), broadcastMode);
    }

    withdrawCommission = async (validator_address, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgWithdrawValidatorCommission(validator_address);
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages: [message] }), broadcastMode);
    }

    withdrawDelegatorReward = async (msgs, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        let messages = [];
        for (let msg of msgs) {
            messages.push(CosmosMessages.getMsgWithdrawDelegatorReward(msg.delegator_address, msg.validator_address));
        }
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages }), broadcastMode);
    }
}

export const walletStation = new WalletStation();
