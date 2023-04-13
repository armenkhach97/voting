import { QueryObserverOptions, useQuery } from 'react-query';
import FunctionKey from '../../../../constants/functionKey';

import getResults , {GetResultsInput, GetResultsOutput} from "./index";
import {useMainContract} from "../../../contracts";

type Options = QueryObserverOptions<
  GetResultsOutput,
  Error,
  GetResultsOutput,
  GetResultsOutput,
  [FunctionKey.GET_RESULTS, string]
>;

const useGetResults = (
  { votingName }: Omit<GetResultsInput, 'mainContract'>,
  options?: Options,
) => {
  const mainContract = useMainContract();

  return useQuery(
    [FunctionKey.GET_RESULTS, votingName],
    () => getResults({ mainContract, votingName }),
    options,
  );
};

export default useGetResults;
