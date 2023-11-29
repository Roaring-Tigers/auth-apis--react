import React,{useState} from "react";
import axios from  "axios";


const Dashboard = ({token}) => {
    const [joke, setJoke] = useState("")



    function getJoke(){
        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
             console.log("hello joke")
            setJoke(res.data.data.message)})
        .catch(err => console.log(err))
    }

    function logout(){
          axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
            headers:{
                authorization: `Bearer ${token}`  
          }})
            .then(res => alert("Logout successfully done"))
            .catch(err => console.log(err))
    }



    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={getJoke}>Get Joke</button>
            {joke && <h2>{joke}</h2>}
            <button onClick={logout}> Logout </button>
        </div>
    );
}

export default Dashboard;