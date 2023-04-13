import type { TransactionReceipt } from 'web3-core';
import {Main} from "../../../../types/contracts";
import stringToBytes32 from "../../../../utilites/stringToBytes32";
import web3 from "web3";

export interface CreateVotingInput {
  mainContract: Main;
  accountAddress: string;
  name: string;
  duration: number,
  optionsData: string[],
  description: string,
  group: string,
}

export type CreateVotingOutput = TransactionReceipt;

const createVoting = ({
  mainContract,
  accountAddress,
  name,
  duration,
  optionsData,
  description,
  group
}: CreateVotingInput): Promise<CreateVotingOutput> => {
  const optionByBytes = [];
  for (const option of optionsData) {
    optionByBytes.push(stringToBytes32(option))
  }
  return mainContract.methods.createVoting(stringToBytes32(name), web3.utils.numberToHex(duration), optionByBytes, stringToBytes32(description), +group).send({from: accountAddress});
}
export default createVoting;
