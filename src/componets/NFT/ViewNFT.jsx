import React, { useContext, useEffect, useState } from 'react';
import './Nft.css';
import { ethers } from "ethers";
import { AccountContext } from '../../context/AccountContext';

const NFTCard = ({ tokenId }) => {

    const url = tokenId <= 500 ? "https://adoge-nft.s3.ap-south-1.amazonaws.com/adoge-batch-1/" : "https://adoge-nft-2.s3.ap-south-1.amazonaws.com/adoge-batch-2/";
    return (
        <div className="nft-card-view">
            <img
                src={
                    `${url}${tokenId}.png`
                }
                alt="NFT"
            // className="nft-image"
            />
            <p>NFT Name : AirDoge #{tokenId}</p>
            <p>Token Id: {tokenId}</p>
        </div>
    );
};

const ViewNFT = () => {

    const { account } = useContext(AccountContext);

    const [myTokens, setMyTokens] = useState([]);

    const [loading, setLoading] = useState(false);


    // Connect to the Ethereum network and set up provider
    const provider = new ethers.JsonRpcProvider("https://network.ambrosus.io");

    // Contract address and ABI
    const contractAddress = "0xb81562A64A6f1CDA748f88DAb3410d2840346413";

    // "0xb81562A64A6f1CDA748f88DAb3410d2840346413"
    const contractABI = [
        // Include only the Transfer event ABI
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
    ];

    // NFT contract
    const nftContract = new ethers.Contract(contractAddress, contractABI, provider);

    // Function to fetch all token IDs held by a wallet
    async function getTokenIdsForWallet(walletAddress) {
        // Fetch all transfer events for the wallet address
        const transferEvents = await nftContract.queryFilter(
            nftContract.filters.Transfer(null, walletAddress)
        );

        // Track the tokenIds owned by the wallet
        let tokenIds = new Set();

        // Process each event
        transferEvents.forEach(event => {
            const { from, to, tokenId } = event.args;

            if (to.toLowerCase() === walletAddress.toLowerCase()) {
                // Add tokenId if transferred to the wallet
                tokenIds.add(String(tokenId));
            }

            if (from.toLowerCase() === walletAddress.toLowerCase()) {
                // Remove tokenId if transferred out of the wallet
                tokenIds.delete(String(tokenId));
            }
        });

        return Array.from(tokenIds);
    }


    useEffect(() => {
        (async () => {
            setLoading(true)
            // const walletAddress = "0xbA8723185b461787494FdbB661946a6E61Fb0ED9";
            const tokens = await getTokenIdsForWallet(account);

            console.log("Token IDs held by wallet:", tokens);
            setLoading(false)
            setMyTokens(tokens)
        })();
    }, [account]);

    // Example usage


    return (
        <div className="nft">
            <h1 className="title2">My NFT Collection</h1>


            <div className="nft-grid">
                {loading || !account ?
                    <>
                        <NFTLoading account={account} loading={loading} />
                    </> :
                    <div className="nft-grid-view">
                        {

                            myTokens.length === 0 ? <NFTLoading account={account} loading={loading} /> : (
                                myTokens.map((tokenId) => {
                                    return (
                                        <NFTCard tokenId={tokenId} />
                                    )
                                })
                            )

                        }


                    </div>
                }

            </div>


        </div>
    );
};

export default ViewNFT;



const NFTLoading = ({ account, loading }) => {



    return (
        <div className="nft-card-loading">
            <img
                src={`DogInBox-ezgif.com-video-to-gif-converter.gif`}

                style={{ width: '100%', height: 'auto' }}
            // className="nft-image"
            />
            <div className="nft-details-loading">

            </div>
            {/* <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div> */}
            <p style={{
                marginTop: "10px",
                color: !account ? "blue" : (
                    loading ? "blue" : "red"
                )

            }}>{!account ? "Please Connect Your Wallet!" : (
                loading ? "Please Wait ..." : "NFT Not Found!!"
            )}
            </p>
        </div>
    );
};
