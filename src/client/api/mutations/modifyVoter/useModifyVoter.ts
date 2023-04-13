import { MutationObserverOptions, useMutation } from 'react-query';

import modifyVoter, {ModifyVotingInput, ModifyVotingOutput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";

const useModifyVoter = (
  { accountAddress }: {
      accountAddress: string
  },
  options?: MutationObserverOptions<
    ModifyVotingOutput,
    Error,
    Omit<ModifyVotingInput, 'mainContract'>
  >,
) => {
  const mainContract = useMainContract();

  return useMutation(
    [FunctionKey.MODIFY_VOTER, { accountAddress }],
    params =>
        modifyVoter({
          mainContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useModifyVoter;
