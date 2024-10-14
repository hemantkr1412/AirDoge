

import { useState } from "react";
// import { useNavigate } from "react-router-dom";



const Accordian = ({ heading, text, index,setToggle,isToggled}) => {
	const [isActive, setIsActive] = useState(false);

    // const navigate = useNavigate();
	

	const projects = [
		{
			name:"AirDao Markets",
			href: `https://airdaomarkets.xyz`,
            img:"AMIcon.svg"
		},
		{
			name:"AirPad ",
			href: ``,
            img:"airPad.svg"
		},
		{
			name:"Gamming",
			href: ``,
            img:""
		},
		{
			name:"Forest",
			href: ``,
            img:""
		}
	]

   
	



	


	return (
		<div key={index}>
			<div
                className="accordianHeading menu-link"
				onClick={() => setIsActive((prev) => !prev)}
				style={{
					padding: "0.6rem",
					display: "flex",
					// justifyContent: "space-between",
					alignItems: "center",
					cursor: "pointer",
                    marginLeft: "2.5rem",
                    gap:"10px"

				}}>

				Products
				<span
					style={{
						transform: isActive ? "rotate(180deg)" : "none",
						transition: "all 0.3s",
					}}>
					{"▼"}
				</span>
			</div>

				<div className={isActive ? "customDiv" : ""}>
				
				
				{
					projects.map((link)=>{
						return(
							<div
							key={link.name}
                            className="accordianHeading"
							style={{
								padding: isActive ? "1rem 1rem" : "0em 2rem",
								backgroundColor: "#e8e8e8",
								maxHeight: isActive ? "15em" : "0em",
								fontSize: "0.875rem",
								lineHeight: "1",
								overflow: "hidden",
								transition: "all 0.3s",
                                borderBottom:isActive ?"1px solid rgba(0,0,0,0.5)":"",
                                cursor:"pointer",
                                display:"flex",
                                gap:"10px"
							}}>
                                {
                                    link.img ?
                                    <img style={{
                                        width:"20px",
                                        height:"20px"
                                    }} src={link.img} alt="Icon" />
                                    :
                                    <div style={{
                                        width:"20px",
                                        height:"20px",
                                        backgroundColor:"purple",
                                        borderRadius:"100%"
                                    }}>
                                    </div>
                                }
                              
							<p 
                            style={{
                                fontSize:"1rem"
                            }}
                            onClick={() =>{
                                // navigate(link.href)
                                if(link.href){
                                    window.open(link.href)
                                }
                               
                                setToggle(!isToggled)

                            }}
                            >
                                {link.name}
                            </p>
                            
							</div>
						)
					})
				}
               
				
				

				</div>
		</div>
	);
};
export default Accordian;