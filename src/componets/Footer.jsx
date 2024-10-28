import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <img src={"/footerlogo.svg"} alt="" />
        </div>
        <div className="footer-right">
          <img onClick={() => {
            window.open("https://x.com/AirDogeBarks")
          }} className="frame" alt="Frame" src="Xicon.svg" />
          <img onClick={() => {
            window.open("https://t.me/+eOkt0nyuxWthYjE9")
          }} className="frame" alt="Frame" src="TeliIcon.svg" />
          {/* <div className="buy-container2">
            <div className="buy-content2">
              <div className="buy-text2">Buy $ADOGE</div>
            </div>
          </div> */}
        </div>
      </div>
      <div>
        <p className="disclaimer">
          Disclaimer :$ADG is a meme token made for fun
        </p>
        <p className="copyRight">&copy; <span id="year">2024</span> AirDoge. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
