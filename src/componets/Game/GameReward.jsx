import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GameReward = () => {

    const [reward, setReward] = useState(0);
    const [loading, setLoading] = useState(false);


    // const provider = new ethers.providers.JsonRpcProvider("https://network.ambrosus-test.io/);
    const { account, provider, signer, chainId } = useContext(AccountContext);


    // Initialize wallet (replace with your wallet's private key)
    // const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

    // Contract ABI and address
    const contractABI = [
        // ABI for claimRewards function
        "function claimRewards() external",
        // ABI for getUserReward function
        "function getUserReward(address user) external view returns (uint256)"
    ];

    const contractAddress = "0x305962Ca7398ec6b966C9E2f60ad3A0e3FcDae49";

    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Function to claim rewards
    async function claimRewards() {
        try {
            setLoading(true)
            const tx = await contract.claimRewards();
            console.log("Transaction sent:", tx.hash);
            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
            toast.success("Transaction Successful ", {
                autoClose: 5000,
                theme: "colored",
            });
            setReward(0)
            setLoading(false)
        } catch (error) {
            console.error("Error claiming rewards:", error);
            setLoading(false)
        }
    }

    // Function to get user reward
    async function getUserReward(userAddress) {
        try {
            const reward = await contract.getUserReward(userAddress);
            console.log(reward)
            setReward(ethers.formatUnits(reward, 18))
            // setReward(reward)
        } catch (error) {
            console.error("Error fetching reward:", error);
        }
    }



    useEffect(() => {
        (async () => {
            await getUserReward(account);

        })();
    }, [account, reward])



    const handleClaim = async () => {
        await claimRewards();
    }








    return (
        <div className="game">
            <ToastContainer />
            <h1 className="title2">Game Reward</h1>

            <div className="nft-grid">
                <div className="fund-box" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                    gap: "1rem",
                    width: "300px",
                    height: "200px",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",

                }}>
                    <div>
                        <p>Total Rewards : {reward} ADG</p>
                        <button onClick={handleClaim} disabled={
                            reward == 0 ? true : loading ? true : false
                        } className="fund-btn"> {
                                loading ? "Please Wait ..." : "Claim Reward"
                            } </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameReward;