import React, { useState } from 'react';
import axios from 'axios';



const Signup = ({setToken}) => {
    const [user, setUser] = useState({name: '', email: '', password: '', confirmPassword: ''});
     const {name, email, password, confirmPassword} = user;
    console.log(user)

    function updateUser(e){
        //  console.log(e.target.name)
         setUser({...user, [e.target.name]: e.target.value})
    }

    function implementSignup(e){
        e.preventDefault()
        axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {
            name,
            email,
            password,
        })
        .then(res => {
            console.log(res.data.data.token)
            setToken(res.data.data.token)
            alert("User created successfully")
        })
        .catch(err => console.log(err))
    }



    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={implementSignup}>
                <input type="text" name="name" placeholder="Name" 
                  onChange={updateUser}
                />
                <br />
                <input type="email" name="email" placeholder="Email" 
                  onChange={updateUser}
                />
                <br />
                <input type="password" name="password" placeholder="Password" 
                  onChange={updateUser}
                />
                <br />
                <input type="password" name="confirmPassword" placeholder="Confirm Password"
                  onChange={updateUser}
                />
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;