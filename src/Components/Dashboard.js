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



    return (
        <div>
            <h1>Dashboard</h1>
            <button>Get Joke</button>
            {joke && <h2>{joke}</h2>}
        </div>
    );
}

export default Dashboard;