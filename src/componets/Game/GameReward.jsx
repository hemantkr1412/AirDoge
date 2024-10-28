import { ethers } from "ethers";

const GameReward = () => {


    const provider = new ethers.providers.JsonRpcProvider("YOUR_PROVIDER_URL");

    // Initialize wallet (replace with your wallet's private key)
    const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

    // Contract ABI and address
    const contractABI = [
        // ABI for claimRewards function
        "function claimRewards() external",
        // ABI for getUserReward function
        "function getUserReward(address user) external view returns (uint256)"
    ];

    const contractAddress = "YOUR_CONTRACT_ADDRESS";

    // Initialize the contract
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

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
        try {
            const reward = await contract.getUserReward(userAddress);
            console.log(ethers.utils.formatUnits(reward, 18)); // Adjust decimals if necessary
            return reward;
        } catch (error) {
            console.error("Error fetching reward:", error);
        }
    }


    // Example usage
    (async () => {
        // Claim rewards for the connected wallet
        await claimRewards();

        // Fetch reward for the connected wallet
        const reward = await getUserReward(wallet.address);
        console.log("Your reward:", ethers.utils.formatUnits(reward, 18)); // Adjust decimals if necessary
    })();




    return (
        <div>

        </div>
    )
}

export default GameReward;