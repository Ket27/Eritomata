import "../styling/NavBar.css";
import { IoMdSearch } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import {useSelector, useDispatch} from "react-redux";
import React, {useState, useEffect} from "react";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const NavBar = ({setState}) => {
    const [userName, setUserName] = useState(""); 
    const dispatch = useDispatch();
    const {userDetails} = useSelector((store) => store.user);
    const navigate = useNavigate();

    const userProfile = () => {
        navigate(`/user/profile/${userDetails.id}`);
    }

    useEffect(() => {
        if(!userDetails){
            dispatch(userActions.setUserDetails(JSON.parse(localStorage.getItem("userDetails"))));
        }
        else {
            setUserName(userDetails.name);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
        }
    },[userDetails, dispatch])

    const handleClick = (e) => {
        setState(e);
        navigate('/dashboard');
    }

    return (
        <nav className="NavBar-Container">
            <div className="Nav-Logo">Logo</div>
            <div className="Nav-Items">
                <div className="Nav-Item Nav-Home" onClick={() => {handleClick("AllPosts")}}><IoHome /></div>
                <div className="Nav-Item Nav-Search-Container">
                    <IoMdSearch className="search-icon"/>
                    <input type="text" placeholder="Search" className="Nav-Search" />
                </div>
                <div className="Nav-Item Nav-Questions" onClick={() => {handleClick("AllQuestions")}}>Questions</div>
            </div>
            <div className="Nav-User">
                <span className="Nav-User-Logo" onClick={userProfile}>{`${userName[0]}`}</span>
                <span className="Nav-User-Name" onClick={userProfile}>{`${userName}`}</span>
            </div>
        </nav>
    )
}

export default NavBar;