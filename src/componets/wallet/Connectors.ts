import { InjectedConnector } from '@web3-react/injected-connector'
import {CHAIN_ID} from "../../config/config";
export const injected = new InjectedConnector({
    supportedChainIds: [CHAIN_ID],
})
