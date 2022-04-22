import React, { useEffect, useState, useRef } from 'react';
//import '../css/Login.css';
import {AppBar, Typography, Grow, Grid, TextField} from '@material-ui/core';
import {Card, Form,Button,Container} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

function Login() {

  const auth = getAuth()  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        navigate('/')
    })
    .catch(err => setError(err.message))
  }
  const passreset = e => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
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
  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have and account? 
          <Link to='/signup'>Sign Up</Link>
        </p>
        <p>
          Forgot your login?
          <Link to="/" onClick={passreset}>Reset Password</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;