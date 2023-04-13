import { useMemo } from 'react';

import useWeb3 from '../web3/useWeb3';

import {
  getMainContract
} from './getters';

export const useMainContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getMainContract(web3), [web3]);
};
