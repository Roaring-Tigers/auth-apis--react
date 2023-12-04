import React, { useState,useContext } from 'react';
import axios from 'axios';
import UserContext from "../Context/UserContext";

import {useNavigate} from "react-router-dom";



const Login = () => {
    const [user, setUser] = useState({ email: '', password: ''});
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const {setToken} = useContext(UserContext)

     const { email, password} = user;

    console.log(user)

    function updateUser(e){
        //  console.log(e.target.name)
         setUser({...user, [e.target.name]: e.target.value})
    }

    function implementLogin(e){
        e.preventDefault()
        axios.post("https://instagram-express-app.vercel.app/api/auth/login", {
            email,
            password,
        })
        .then(res => {
            console.log(res.data.data.token)
            localStorage.setItem("token", res.data.data.token)
            setToken(res.data.data.token)
            alert("Login successfully done")
            navigate("/dashboard")
        })
        .catch(err => setError(err.response.data.message))
    }



    return (
        <div>
            <h1>Login</h1>
            {error && <span>{error}</span>}
            <form onSubmit={implementLogin}>
                
                <input type="email" name="email" placeholder="Email" 
                  onChange={updateUser}
                />
                <br />
                <input type="password" name="password" placeholder="Password" 
                  onChange={updateUser}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;