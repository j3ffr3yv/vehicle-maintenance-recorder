import React from 'react';
import '../css/Login.css';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import { getDatabase, ref, set } from "firebase/database";

function Login() {
    return (
        <div className = "loginMenuParent">
            <div className = "loginMenu">
                <h1 className = "loginText">Login Page</h1>
                <TextField className = "loginTextField" name = "Email" variant = "filled" label = "Email Address" margin = "normal" InputLabel inputlabelprops = {{ shrink: true}} required/>
                <TextField className = "loginTextField" name = "Password" variant = "filled" label = "Password" margin = "normal" InputLabel inputlabelprops = {{ shrink: true}} required/>
                <button onclick={this.writeUserData()}> Submit </button>
            </div>
        </div>
    )
}

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
  
export default Login;