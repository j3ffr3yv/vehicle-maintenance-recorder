import React , {useEffect, useReducer}from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavBar.css";
import {getAuth,signOut, sendPasswordResetEmail} from "firebase/auth"
import { getDatabase, ref, get, child} from "firebase/database";
import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown'


function NavBar(){
 
    let auth = getAuth();
    let user = auth.currentUser

    useReducer(x => x + 1, 0);
    

    return (
        <div className = 'mainNavBarContent'>
          <img className='logoImage' src={require("../../Images/Logo.png")}/>
          <div className='navButtons'>
              {
                  auth.currentUser != null ? 
                      <Simple></Simple>
                  :
                      <NavLink className='NavBarText' to="/login">Login</NavLink>
              }
          </div>      
        </div>          
    )
}

class Simple extends React.Component {
    render() {
        var  auth = getAuth();
        var  user = auth.currentUser
        var userName = ""
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
          <div className = "navbarDropdown">
          <button className = 'dropdownItem' onClick={LogOut}>
            Logout
          </button>
          <Link to = "/">Home</Link>
          </div>
      )
    }
    
  }

export default NavBar;