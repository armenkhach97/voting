import { MutationObserverOptions, useMutation } from 'react-query';

import {AddVoterInput, AddVoterOutput} from "./index";
import FunctionKey from "../../../../constants/functionKey";
import {useMainContract} from "../../../contracts";
import addVoter from "./index";

const useAddVoter = (
  { accountAddress }: {
      accountAddress: string
  },
  options?: MutationObserverOptions<
      AddVoterOutput,
    Error,
    Omit<AddVoterInput, 'mainContract'>
  >,
) => {
  const mainContract = useMainContract();

  return useMutation(
    [FunctionKey.ADD_VOTER, { accountAddress }],
    params =>
        addVoter({
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

export default useAddVoter;
