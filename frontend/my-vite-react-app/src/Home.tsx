import "./style/Home.css";
import Sidebar from "./Sidebar";
import HomeContent from "./HomeContent";

const Home = () => {
  

   
    return (
        <div className="home-container">
            <Sidebar />
            <HomeContent />
        </div>
    );
}

export default Home;