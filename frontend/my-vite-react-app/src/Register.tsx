import "./style/Login.css";
import { useRef, useState } from "react";
import { registerUser } from "./Requests";
type RegisterProps = {
    registerScreen: boolean;
    setRegisterScreen : React.Dispatch<React.SetStateAction<boolean>>;
};
const Register: React.FC<RegisterProps> = ({registerScreen, setRegisterScreen}) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async () => {
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        const passwordConfirm = passwordConfirmRef.current?.value.trim() || "";
        if (username && password && password === passwordConfirm) {
            // insert user into database
            const apiurl = import.meta.env.VITE_USER_URL + "/register";
            console.log("API URL: ", apiurl);
            try {
                await registerUser(apiurl, username, password);
                setRegisterScreen(false);   
            }
            catch (err : unknown) {
                setError("Registration failed: Please try again.");
                if (err instanceof Error) {
                    console.error("Registration error: ", err.message);
                }
                else 
                    console.error("Registration error:", err);
            }
        }
        else {
            setError("Please fill all fields and make sure passwords match.");
        }
    };

    return (
    <div className="register-input-container">
        <p>Register</p>
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
        <div className="input-group">
            <label>confirm password</label>
            <input 
            className="text-input"
            ref = {passwordConfirmRef}
            />
        </div>
        <div className = "login-button-container">
            <button className="login-button" onClick={handleSubmit}>
                Register
            </button>
        </div>
        {error && <div className="error-message">{error}</div>}
    </div>
    );
}

export default Register;