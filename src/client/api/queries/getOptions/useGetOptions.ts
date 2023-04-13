import { QueryObserverOptions, useQuery } from 'react-query';
import FunctionKey from '../../../../constants/functionKey';

import getOptions, { GetOptionsInput, GetOptionsOutput } from "./index";
import {useMainContract} from "../../../contracts";

type Options = QueryObserverOptions<
  GetOptionsOutput,
  Error,
  GetOptionsOutput,
  GetOptionsOutput,
  [FunctionKey.GET_VOTINGS, string]
>;

const useGetOptions = (
  {votingName}: Omit<GetOptionsInput, 'mainContract'>,
  options?: Options,
) => {
  const mainContract = useMainContract();

  return useQuery(
    [FunctionKey.GET_VOTINGS, votingName],
    () => getOptions({ mainContract, votingName }),
    options,
  );
};

export default useGetOptions;
