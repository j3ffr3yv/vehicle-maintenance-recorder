import React , {useEffect, useReducer}from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import "../css/NavBar.css";
import {getAuth,signOut, sendPasswordResetEmail} from "firebase/auth"
import { getDatabase, ref, get, child} from "firebase/database";
import { Link } from "react-router-dom";

import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
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
        const btn = document.getElementById("userdisplay");
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}/name`)).then((snapshot) => {
          if (snapshot.exists()) {
            btn.title = snapshot.val();
            console.log(btn.value);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
        console.log(userName);
        function passreset() {
        sendPasswordResetEmail(auth, user.email)
        .then(() => {
            alert.show("Password Reset Email Sent!")
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            alert.show("ERROR: Invalid Info!")
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
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
            <Dropdown>
            <Dropdown.Toggle color="primary" id="userdisplay" title = "lol">
            </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to = "/">Home</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to = "/profile">Edit Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item text="Change Password (via Email)" onClick={passreset} />
                  <Dropdown.Item text="Logout" onClick={LogOut} />
              </Dropdown.Menu>
            </Dropdown>
          </div>
      )
    }
    
  }

export default NavBar;