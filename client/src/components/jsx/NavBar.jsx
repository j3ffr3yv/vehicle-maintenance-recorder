import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavBar.css";

function NavBar(){
    return (
        <div className = 'mainNavBarContent'>
            <img className='logoImage' src={require("../../Images/Logo.png")}/>
            <div className='navButtons'>
                <NavLink className='NavBarText' to="/login">Login</NavLink>
                <NavLink className='NavBarText' to="/">Home</NavLink> 
                <NavLink className='NavBarText' to="/newpage">NewPage</NavLink>             
            </div>              
        </div>          
    )
}

export default NavBar;