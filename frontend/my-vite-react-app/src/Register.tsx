import "./style/Login.css";
import { useRef } from "react";
type RegisterProps = {
    registerScreen: boolean;
    setRegisterScreen : React.Dispatch<React.SetStateAction<boolean>>;
};
const Register: React.FC<RegisterProps> = ({registerScreen, setRegisterScreen}) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const handleSubmit = () => {
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        const passwordConfirm = passwordConfirmRef.current?.value.trim() || "";
        if (username && password && password === passwordConfirm) {
            // insert user into database
            setRegisterScreen(false);
        }
    }
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
    </div>
    );
}

export default Register;