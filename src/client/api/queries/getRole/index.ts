import { Main } from '../../../../types/contracts';
import {adminAddress} from "../../../../constants/contract/addrsses";

export interface GetRoleInput {
  mainContract: Main;
  accountAddress: string;
}
export type Role = boolean;
export type GetRoleOutput = Role;

const getRole = async ({
  mainContract,
  accountAddress
}: GetRoleInput): Promise<GetRoleOutput> => {
  return await mainContract.methods.hasRole(adminAddress, accountAddress).call();
};

export default getRole;
