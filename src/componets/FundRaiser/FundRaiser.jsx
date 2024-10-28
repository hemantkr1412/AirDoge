import "./FundRaiser.css";
import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { AccountContext } from "../../context/AccountContext";
import { NFTLoading } from "../NFT/NFT";
import { FaCopy } from 'react-icons/fa';
const FundRaiser = () => {

    const [ethAmount, setEthAmount] = useState("");
    const [adgTokens, setAdgTokens] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [adgRemaining, setAdgRemaining] = useState(null); // ADG balance state
    const [adgSold, setAdgSold] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');

    const tokenRate = "20";
    const { account, signer } = useContext(AccountContext);
    const fundraiseContract = "0xF8AE9dD501ABFd5e58134C41aE832a983A7005Ad";
    const adgTokenAddress = "0x50c32756E5214443435FD391323f2923C1564153";
    const abi = [
        {
            inputs: [],
            stateMutability: "payable",
            type: "function",
            name: "contribute",
            outputs: []
        }
    ];
    const adgAbi = [
        {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function"
        }
    ];

    useEffect(() => {
        fetchAdgBalance();
    }, [signer]);

    const fetchAdgBalance = async () => {
        try {
            const provider = signer.provider;
            const adgContract = new ethers.Contract(adgTokenAddress, adgAbi, provider);
            const balance = await adgContract.balanceOf(fundraiseContract);
            setAdgRemaining(formatBalance(balance));
        } catch (error) {
            console.error("Failed to fetch ADG balance:", error);
        }
    };
    const formatBalance = balance => {
        const formattedBalance = ethers.formatUnits(balance, 18);
        const numBalance = parseFloat(formattedBalance);

        // if (numBalance >= 1e6) return (numBalance / 1e6).toFixed(3) + "M";
        // if (numBalance >= 1e3) return (numBalance / 1e3).toFixed(3) + "K";
        // if (numBalance === 0) {
        //     return 0;
        // }


        setAdgSold(10000000 - numBalance)

        return numBalance.toFixed(2);
    };

    const calculateAdgTokens = eth => {
        const adgAmount = eth * tokenRate;
        setAdgTokens(adgAmount);
    };

    const handleInputChange = e => {
        setEthAmount(e.target.value);
        calculateAdgTokens(e.target.value);
    };

    const contribute = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to contribute.");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const contract = new ethers.Contract(fundraiseContract, abi, signer);

            const tx = await contract.contribute({
                value: ethers.parseEther(ethAmount)
            });

            await tx.wait();
            setMessage({
                text: "Contribution successful! Thank you for support.",
                color: "green"
            });
        } catch (error) {
            console.error(error);
            setMessage({
                text: "Transaction failed. Please try again.",
                color: "red"
            });
        } finally {
            setLoading(false);
        }
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(adgTokenAddress)
            .then(() => {
                setCopySuccess('Copied');
                setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
            })
            .catch(err => {
                setCopySuccess('Failed to copy!');
                setTimeout(() => setCopySuccess(''), 2000); // Hide message after 2 seconds
            });
    };

    return (
        <div className="nft">
            <h1 className="title2">ADG Token Sale</h1>


            <div style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                // flexDirection: "column"
            }}>
                <p className="sub-title">CA : {adgTokenAddress}</p>
                <div className="tokenomics-ca-copy-icon" onClick={copyToClipboard} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                    <FaCopy />
                </div>
                {copySuccess && (
                    <p className="copy-notification" style={{ color: 'green', marginTop: '10px', fontFamily: "1rem", fontWeight: "700" }}>
                        {copySuccess}
                    </p>
                )}
            </div>

            <p className="sub-title"> Total Number of ADG Tokens Sold : {adgSold} /10000000</p>
            <div className="nft-grid">
                {
                    account ?

                        <div className="fund-box" style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "1rem",
                            gap: "1rem",
                            width: "300px",
                            height: "300px",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",

                        }}>
                            <p>Enter the Number of AMB Tokens</p>
                            <div style={{ position: "relative", display: "inline-block" }}>

                                <input
                                    value={ethAmount}
                                    onChange={(e) => {
                                        setMessage("")
                                        const value = e.target.value;
                                        // Allow only numbers
                                        if (/^\d*\.?\d*$/.test(value)) {
                                            handleInputChange(e); // Only update if the input is valid
                                        }
                                    }}
                                    style={{
                                        width: "200px",
                                        height: "50px",
                                        backgroundColor: "white",
                                        borderRadius: "10px",
                                        paddingRight: "35px", // Room for icon if needed
                                        color: "black",
                                        padding: "0.3rem"
                                    }}
                                    placeholder="Number of AMB Tokens"
                                    type="text"
                                />
                                <img
                                    src="AirdaoLogo.jpg" // Replace with your logo's URL or import
                                    alt="logo"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "20px",
                                        height: "20px",

                                    }}
                                />
                            </div>
                            {!adgTokens ? <></> : <p>You will receive: <strong>{adgTokens} ADG</strong> tokens</p>}
                            <button onClick={contribute} disabled={loading || !ethAmount} className="fund-btn">  {loading ? "Processing..." : "Contribute"}</button>
                            {message && <p style={{
                                color: message.color
                            }}>{message.text}</p>}
                        </div>
                        :
                        <NFTLoading account={account} />
                }
            </div>

        </div>
    )
}

export default FundRaiser