import React from "react";
import "./howtobuy.css"

const Howtobuy = () => {
  return (
    <section id="how_to_buy" className="how-to-buy-section">
      <div className="how-to-buy-wrapper">
        <div className="how-to-buy-title">HOW TO BUY?</div>
        <div className="how-to-buy-grid">
          <div id="how-to-buy-card1" className="how-to-buy-card">
            {/* <img src={"/src/assets/htb1.svg"} alt="Download MetaMask" /> */}
            <div className="how-to-buy-cardSub1">
              <div className="containerHowTo">
                <div className="outer-square"></div>
                <div className="inner-rectangle">
                  <p>1</p>
                </div>
              </div>
            </div>
            <div className="how-to-buy-cardSub2"  >
              <p>
                Download the MetaMask wallet and install it in your browser.
              </p>
            </div>
          </div>
          <div id="how-to-buy-card2" className="how-to-buy-card">
            <div className="how-to-buy-cardSub1">
              <div className="containerHowTo">
                <div className="outer-square"></div>
                <div className="inner-rectangle">
                  <p>2</p>
                </div>
              </div>
            </div>
            <div className="how-to-buy-cardSub2"  >
              <p>
                Change the network from Ethereum to Ambrosus. RPC
                <br />
                used{" "}
                <a href="https://ambrosus.io" target="_blank" className="underline">
                  https://network.ambrosus.io
                </a>
              </p>
            </div>
          </div>
          <div id="how-to-buy-card3" className="how-to-buy-card">
            {/* <img src={"/src/assets/htb3.svg"} alt="Load Wallet with AMB" /> */}
            <div className="how-to-buy-cardSub1">
              <div className="containerHowTo">
                <div className="outer-square"></div>
                <div className="inner-rectangle">
                  <p>3</p>
                </div>
              </div>
            </div>
            <div className="how-to-buy-cardSub2">
              <p>

                Load your wallet with AMB tokens. You can send them to your wallet
                from CEXs or bridge from other chains.
              </p>
            </div>
          </div>
          <div id="how-to-buy-card4" className="how-to-buy-card">
            <div className="how-to-buy-cardSub1">
              <div className="containerHowTo">
                <div className="outer-square"></div>
                <div className="inner-rectangle">
                  <p>4</p>
                </div>
              </div>
            </div>
            <div className="how-to-buy-cardSub2">
              <p style={{

              }}>
                1. Visit Astra DEX.  <a href="https://star-fleet.io/astra/swap" target="_blank" className="underline">
                  https://star-fleet.io/astra/swap
                </a>
              </p>
              <p style={{
                marginTop: "5px"
              }}>
                2. Paste the AirDoge contract address: 0x50c32756E5214443435FD391323f2923C1564153 to display the AirDoge token.
              </p>
              {/* <p style={{
                marginTop: "5px"
              }}>
                3. Go to Settings, enable Expert Mode, and set slippage to 7%.
              </p> */}
              <p style={{
                marginTop: "5px"
              }}>
                3.Click Swap
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howtobuy;