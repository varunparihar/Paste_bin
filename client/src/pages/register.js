import React, { useState, useEffect } from "react";
import axios from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Register = () => {
    return (
        <div className="auth">
            <RegisterPage />
        </div>
    );
};

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        if(cookies.access_token){
            navigate("/");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/auth/register", {
                name,
                email,
                password,
            });
            if(response.data.status === 100){
                alert("Registration Completed! Now login.");
                navigate("/login");
            }
            else{
                alert(response.data.message);
            }            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Name </label>
                    <input className="form-input" type="text" id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Email </label>
                    <input className="form-input" type="email" id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password </label>
                    <input className="form-input" type="password" id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
            <Link className="link2" to="/login"> Already registered</Link>
        </div>
    );
}