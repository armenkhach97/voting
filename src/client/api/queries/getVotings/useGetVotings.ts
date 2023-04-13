import { QueryObserverOptions, useQuery } from 'react-query';
import FunctionKey from '../../../../constants/functionKey';

import {GetVotingsInput, GetVotingsOutput} from "./index";
import {useMainContract} from "../../../contracts";
import getVotings from "./index";

type Options = QueryObserverOptions<
  GetVotingsOutput,
  Error,
  GetVotingsOutput,
  GetVotingsOutput,
  [FunctionKey.GET_VOTINGS, string]
>;

const useGetVotings = (
  {}: Omit<GetVotingsInput, 'mainContract'>,
  options?: Options,
) => {
  const mainContract = useMainContract();

  return useQuery(
    [FunctionKey.GET_VOTINGS, 'votings'],
    () => getVotings({ mainContract }),
    options,
  );
};

export default useGetVotings;
