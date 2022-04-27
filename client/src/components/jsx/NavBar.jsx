import React , {useEffect, useReducer}from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavBar.css";
import {getAuth,signOut } from "firebase/auth"

function NavBar(){
 
    let auth = getAuth();

    useReducer(x => x + 1, 0);

    function LogOut()
    {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("This signs out the user")
            console.log(auth)
            window.location.reload(false);
          }).catch((error) => {
            // An error happened.
          });
          
    }
    return (
        <div className = 'mainNavBarContent'>
            <img className='logoImage' src={require("../../Images/Logo.png")}/>
            <div className='navButtons'>
                {
                    auth.currentUser != null ? 
                        <button onClick={LogOut}>Sign out</button>
                    :
                        <NavLink className='NavBarText' to="/login">Login</NavLink>
                }
                <NavLink className='NavBarText' to="/">Home</NavLink>           
            </div>              
        </div>          
    )
}

export default NavBar;