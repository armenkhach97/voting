import './index.css'
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3'
import NavBar from "./componets/NavBar";
import {Outlet} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function getLibrary(provider: any) {
    return new Web3(provider)
}

function MyApp() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <QueryClientProvider client={queryClient}>
                <div className="bg-gray-100">
                    <NavBar />
                    <Outlet />
                </div>
            </QueryClientProvider>
        </Web3ReactProvider>
    )
}

export default MyApp
