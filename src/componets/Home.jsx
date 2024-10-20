import Footer from "./Footer";
import Hero from "./Hero";
import Howtobuy from "./HowToBuy";
import Roadmap from "./RoadMap";
import Tokenomics from "./Tokenomics";


const Home = ({ dogeData }) => {
    return (
        <>
            <Hero dogeData={dogeData} />
            <Tokenomics />
            <Howtobuy />
            <Roadmap />
        </>

    )
}

export default Home;