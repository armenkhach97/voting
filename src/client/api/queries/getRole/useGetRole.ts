import { QueryObserverOptions, useQuery } from 'react-query';
import FunctionKey from '../../../../constants/functionKey';

import {GetRoleInput, GetRoleOutput} from "./index";
import {useMainContract} from "../../../contracts";
import getRole from "./index";

type Options = QueryObserverOptions<
  GetRoleOutput,
  Error,
  GetRoleOutput,
  GetRoleOutput,
  [FunctionKey.GET_ROLE, string]
>;

const useGetRole = (
  {accountAddress}: Omit<GetRoleInput, 'mainContract'>,
  options?: Options,
) => {
  const mainContract = useMainContract();

  return useQuery(
    [FunctionKey.GET_ROLE, accountAddress],
    () => getRole({ mainContract, accountAddress }),
    options,
  );
};

export default useGetRole;
