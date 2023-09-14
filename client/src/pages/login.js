import React, { useState, useEffect } from "react";
import axios from "../config/config";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div className="auth">
            <LoginPage />
        </div>
    );
};

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.access_token){
            navigate("/");
        }
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });
            if(response.data.token){
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/");
            }
            else{
                alert(response.data.message);
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email </label>
                    <input className="form-input" type="text" id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password </label>
                    <input className="form-input" type="password" id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link className="link2" to="/register"> Not yet registered</Link>
        </div>
    );
}