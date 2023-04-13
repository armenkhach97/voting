import { MutationObserverOptions, useMutation } from 'react-query';

import getIsVoted , {GetIsVotedOutput,GetIsVotedInput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";

const useIsVotedVoter = (
    { accountAddress }: {
      accountAddress: string
    },
    options?: MutationObserverOptions<
        GetIsVotedOutput,
        Error,
        Omit<GetIsVotedInput, 'mainContract'>
        >,
) => {
  const mainContract = useMainContract();

  return useMutation(
      [FunctionKey.CREATE_VOTINGS, { accountAddress }],
      params =>
          getIsVoted({
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

export default useIsVotedVoter;
