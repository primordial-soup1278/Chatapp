import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom"; 
import "./style/HomeContent.css";


const HomeContent = () => {
    const {setIsLoggedIn, setUser} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
    }
    return (
        <div className="homeContent-container">
            <div className="title-bar">
                <h1 className="Title-text">Activity</h1>
                <div className="profile-buttons">
                    <button 
                    id = "logout"
                    onClick={handleLogout}>
                        LOGOUT
                    </button>
                    <button id = "notifications">🔔</button>                
                </div>
            </div>
        </div>
    );
}

export default HomeContent