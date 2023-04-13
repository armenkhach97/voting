import type { TransactionReceipt } from 'web3-core';
import {Main} from "../../../../types/contracts";

export interface AddVoterInput {
  mainContract: Main;
  accountAddress: string;
  voterAddress: string;
  group: string,
}

export type AddVoterOutput = TransactionReceipt;

const addVoter = ({
  mainContract,
  accountAddress,
  voterAddress,
  group
}: AddVoterInput): Promise<AddVoterOutput> => {
  return mainContract.methods.addVoter(voterAddress, +group).send({from: accountAddress});
}
export default addVoter;
