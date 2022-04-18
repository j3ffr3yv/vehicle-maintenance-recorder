import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavBar.css";
import { getAuth } from "firebase/auth"

function NavBar(){

    const auth = getAuth();

    return (
        <div className = 'mainNavBarContent'>
            <img className='logoImage' src={require("../../Images/Logo.png")}/>
            <div className='navButtons'>
                {
                    auth.currentUser != null ? 
                        <NavLink className='NavBarText' to="/login">Login</NavLink>
                    :
                        <p className='NavBarText'>logout</p>
                }
                <NavLink className='NavBarText' to="/">Home</NavLink>           
            </div>              
        </div>          
    )
}

export default NavBar;