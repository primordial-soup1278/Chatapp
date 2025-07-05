import { useRef, useEffect} from "react";
import "./style/Login.css";
import { useAuth } from "./AuthContext";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const handleLogin = () => {
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        console.log("Username: ", username, "Password: ", password);
        if(username === "admin" && password === "password") {
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            console.log("successful log in");
        }
    }, [isLoggedIn]);

    return (
        <div className = "background">
            <div className = "login-design-container">
                <span className="login-title-text">
                    <p>
                        PLACEHOLDER TITLE
                    </p>
                </span>
                
            </div>
            <div className="login-container">
                <div className="login-input-container">
                    <p>Login</p>
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                        className = "text-input"
                        ref = {usernameRef}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                        className="text-input"
                        ref = {passwordRef}
                        />
                    </div>
                    <div className = "login-button-container">
                        <button className="login-button" onClick={handleLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>

        </div>
        
    );
}

export default Login;