import React from 'react';
import {Link} from "react-router-dom";
import {useWeb3React} from "@web3-react/core";
import {injected} from "../wallet/Connectors";
import switchNetwork from "../wallet/SwitchNetwork";
import useGetRole from "../../client/api/queries/getRole/useGetRole";

const NavBar = () => {
    const {active, account, activate, error} = useWeb3React();

    async function connect() {
        try {
            await activate(injected)
            if (error) {
                await switchNetwork()
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    const {data: access} = useGetRole({
        accountAddress: account || ''
    }, {enabled: !!account})

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex space-x-4">
                            <Link to={`/`}
                                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</Link>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        {access ? <Link to={`/voting`}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Admin Panel</Link> : null}
                        <button onClick={connect}
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            {active ? `${account?.slice(0, 6)}...${account?.slice(-4)}` : 'Connect Wallet'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
