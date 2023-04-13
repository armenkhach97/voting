import { Main } from '../../../../types/contracts';

export interface GetIsVotedInput {
  mainContract: Main;
  accountAddress: string,
  votingName: string,
}

export type GetIsVotedOutput = boolean;

const getIsVoted = async ({
  mainContract,
  accountAddress,
  votingName,
}: GetIsVotedInput): Promise<GetIsVotedOutput> => {
  return await mainContract.methods.isVoted(votingName, accountAddress).call();
};

export default getIsVoted;
