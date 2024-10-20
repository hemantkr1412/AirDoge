import React from 'react';
import './Nft.css';

const NFTCard = () => {
    return (
        <div className="nft-card">
            <img
                src="https://c.animaapp.com/MIx9ki2W/img/logo-1-1@2x.png"
                alt="NFT"
                className="nft-image"
            />
        </div>
    );
};

const ViewNFT = () => {
    return (
        <div className="nft">
            <h1 className="title2">My NFT Collection</h1>
            <div className="nft-grid">
                <NFTCard />
            </div>
        </div>
    );
};

export default ViewNFT;
