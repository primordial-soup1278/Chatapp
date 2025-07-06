import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./style/Home.css";
import Sidebar from "./Sidebar";
import HomeContent from "./HomeContent";

const Home = () => {
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/");
    }
    return (
        <div className="home-container">
            <Sidebar />
            <HomeContent />
        </div>
    );
}

export default Home;