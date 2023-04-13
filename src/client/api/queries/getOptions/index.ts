import { Main } from '../../../../types/contracts';

export interface GetOptionsInput {
  mainContract: Main;
  votingName: string;
}

export type GetOptionsOutput = string[];

const getOptions = async ({
  mainContract,
  votingName
}: GetOptionsInput): Promise<GetOptionsOutput> => {
  return await mainContract.methods.getOptions(votingName).call();
};

export default getOptions;
