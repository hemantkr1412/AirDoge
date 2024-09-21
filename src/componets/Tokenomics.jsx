import React from "react";
import './Tokenomics.css'; // Import your CSS file

const Tokenomics = () => {
  return (
    <section id='tokenomics'>
      <div id='TP1'>
        {/* Left Side */}
        <div id='TP1C1'>
          <div className="tokenomics-title">TOKENOMICS</div>
          <div style={{
            display:"flex",
            justifyContent:"space-between"
          }}>
          <div className='cardContainer'>
            <div className='tokenomics-card'>
              <div className='tokenomics-card-inner'>
                <div className='tokenomics-card-content'>
                  <div className="tokenomics-card-header">SUPPLY</div>
                  <div className="tokenomics-card-value">1B</div>
                </div>
              </div>
            </div>
            <div className='tokenomics-card'>
              <div className='tokenomics-card-inner'>
                <div className='tokenomics-card-content'>
                  <div className="tokenomics-card-header">Taxes</div>
                  <div className="tokenomics-card-value">5/5</div>
                </div>
              </div>
            </div>
            <div className='tokenomics-card'>
              <div className='tokenomics-card-inner'>
                <div className='tokenomics-card-content'>
                  <div className="tokenomics-card-header">LIQUIDITY</div>
                  <div className="tokenomics-card-value">Burned</div>
                </div>
              </div>
            </div>
          </div>
            <div className="tokenMobileImg">
                  <img src={"/src/assets/token1.svg"} alt='Tokenomics' />
            </div>
          </div>

          <div className='tokenomics-ca'>
            <div className='tokenomics-ca-inner'>
              <div className='tokenomics-ca-text'>
                <div className="tokenomics-ca-prefix">CA-</div>
                <div className="tokenomics-ca-address">
                  0X17111XXXXXXXXXXXXXXXXXXXXXX
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div
        className="imageContainer">
            <img src={"/src/assets/token1.svg"} alt='Tokenomics' />
        </div>
        
      </div>
    </section>
  );
};

export default Tokenomics;
