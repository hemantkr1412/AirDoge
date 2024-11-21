import { useContext } from 'react';
import './game.css'
import { AccountContext } from '../../context/AccountContext';
import { useState } from 'react';
import Lottie from "lottie-react";
import animationData from "./Animation.json";
import { useEffect } from 'react';
import { NFTLoading } from "../NFT/NFT";
const Game = () => {
    const [gameId, setGameId] = useState();
    const [guessNumber, setGuessNumber] = useState();
    const [attemp, setAttemp] = useState(0);
    const [accountId, setAccountId] = useState();
    const [attepNumberList, setAttempNumberList] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(true);
    const [remaintime, setRemainTime] = useState("");

    const { account, provider, signer, chainId } = useContext(AccountContext);


    // const localurl = "http://127.0.0.1:8000"
    const localurl = "https://airdaomarkets.xyz"
    const serverurl = "https://airdaomarkets.xyz"

    useEffect(() => {
        if (message === "congratulations") {
            const timer = setTimeout(() => setShowAnimation(false), 5000); // 2 seconds
            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }

    }, [message, gameId]);

    const handleGetStarted = async () => {
        try {

            setMessage('');
            setAttempNumberList([])
            setAttemp(0)

            // Step 1: Send POST request to /account/ to get account_id

            const accountResponse = await fetch(`${localurl}/api/v1/user/account/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account: account }) // replace with actual account details
            });

            if (!accountResponse.ok) {
                console.error("Error fetching account:", accountResponse.statusText);
                return;
            }

            const accountData = await accountResponse.json();
            console.log(accountData)
            const accountId = accountData.id; // Assuming account_id is returned here
            setAccountId(accountId)

            // Step 2: Send POST request to /game/start-game/ with the account_id
            const gameResponse = await fetch(`${localurl}/api/v1/game/start-game/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ account_id: accountId })
            });

            if (!gameResponse.ok) {
                console.error("Error starting game:", gameResponse.statusText);
                setMessage("error")
                return;
            }

            const gameData = await gameResponse.json();
            console.log(gameData);
            if (gameData?.time_remaining) {
                setRemainTime(gameData.time_remaining)
            }
            setGameId(gameData.game_id) // Handle or display game data as needed

        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    const handleGuess = async () => {
        try {
            setLoading(true)
            const accountResponse = await fetch(`${localurl}/api/v1/game/guess/${gameId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    account_id: accountId, guess: guessNumber
                }) // replace with actual account details
            });

            if (!accountResponse.ok) {
                console.error("Error fetching account:", accountResponse.statusText);
                return;
            }

            const accountData = await accountResponse.json();
            console.log(accountData)

            const resMessage = accountData.message.trim()
            console.log(resMessage)
            // console.log(resMessage.includes("low"))
            if (resMessage.includes("low")) {
                console.log("Low")
                setMessage("low")
            } else if (resMessage.includes("high")) {
                setMessage("high")
            } else if (resMessage.includes("Congratulations")) {
                setMessage("congratulations")
            } else if (resMessage.includes("error")) {
                setMessage("error")
            }
            setAttempNumberList(
                [
                    ...attepNumberList,
                    {
                        number: guessNumber,
                        bgcolor: resMessage.includes("Congratulations") ? "green" : (
                            resMessage.includes("high") ? "yellow" : "red"
                        ),
                        color: resMessage.includes("high") ? "black" : "white"
                    }
                ]
            )
            setAttemp(attemp + 1)
            setGuessNumber("");
            setLoading(false)



            // Assuming account_id is returned here
        } catch (error) {

        }
    }

    const formatTime = (time) => {
        const [hours, minutes, seconds] = time.split(":");
        return `${hours}:${minutes}:${seconds.split(".")[0]}`;
    };



    return (
        <div className="game">
            {
                !account ? <>
                    <h1 className="title2">Guess My Number</h1>
                    <div className="nft-grid">
                        <NFTLoading account={account} />
                    </div>
                </> : <>
                    <h1 className="title2">Guess My Number</h1>
                    <p>Guess a random number</p>
                    <p>1 to 100</p>
                    {
                        remaintime && <p style={{
                            color: "red",
                            fontSize: "1.1rem"
                        }}>Your daily limit reached !! Please again Try after {formatTime(remaintime)}  hours.</p>
                    }
                    {message === "error" && <p style={{
                        color: "red"
                    }}>Something went Wrong !</p>}
                    <div>
                        {
                            gameId ?
                                <div style={{
                                    marginTop: "1rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "2rem"
                                }}>
                                    {
                                        (attepNumberList.length === 6 && message !== "congratulations") && <p style={{
                                            color: "red"
                                        }}>ohhoo ! You lost Please Try Again</p>
                                    }
                                    {
                                        message === "low" && <p style={{
                                            color: "red"
                                        }}>Your Number is less than Random Number</p>
                                    }
                                    {
                                        message === "high" && <p style={{
                                            color: "yellow"
                                        }}>Your Number is Greater than Random Number</p>
                                    }
                                    {
                                        message === "congratulations" && <p style={{
                                            color: "green"
                                        }}> Congratulations !! You won $ADG Rewards </p>
                                    }
                                    <GameGrid
                                        attemp={attemp}
                                        guessNumber={guessNumber}
                                        setGuessNumber={setGuessNumber}
                                        attepNumberList={attepNumberList}
                                        setAttempNumberList={setAttempNumberList}
                                        message={message}
                                        setMessage={setMessage}
                                    />
                                    {
                                        message === "congratulations" && showAnimation &&
                                        <Lottie
                                            animationData={animationData}
                                            loop={true}
                                            style={{
                                                width: "100%",
                                                height: 500,
                                                position: 'absolute',
                                                top: '30%',  /* Adjust top margin as needed */
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                zIndex: 10
                                            }}
                                        />
                                    }

                                    <button className='guess-btn' onClick={() => {
                                        if (attepNumberList.length === 6) {
                                            setGameId('')
                                            handleGetStarted()
                                        }
                                        else if (message === "congratulations") {
                                            setGameId("")
                                            handleGetStarted()
                                        } else {
                                            handleGuess()
                                        }
                                    }
                                    } >{
                                            loading ? "Please wait ..." : (
                                                message === "congratulations" ? "Try Again!" : attepNumberList.length === 6 ? "Try Again" : "Guess"
                                            )
                                        }</button>
                                </div> :
                                <button className='get-btn' onClick={handleGetStarted}>{
                                    remaintime ? "Refresh" : "Get Started"
                                }</button>
                        }

                    </div>
                </>
            }
            <div className="nft-grid">
                <div style={{
                    marginTop: "2rem",
                    width: "400px",
                    height: "400px",
                    textAlign: "left",
                    // border: "1px solid white",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "left",
                    // flexDirection: "column",
                    color: "white"
                }}>
                    <h1 style={{
                        fontSize: "1.3rem"
                    }}>Game Rule</h1>
                    <div style={{
                        // position: "absolute"
                    }}>
                        <p>
                            1. Enter the range of numbers you want the target number to be between, and press New Target <br />
                            2. Enter your guess<br />
                            3. See if your guess is too high or too low<br />
                            4. Change your guess<br />
                            5. Only 25 attempts per day <br />
                            6. If NFT holders win they are rewarded with 20 $ADG tokens.<br />
                            7. If non-NFT holders win they are rewarded with 5 $ADG tokens.<br />



                        </p>
                    </div>

                </div>
            </div>




        </div>
    )
}

export default Game;



function GameGrid({ attemp, guessNumber, setGuessNumber, attepNumberList, setAttempNumberList, message, setMessage }) {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
            gridTemplateRows: "repeat(3, 1fr)", // 3 equal rows
            width: "300px",
            height: "200px"
        }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <GridItem
                    attemp={attemp}
                    index={index}
                    key={index}
                    guessNumber={guessNumber}
                    setGuessNumber={setGuessNumber}
                    attepNumberList={attepNumberList}
                    setAttempNumberList={setAttempNumberList}
                    message={message}
                />
            ))}
        </div>
    );
}




function GridItem({ attemp, index, guessNumber, setGuessNumber, attepNumberList, setAttempNumberList, message }) {
    return (
        <div style={{
            height: "100px",
            width: "100px",
            backgroundColor: "#03011F",
            border: "1px solid white"
        }}>
            {
                attepNumberList[index] &&
                <div style={{
                    margin: "auto",
                    marginTop: "3.5px",
                    width: "90px",
                    height: "90px",
                    backgroundColor: attepNumberList[index].bgcolor,
                    borderRadius: "50%",
                    padding: "1rem",
                    paddingTop: "1.2rem",
                    boxShadow: "2px 2px 8px white",
                    color: attepNumberList[index].color,
                    fontSize: "2rem"
                }}>{attepNumberList[index].number}</div>
            }
            {
                message !== "congratulations" && attemp === index &&
                <input style={{
                    marginTop: "4px",
                    height: "90px",
                    width: "90px",
                    backgroundColor: "white",
                    color: "#03011F",
                    padding: "0.5rem",
                    fontSize: "1.5rem"
                }} type='number'
                    value={guessNumber}
                    onChange={(e) => {
                        setGuessNumber(e.target.value);

                    }}
                />
            }

        </div>
    );
}


