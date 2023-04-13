import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import getWeb3NoAccount from '../web3/getWeb3NoAccount';
import mainAbi from '../../constants/abi/main.json';

import { Main } from '../../types/contracts';
import {contractAddress} from "../../constants/contract/addrsses";

const getContract = <T>(abi: AbiItem | AbiItem[], address: string, web3Instance: Web3) => {
  const web3 = web3Instance ?? getWeb3NoAccount();
  return new web3.eth.Contract(abi, address) as unknown as T;
};

export const getMainContract = (web3: Web3) =>
    getContract(
        mainAbi as AbiItem[],
        contractAddress,
        web3,
    ) as unknown as Main;
