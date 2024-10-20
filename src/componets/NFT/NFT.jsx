import React, { useContext, useEffect, useState } from 'react';
import './Nft.css';
import { ethers } from "ethers";
import { AccountContext } from '../../context/AccountContext';
import { toast, ToastContainer } from 'react-toastify';

// NFT Contract ABI
const nftAbi = [
    "function safeMint(address to) public payable",
    "function getTokenId() public view returns (uint256)",
    "function getPrice() public view returns (uint256)"
];


const NFTCard = ({ loading, currentTokenId, totalSupply, priceInEth, handleMint }) => {

    const progress = ((currentTokenId - 1) / totalSupply) * 100

    const url1 = "https://adoge-nft.s3.ap-south-1.amazonaws.com/adoge-batch-1/"; // for 1 to 500 images
    const url2 = "https://adoge-nft-2.s3.ap-south-1.amazonaws.com/adoge-batch-2/";
    `https://xenplay.s3.ap-south-1.amazonaws.com/adogenfttest/${currentTokenId}.png`

    const url = currentTokenId <= 500 ? "https://adoge-nft.s3.ap-south-1.amazonaws.com/adoge-batch-1/" : "https://adoge-nft-2.s3.ap-south-1.amazonaws.com/adoge-batch-2/";

    return (
        <div className="nft-card">
            <img
                src={
                    `${url}${currentTokenId}.png`
                }
                alt="NFT"
                className="nft-image"
            />
            <div className="nft-details">
                <div>
                    <p>Collection Name : </p>
                    <p>Total NFTs: </p>
                    <p>Cost per NFT: </p>
                    <p>Status: </p>
                </div>
                <div>
                    <p>I AM $ADOGE</p>
                    <p>{totalSupply}</p>
                    <p>{priceInEth} AMB</p>
                    <p>In Progress</p>
                </div>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <p style={{
                marginTop: "10px"
            }}>Mint : {currentTokenId - 1}/{totalSupply}</p>
            <button
                disabled={
                    loading || currentTokenId === null || currentTokenId > totalSupply
                }
                onClick={() => {
                    if (loading) {
                        console.log("Minting")
                    } else {
                        handleMint();
                    }
                }
                } className="mint-button">

                {currentTokenId > totalSupply
                    ? "Total Supply Reached"
                    : loading
                        ? "Minting..."
                        : `Mint`
                }

            </button>
        </div>
    );
};

const NFT = () => {
    const [loading, setLoading] = useState(false); // Loading state for button actions
    const [currentTokenId, setCurrentTokenId] = useState(null);
    const [priceInAMB, setPriceInAMB] = useState(0)

    // const [provider, setProvider] = useState();
    // const [signer, setSigner] = useState();
    // const [chainId, setChainId] = useState();



    const priceInEth = "1"; // Assuming the price is 0.1 AMB
    const nftContractAddress = "0xf44c347afd2EfC602562C5fD14D3F13BfD8F0F5e"; // Replace with your contract address
    const totalSupply = "10";

    const { account, provider, signer, chainId } = useContext(AccountContext);






    useEffect(() => {
        const initProvider = async () => {
            if (signer) {
                // console.log(signer);
                await fetchCurrentTokenId(signer); // Pass signer instead of provider
                await fetchPrice(signer);
            }
        };

        // console.log(account)

        initProvider();
    }, [signer, account]);

    // Fetch the current token ID from the NFT contract
    const fetchCurrentTokenId = async signer => {
        try {
            const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer); // Use signer instead of provider
            const tokenId = await nftContract.getTokenId();
            setCurrentTokenId(Number(tokenId)); // Store tokenId in state
            console.log(Number(tokenId));
            return Number(tokenId);
        } catch (error) {
            console.error("Error fetching token ID:", error);
        }
    };

    const handleMint = async () => {
        console.log("called");

        const tokenId = await fetchCurrentTokenId(signer); //1
        if (tokenId <= totalSupply) {
            try {
                setLoading(true);
                const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);
                const userAddress = await signer.getAddress();
                console.log(userAddress);

                // Construct the tokenUri based on the current tokenI

                // Convert price from string to AMB using ethers' parseUnits function
                const tx = await nftContract.safeMint(userAddress, {
                    value: ethers.parseEther(String(priceInAMB))
                });
                await tx.wait(); // Wait for minting transaction to complete

                console.log("NFT minted successfully!");
                toast.success("NFT minted successfully!", {
                    autoClose: 5000,
                    theme: "colored",
                });

                // Optionally, fetch the next token ID after minting
                await fetchCurrentTokenId(signer);
            } catch (error) {
                console.error("Error during minting:", error);
            } finally {
                setLoading(false);
            }
        }
    };


    const fetchPrice = async signer => {
        try {
            const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer); // Use signer instead of provider
            const price = await nftContract.getPrice();
            // setPrice(Number(tokenId)); // Store tokenId in state
            const priceInDecimal = parseFloat(Number(price) / 10 ** 18);

            setPriceInAMB(priceInDecimal);
            return priceInDecimal;
        } catch (error) {
            console.error("Error fetching token ID:", error);
        }
    };

    return (
        <div className="nft">
            <h1 className="title2">Airdoge NFT Collection</h1>
            <ToastContainer />
            <div className="nft-grid">
                {currentTokenId < 0 || currentTokenId === null || chainId != 16718 || !account ?
                    <>
                        <NFTLoading account={account} />
                    </> : <NFTCard loading={loading} currentTokenId={currentTokenId} totalSupply={totalSupply} priceInEth={priceInAMB} handleMint={handleMint} />}

            </div>

        </div>
    );
};

export default NFT;



const NFTLoading = ({ account }) => {



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
                marginTop: "10px"
            }}>{account ? "Please Wait ..." : "Please Connect Your Wallet"}
            </p>
        </div>
    );
};
