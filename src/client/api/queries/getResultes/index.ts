import { Main } from '../../../../types/contracts';

export interface GetResultsInput {
  mainContract: Main;
  votingName: string
}

export type GetResultsOutput = string[];

const getResults = async ({
  mainContract,
  votingName
}: GetResultsInput): Promise<GetResultsOutput> => {
  return await mainContract.methods.getResults(votingName).call();
};

export default getResults;
