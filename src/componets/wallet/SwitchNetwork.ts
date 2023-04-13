declare global {
    interface Window {
        ethereum: any;
    }
}
const switchNetwork = async () => {
    if (!window.ethereum) {
        console.error("Can't set up the BSC network on wallet because window.ethereum is undefined");
        return false;
    }

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                {
                    chainId: '0xAA36A7',
                },
            ],
        });

        return true;
    } catch (error) {
        console.error('Failed to set up network on wallet:', error);
        return false;
    }
};

export default switchNetwork;
