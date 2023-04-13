import { Main } from '../../../../types/contracts';

export interface GetVotingsInput {
  mainContract: Main;
}
export type Voting = {
  name: string,
  description: string,
  group: string,
  endTime: string,
  winner: string
}
export type GetVotingsOutput = { data: Voting[] };

const getVotings = async ({
  mainContract,
}: GetVotingsInput): Promise<GetVotingsOutput> => {
  const votingNames = await mainContract.methods.getVotingNames().call();
  const votings: Voting[] = [];
  for (const v of votingNames) {
    const vote = await mainContract.methods.votings(v).call();
    const winner = await mainContract.methods.getWinner(v).call();
    votings.push({
      name: v,
      description: vote.description,
      group: vote.group,
      endTime: vote.endTime,
      winner: winner
    })
  }
  return {data: votings};
};

export default getVotings;
