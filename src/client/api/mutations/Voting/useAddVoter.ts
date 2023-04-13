import { MutationObserverOptions, useMutation } from 'react-query';

import vote, {VoterInput, VoterOutput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";

const useVote = (
  { accountAddress }: {
      accountAddress: string
  },
  options?: MutationObserverOptions<
    VoterOutput,
    Error,
    Omit<VoterInput, 'mainContract'>
  >,
) => {
  const mainContract = useMainContract();

  return useMutation(
    [FunctionKey.CREATE_VOTINGS, { accountAddress }],
    params =>
        vote({
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

export default useVote;
