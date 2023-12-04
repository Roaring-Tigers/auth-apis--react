import React, {useState} from "react";
import UserContext from "./UserContext"; 


const UserProvider = ({children}) => {
    const [token, setToken] = useState("");

    return(
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider;
