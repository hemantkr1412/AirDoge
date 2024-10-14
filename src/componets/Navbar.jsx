import React, {useState} from "react";
import "./Navbar.css"
import Accordian from "./Accordian";
// import BuyDoge from "./Buydoge";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDown,setIsDropDown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (

    <div className='navbar'>
      {/* Logo and Heading */}
      <div class="logo-container">
        <img
            class="logo"
            alt="Logo"
            src="https://c.animaapp.com/MIx9ki2W/img/logo-1-1@2x.png"
        />
        <div class="heading">
            AirDoge
        </div>
        </div>


      {/* <div className='flex items-center gap-2 relative flex-[0_0_auto]'>
        <img
          className='relative w-[84px] h-[84px] mt-[-8.00px] mb-[-16.00px] ml-[-10.00px] object-cover'
          alt='Logo'
          src='https://c.animaapp.com/MIx9ki2W/img/logo-1-1@2x.png'
        />
        <div className="heading_24 overflow-hidden rounded-bl-sm rounded-br-sm [-webkit-text-stroke:2px_#1f1f67] text-[#f7aa49] text-center font-['Peralta'] text-[1.75rem] leading-[112%]">
          AirDoge
        </div>
      </div> */}

      {/* Desktop Menu links */}
      {/* <div className='hidden lg:flex flex-col w-[750px] h-[70px] items-center justify-center gap-2.5 px-12 py-[18px] bg-[#d4d4d433] rounded-[200px] border-[3px] border-solid border-black shadow-[5px_8px_4px_#000000] backdrop-blur-2xl'>
        <div className='inline-flex h-[34.7px] items-center justify-center gap-12 relative'>
          <a
            className="relative w-fit [font-family:'Bubblegum_Sans',Helvetica] font-normal text-black text-[28px] text-center tracking-[0] leading-[31.4px]"
            href='#'>
            Home
          </a>
          <a
            className="relative w-fit [font-family:'Bubblegum_Sans',Helvetica] font-normal text-black text-[28px] text-center tracking-[0] leading-[31.4px]"
            href='#tokenomics'>
            Tokenomics
          </a>
          <a
            className="relative flex w-fit [font-family:'Bubblegum_Sans',Helvetica] font-normal  text-black lg:text-[28px]  tracking-[0] leading-[28px]"
            href='#how_to_buy'>
            How to 
            buy?
          </a>
          <a
            className="relative w-fit [font-family:'Bubblegum_Sans',Helvetica] font-normal text-black text-[28px] text-center tracking-[0] leading-[31.4px]"
            href='#roadmap'>
            Roadmap
          </a>
        </div>
      </div> */}
      {/* <div class="menu-container">
        <div class="menu-links">
            <a class="menu-link" href='#'>Home</a>
            <a class="menu-link" href='#tokenomics'>Tokenomics</a>
            <a class="menu-link" href='#how_to_buy'>How to buy?</a>
            <div class="dropdown" href='#how_to_buy'>Products</div>
            <a class="menu-link" href='#roadmap'>Roadmap</a>
        </div>
      </div>

      <div className="dropdown-content ">

      </div> */}

      <div className="menu-container">
          <div className="menu-links">
              <a className="menu-link" href='#'>Home</a>
              <a className="menu-link" href='#tokenomics'>Tokenomics</a>
              <a className="menu-link" href='#how_to_buy'>How to buy?</a>

              {/* Dropdown menu */}
              {/* <div className="dropdown">
                  <button className="dropbtn menu-link">Products</button>
                  <div className="dropdown-content">
                      <a href="#">Product 1</a>
                      <a href="#">Product 2</a>
                      <a href="#">Product 3</a>
                  </div>
              </div> */}

              <a className="menu-link"
              style={{
                cursor:"pointer"
              }}
              onMouseEnter={() => setIsDropDown(true)} // Show dropdown on hover
              onMouseLeave={() => setIsDropDown(false)} // Hide dropdown when not hovering
              >Products</a>

              <a className="menu-link" href='#roadmap'>Roadmap</a>
          </div>
      </div>
      {
        isDropDown &&
        <div  onMouseEnter={() => setIsDropDown(true)} 
        onMouseLeave={() => setIsDropDown(false)}
        className="dropdown-content">
          <div className="dropdown-row">
            <div className="dropdown-column">
              <img src="airPad.svg" alt="airpad icon" />
              <div className="dropdown-heading">
                <div>
                Air Pad 
                </div>
                <div className="dropdwon-subheading">
                Token Sale launch platform
                </div>
              </div>
            </div>
            <div className="dropdown-column">
            <div style={{
                width:"68px",
                height:"68px",
                backgroundColor:"rgba(255, 188, 109, 1)",
                borderRadius:"100%"
              }}>
              </div>
              <div className="dropdown-heading">
                <div>
                Gaming
                </div>
                <div className="dropdwon-subheading">
                On-chain mini games
                </div>
              </div>
            </div>

          </div>
          <div className="dropdown-row">
          <div className="dropdown-column" onClick={() =>{
            window.open("https://airdaomarkets.xyz")
          }} style={{
            cursor:"pointer"
          }}>
              <img src="AMIcon.svg" alt="airpad icon" />
              <div className="dropdown-heading">
                <div>
                AirDao Markets
                </div>
                <div className="dropdwon-subheading">
                Prediction marketplace for web3 and web2 users
                </div>
              </div>
            </div>
            <div className="dropdown-column">
              <div style={{
                width:"68px",
                height:"68px",
                backgroundColor:"rgba(214, 117, 250, 1)",
                borderRadius:"100%"
              }}>
              </div>
              <div className="dropdown-heading">
                <div>
                NFT
                </div>
                <div className="dropdwon-subheading">
                $ADOGE Utility NFTs
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      


      {/* Hamburger Menu button for mobile/tablet */}
      {/* <div className='lg:hidden flex items-center'>
        <button
          className='text-black focus:outline-none'
          onClick={toggleMenu}>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
      </div> */}

        <div className="menu-button">
        <button className="toggle-button" onClick={toggleMenu}>
           {!isMenuOpen ? <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
           }


        </button>
        </div>




      {/* Dropdown Menu for mobile/tablet */}
      {/* {isMenuOpen && (
        <div className='absolute top-full left-0 w-full bg-white lg:hidden flex flex-col items-center py-4 z-40'>
          <a
            className='py-2 px-4 text-black text-[20px] font-semibold'
            href='#'>
            Home
          </a>
          <a
            className='py-2 px-4 text-black text-[20px] font-semibold'
            href='#tokenomics'>
            Tokenomics
          </a>
          <a
            className='py-2 px-4 text-black text-[20px] font-semibold'
            href='#how_to_buy'>
            How to buy?
          </a>
          <a
            className='py-2 px-4 text-black text-[20px] font-semibold'
            href='#roadmap'>
            Roadmap
          </a>
        </div>
      )} */}

        {isMenuOpen && (
        <div className="menu">
            <a className="menu-link" href="#" onClick={toggleMenu}>
            Home
            </a>
            <a className="menu-link" href="#tokenomics" onClick={toggleMenu}>
            Tokenomics
            </a>
            <a className="menu-link" href="#how_to_buy" onClick={toggleMenu}>
            How to buy?
            </a>
            <Accordian
            heading={"Projects"}
            
             />
            <a className="menu-link" href="#roadmap" onClick={toggleMenu}>
            Roadmap
            </a>
        </div>
        )}


      {/* BuyDoge Button */}
      <div class="buy-container">
        <div onClick={() =>{
            window.open("https://star-fleet.io/astra/swap")
        }} class="buy-text">
            Buy $ADOGE
        </div>
        </div>

    </div>
    
  );
};

export default Navbar;
