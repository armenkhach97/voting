import web3 from "web3";

const stringToBytes32 = (str: string) => {
    return web3.utils.fromAscii(str);
}
export default stringToBytes32;
