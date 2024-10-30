import React, { useState } from "react";
import './Tokenomics.css'; // Import your CSS file
import { FaCopy } from 'react-icons/fa';

const Tokenomics = () => {
  const address = '0x50c32756E5214443435FD391323f2923C1564153';

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(address)
  //     .then(() => {
  //       alert('Address copied to clipboard!');
  //     })
  //     .catch(err => {
  //       console.error('Failed to copy: ', err);
  //     });
  // };
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
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
    <section id='tokenomics'>
      <div id='TP1'>
        {/* Left Side */}
        <div id='TP1C1'>
          <div className="tokenomics-title">TOKENOMICS</div>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div className='cardContainer'>
              <div className='tokenomics-card'>
                <div className='tokenomics-card-inner'>
                  <div className='tokenomics-card-content'>
                    <div className="tokenomics-card-header">SUPPLY</div>
                    <div className="tokenomics-card-value">100 M</div>
                  </div>
                </div>
              </div>
              <div className='tokenomics-card'>
                <div className='tokenomics-card-inner'>
                  <div className='tokenomics-card-content'>
                    <div className="tokenomics-card-header">Taxes</div>
                    <div className="tokenomics-card-value">0/0</div>
                  </div>
                </div>
              </div>
              {/* <div className='tokenomics-card'>
                <div className='tokenomics-card-inner'>
                  <div className='tokenomics-card-content'>
                    <div className="tokenomics-card-header">LIQUIDITY</div>
                    <div className="tokenomics-card-value">Nil</div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="tokenMobileImg">
              <img src={"/token1.svg"} alt='Tokenomics' />
            </div>
          </div>

          <div className='tokenomics-ca'>
            <div className='tokenomics-ca-inner'>
              <div className='tokenomics-ca-text'>
                <div className="tokenomics-ca-prefix">CA-</div>
                <div className="tokenomics-ca-address">
                  0x50c32756E5214443435FD391323f2923C1564153
                </div>
                <div className="tokenomics-ca-copy-icon" onClick={copyToClipboard} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                  <FaCopy /> {/* Add the copy icon here */}
                </div>
                {copySuccess && (
                  <div className="copy-notification" style={{ color: 'green', marginTop: '10px', fontFamily: "1rem", fontWeight: "700" }}>
                    {copySuccess}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div
          className="imageContainer">
          <img src={"/token1.svg"} alt='Tokenomics' />
        </div>

      </div>
    </section>
  );
};

export default Tokenomics;
