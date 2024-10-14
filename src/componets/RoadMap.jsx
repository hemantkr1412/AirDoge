import React from "react";
import styled from "styled-components";

import './Roadmap.css';  // Import the CSS file

const Roadmap = () => {
  return (
    <>
    <section id="roadmap" className="roadmap-section">
      <div className="roadmap-container">
        <div className="roadmap-title">ROADMAP</div>
        {/* <img src={"/rdmap.svg"} alt="Roadmap" className="roadmap-image" /> */}
        <RoadmapBox />
      </div>
     

    </section>
    {/* <section id="#roadmap" className="roadmap-section-mobile">
       <div className="roadmap-title">ROADMAP</div>
       <RoadmapBox />
       

    </section> */}
    </>
  );
};

export default Roadmap;



// import React from "react";
// import styled from "styled-components";

const RoadmapContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: #f5d3a1; /* You can change the background as needed */
  border-radius: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RoadmapItem = styled.div`
  background-color: #f6eddc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height:200px;
  
  h3 {
    font-family: 'Comic Sans MS', sans-serif;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }

  p {
    font-family: 'Comic Sans MS', sans-serif;
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    height: 200px;
    font-size: 1em;
  }
`;

const RoadmapBox = () => {
  const items = [
    { title: "01", subtitle: "AirDAO Markets Mainnet Launch" },
    { title: "02", subtitle: "AirPAD Mainnet Launch" },
    { title: "03", subtitle: `"I am $ADOGE" NFT Series` },
    { title: "04", subtitle: `"Guess Me" First On-Chain Game` },
    { title: "05", subtitle: "AirDAO Markets Web2 Users Onboarding" },
  ];

  return (
    <RoadmapContainer>
      {items.map((item, index) => (
        <RoadmapItem key={index}>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </RoadmapItem>
      ))}
    </RoadmapContainer>
  );
};

// export default RoadmapBox;
