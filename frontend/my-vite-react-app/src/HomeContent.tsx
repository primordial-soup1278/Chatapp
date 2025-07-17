
import "./style/HomeContent.css";

const HomeContent = () => {

    return (
        <div className="homeContent-container">
            <div className="title-bar">
                <h1 className="Title-text">Activity</h1>
                <div className="profile-buttons">
                    <button id = "logout">LOGOUT</button>
                    <button id = "notifications">🔔</button>                
                </div>
            </div>
        </div>
    );
}

export default HomeContent