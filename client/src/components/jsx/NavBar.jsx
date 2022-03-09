import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function NavBar(){
    return (
        <div class = 'mainNavBarContent'>
            <img class='logoImage' src={require("../../Images/Logo.png")}/>
            <div class='loginButton'>
                <NavLink className='loginButtonText' to="/">Home</NavLink> 
                <NavLink className='loginButtonText' to="/login">Login</NavLink> 
                <NavLink className='loginButtonText' to="/newpage">NewPage</NavLink> 
            </div>                   
        </div>   
    )
}

export default NavBar;