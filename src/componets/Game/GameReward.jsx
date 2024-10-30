import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { AccountContext } from "../../context/AccountContext";

const GameReward = () => {


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

    const contractAddress = "0x88940eB49cE63359655BEb92b7F2E4c8E0eDE3E9";

    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Function to claim rewards
    async function claimRewards() {
        try {
            const tx = await contract.claimRewards();
            console.log("Transaction sent:", tx.hash);
            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
        } catch (error) {
            console.error("Error claiming rewards:", error);
        }
    }

    // Function to get user reward
    async function getUserReward(userAddress) {
        // console.log(userAddress);
        try {
            const reward = await contract.getUserReward(userAddress);
            // console.log(reward);
            // console.log(ethers.utils.formatUnits(reward, 18), 'REWARD'); // Adjust decimals if necessary
            return reward;
        } catch (error) {
            console.error("Error fetching reward:", error);
        }
    }



    useEffect(() => {
        (async () => {
            // Claim rewards for the connected wallet
            // await claimRewards();

            // Fetch reward for the connected wallet
            // console.log(account)
            const reward = await getUserReward(account);
            if (reward && ethers.BigNumber.isBigNumber(reward)) {
                console.log("Your reward:", ethers.utils.formatUnits(reward, 18));
            } else {
                console.error("Reward is either undefined or not a BigNumber:", reward);
            }
            // console.log("Your reward:", ethers.utils.formatUnits(reward, 18)); // Adjust decimals if necessary
            const rewardBigNumber = ethers.BigNumber.from(reward);
            console.log("Your reward:", ethers.utils.formatUnits(rewardBigNumber, 18));
        })();
    }, [account])






    return (
        <div className="game">

        </div>
    )
}

export default GameReward;