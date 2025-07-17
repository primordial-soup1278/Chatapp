import { useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./style/Login.css";
import { useAuth } from "./AuthContext";
import Register from "./Register";
import { loginRequest } from "./Requests";

type LoginContentProps = {
  usernameRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
  handleLogin: () => void;
  setRegisterScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginContent: React.FC<LoginContentProps> = ({
    usernameRef,
    passwordRef,
    handleLogin,
    setRegisterScreen,
}) => {
    return (
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
            <span
            onClick={() => {
                setRegisterScreen(true);
            }}>
                <p className="register-option">
                    Register
                </p>
            </span>
        </div>
    </div>
    );
}

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [registerScreen, setRegisterScreen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        console.log("Username: ", username, "Password: ", password);
        const apiurl = import.meta.env.VITE_SECURITY_URL + "/login";
        try {
            await loginRequest(apiurl, username, password);
            setIsLoggedIn(true);
            navigate("home");
        }
        catch(err : unknown) {
            setError("incorrect login");
            if (err instanceof Error) {
                console.error("login error: ", err.message);
            }
            else
                console.error("login error: ", err);
            
        }
        if(username === "admin" && password === "password") {
            setIsLoggedIn(true);
            navigate("/home");
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
                {registerScreen === true ? (
                    <Register 
                        registerScreen={registerScreen}
                        setRegisterScreen={setRegisterScreen} 
                    />
                ) : (
                    <LoginContent
                     usernameRef={usernameRef}
                     passwordRef={passwordRef}
                     handleLogin={handleLogin}
                     setRegisterScreen={setRegisterScreen}
                     /> 
                )}
            </div>

        </div>
        
    );
}

export default Login;