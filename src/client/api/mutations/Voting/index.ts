import type { TransactionReceipt } from 'web3-core';
import {Main} from "../../../../types/contracts";

export interface VoterInput {
  mainContract: Main;
  accountAddress: string;
  votingName: string;
  voterFor: string,
}

export type VoterOutput = TransactionReceipt;

const vote= ({
  mainContract,
  accountAddress,
  votingName,
  voterFor
}: VoterInput): Promise<VoterOutput> => {
  return mainContract.methods.vote(votingName, voterFor).send({from: accountAddress});
}
export default vote;
