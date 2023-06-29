import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import TokenManager from "../redux/AuthAPIs/TokenManager";
import AuthAPI from "../redux/AuthAPIs/AuthAPI";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleLogin = async (email, password) => {
        try {
            await AuthAPI.login(email, password);
            await delay(1000);
            navigate("/ReportLibrary");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Login failed!");
            window.location.reload();
        }
    }

    // Function to get user object from backend that can be used in every page
    // const getUserDetails = () => {
    //     const claims = TokenManager.getClaims();

    //     if (claims?.userId) {
    //         UserAPI.getUser(claims.userId)
    //         .then(user => setUserDetails(user))
    //         .catch(error => console.error(error));
    //     }
    // }

    return (
        <div>
            {TokenManager.getClaims() ? (
                <div>
                    <p>Login Successfull.</p>
                </div>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    )
}
export default LoginPage;