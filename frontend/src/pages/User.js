// import { useState } from "react";
import Contents from "../components/Contents";
import NavBar from "../components/NavBar";
import UserDetails from "../components/UserDetails";
import "../styling/User.css";

const User = ({setState}) => {
    
    return (
        <div>
        <NavBar setState={setState}/>
        <div className="User-Container">
            <div className="UserProfile">
                <UserDetails/>
            </div>
            <div className="Contents">
                    <Contents />
            </div>
        </div>
        </div>
        
    )
}

export default User;