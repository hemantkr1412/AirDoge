import { useEffect, useState } from 'react'
import './App.css';
import Navbar from './componets/Navbar';
import Footer from './componets/Footer';
import GoogleTagManager from '../googleAnalytics';
import Home from './componets/Home';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NFT from './componets/NFT/NFT';
import { ThirdwebProvider } from "thirdweb/react";
import ViewNFT from './componets/NFT/ViewNFT';
import AccountProvider from './context/AccountContext';
import Game from './componets/Game/Game';
import FundRaiser from './componets/FundRaiser/FundRaiser';
import GameReward from './componets/Game/GameReward';

function App() {




  const [dogeData, setDogeData] = useState(
    {
      price_in_usdt: "Loading..",
      current_supply: "Loading..",
      market_cap: "Loading.."
    }
  ); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + ' M'; // Convert to million
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + ' K'; // Convert to thousand
    } else {
      return num.toFixed(2); // Keep as it is if smaller
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchDogeData = async () => {
      try {
        const response = await fetch('https://airdaomarkets.xyz/api/v1/event/fetch-doge-data/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Format the numbers

        data.current_supply = formatNumber(data.current_supply);
        data.market_cap = formatNumber(data.market_cap);

        setDogeData(data); // Save formatted data to state
      } catch (err) {
        setError(err.message); // Set error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false once request is done
      }
    };

    fetchDogeData(); // Call the fetch function
  }, []);


  return (
    <ThirdwebProvider>
      <AccountProvider>
        <div>
          <GoogleTagManager />
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <Home dogeData={dogeData} />
                }
              />
              <Route
                path="/nft"
                element={
                  <NFT />
                }
              />
              <Route
                path="/nftview"
                element={
                  <ViewNFT />
                }
              />
              <Route
                path="/nftgame"
                element={
                  <Game />
                }
              />
              <Route
                path="/nftgamereward"
                element={
                  <GameReward />
                }
              />
              {/* <Route
                path="/fundraiser"
                element={
                  <FundRaiser />
                }
              /> */}
            </Routes>

            <Footer />
          </Router>
        </div>
      </AccountProvider>
    </ThirdwebProvider>
  )
}

export default App;


