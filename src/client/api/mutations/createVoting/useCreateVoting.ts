import { MutationObserverOptions, useMutation } from 'react-query';

import createVoting, {CreateVotingInput, CreateVotingOutput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";

const useCreateVoting = (
  { accountAddress }: {
      accountAddress: string
  },
  options?: MutationObserverOptions<
    CreateVotingOutput,
    Error,
    Omit<CreateVotingInput, 'mainContract'>
  >,
) => {
  const mainContract = useMainContract();

  return useMutation(
    [FunctionKey.CREATE_VOTINGS, { accountAddress }],
    params =>
      createVoting({
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

export default useCreateVoting;
