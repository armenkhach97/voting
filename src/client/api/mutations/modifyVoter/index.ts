import type { TransactionReceipt } from 'web3-core';
import {Main} from "../../../../types/contracts";

export interface ModifyVotingInput {
  mainContract: Main;
  accountAddress: string;
  voterAddress: string;
  group: string,
}

export type ModifyVotingOutput = TransactionReceipt;

const modifyVoter = ({
  mainContract,
  accountAddress,
  voterAddress,
  group
}: ModifyVotingInput): Promise<ModifyVotingOutput> => {
  return mainContract.methods.modifyVoter(voterAddress, +group).send({from: accountAddress});
}
export default modifyVoter;
