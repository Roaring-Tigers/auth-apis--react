import React,{useState,useContext, useEffect} from "react";
import axios from  "axios";
import UserContext from "../Context/UserContext";

import {useNavigate} from "react-router-dom";


const Dashboard = () => {
    const [joke, setJoke] = useState("")
    const [name, setName] = useState("")
    const {token,setToken} = useContext(UserContext)
    const navigate = useNavigate();


    useEffect(()=>{
        if(!token){
            let newToken = localStorage.getItem("token")
            if(!newToken){
                navigate("/login")
            }
            else{
                setToken(newToken)
            }
        }
    },[])

    useEffect(()=>{
        getJoke()
    },[token])

    function getJoke(){
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
             console.log("hello joke")
            setJoke(res.data.data.message)
            setName(res.data.data.user.name)
        })
        .catch(err => console.log(err))
    }

    function logout(){
          axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
            headers:{
                authorization: `Bearer ${token}`  
          }})
            .then(res => {
                localStorage.removeItem("token")
                setToken("")
                setName("")
                setJoke("")
                alert("Logout successfully done")
                navigate("/login")
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <h1>Welcome {name}</h1>
            
            {joke && <p>{joke}</p>}
            <button onClick={logout}> Logout </button>
        </div>
    );
}

export default Dashboard;