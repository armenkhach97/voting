import {RPC_URL} from '../../config/config';
import Web3 from 'web3';

const getWeb3NoAccount = () => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
    timeout: 10000,
  });
  return new Web3(httpProvider);
};

export default getWeb3NoAccount;
