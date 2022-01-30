import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Layout from '../components/layout';
import { bscTokenABI } from '../public/constants/bsc-token-abi';

const providerChain = 56;
const bscTokenAddresses = [
    {
        address: '0x55d398326f99059fF775485246999027B3197955',
        token: 'USDT'
    },
    {
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        token: 'BUSD'
    },
    {
        address: '0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
        token: 'BCOIN',
    },
];

const Wallets: NextPage = () => {
    const [web3, setWeb3] = useState<Web3>();
    const [ethereum, setEthereum] = useState<any>(null);

    const [chainId, setChainId] = useState(0);
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [accAddress, setAccAddress] = useState('');
    const [connectTxt, setConnectTxt] = useState('Connect');
    const [bnbBalance, setBnbBalance] = useState('0');
    const [usdtBalance, setUsdtBalance] = useState('0');
    const [busdBalance, setBusdBalance] = useState('0');
    const [bcoinBalance, setBcoinBalance] = useState('0');
    const [showBalance, setShowBalance] = useState(false);
    const [balanceLoading, setBalanceLoading] = useState(false);

    useEffect(() => {
        const fWeb3 = new Web3(Web3.givenProvider);
        const fethereum = (window as any).ethereum;

        setWeb3(fWeb3);
        setEthereum(fethereum);
        if (!fethereum) {
            console.log('Please install MetaMask!');
        } else {
            onInitChainId(fethereum);
            onInitAccAddress(fethereum);
        }
    }, []);

    async function onInitChainId(ethereum: any) {
        const chainId: string = await ethereum.request({ method: 'eth_chainId' });
        onChainIdChange(chainId);
        ethereum.on('chainChanged', (e: string) => onChainIdChange(e));
    }
    function onChainIdChange(chainId: string) {
        if (parseInt(chainId, 16) !== providerChain) {
            setIsWrongNetwork(true);
        } else {
            setIsWrongNetwork(false);
            setShowBalance(false);
        }
        setChainId(parseInt(chainId, 16));
    }
    function setNetworkChainId() {
        ethereum?.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: '0x' + providerChain.toString(16)
            }],
        });
    }

    async function onInitAccAddress(ethereum: any) {
        const accs = await ethereum.request({ method: 'eth_accounts' });
        onAccountsChange(accs);
    }
    async function onAccountsChange(accounts: string[]) {
        if (!accounts?.length) {
            console.log('Please Connect Matamask');
        } else {
            setAccAddress(accounts[0]);
        }
    }
    async function clickConnectWallet() {
        setConnectTxt('Connecting');
        const reqAccs = await ethereum.request({ method: 'eth_requestAccounts' });
        setConnectTxt('Connected');

        onAccountsChange(reqAccs);
    }

    async function clickShowBalance(value: boolean) {
        await getBalance();
        setShowBalance(value);
    }

    async function getBalance() {
        if (isWrongNetwork) {
            return;
        }

        setBalanceLoading(true);

        web3?.eth.getBalance(accAddress, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                const bnbBalance = web3.utils.fromWei(result, "ether") + '';
                setBnbBalance(bnbBalance);
            }
        });

        for await (const token of bscTokenAddresses) {
            const tokenInst = web3 && new web3.eth.Contract(bscTokenABI as any, token.address);
            const balance = await tokenInst?.methods.balanceOf(accAddress).call();
            const convBalance = web3?.utils.fromWei(balance, 'ether') + '';
            if (token.token === 'USDT') {
                setUsdtBalance(convBalance);
            } else if (token.token === 'BUSD') {
                setBusdBalance(convBalance);
            } else if (token.token === 'BCOIN') {
                setBcoinBalance(convBalance);
            }
        }

        setBalanceLoading(false);
    }

    let loadingBalanceEl = <></>;
    if (balanceLoading) {
        loadingBalanceEl = <div>Loading...</div>;
    }

    return (<>
        <Layout>
            <main className='px-3 py-10'>
                {
                    !accAddress && <div className="mb-3 text-center" onClick={clickConnectWallet}>
                        <button type='button' className='btn btn-primary'>
                            {connectTxt}
                        </button>
                    </div>
                }
                {
                    isWrongNetwork && <div className="mb-3 text-white">
                        <strong className='inline-block text-lg text-red-400'>Wrong network</strong> :
                        <button type='button' className='btn btn-primary m-1' onClick={setNetworkChainId}>Switch Network</button>
                    </div>
                }
                <div className="mb-3 text-white">
                    <strong className='text-lg'>Chain Id</strong> : {chainId}
                </div>
                {
                    !!accAddress && !isWrongNetwork && <div className="mb-3 text-white">
                        <strong className='text-lg'>Account Address</strong>
                        <div className="mb-4">
                            {accAddress || '-'}
                        </div>
                        <div className="mb-3">
                            <button type='button' className='btn btn-primary' onClick={() => clickShowBalance(!showBalance)}>
                                {!showBalance ? 'Show' : 'Hide'} Balance
                            </button>
                            {loadingBalanceEl}
                        </div>
                    </div>
                }
                {
                    !!showBalance && <div className="text-white">
                        <div className="flex items-center mb-2">
                            <Image src='/assets/logo/bnb.svg' width={24} height={24} objectFit='contain' alt='bnb-logo'></Image>
                            <div className="mx-3">: {bnbBalance} BNB</div>
                        </div>
                        <div className="flex items-center mb-2">
                            <Image src='/assets/logo/busdt_32.webp' width={24} height={24} objectFit='contain' alt='usdt-logo'></Image>
                            <div className="mx-3">: {usdtBalance} USDT</div>
                        </div>
                        <div className="flex items-center mb-2">
                            <Image src='/assets/logo/busd_32.webp' width={24} height={24} objectFit='contain' alt='usdt-logo'></Image>
                            <div className="mx-3">: {busdBalance} BUSD</div>
                        </div>
                        <div className="flex items-center mb-2">
                            <Image src='/assets/logo/bombcrypto_32.webp' width={24} height={24} objectFit='contain' alt='usdt-logo'></Image>
                            <div className="mx-3">: {bcoinBalance} BCOIN</div>
                        </div>
                    </div>
                }
            </main>
        </Layout>
    </>);
}

export default Wallets;
