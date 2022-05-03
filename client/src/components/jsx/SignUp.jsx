import React, {useState} from 'react';
import {Card, Form,Button,Container} from 'react-bootstrap';
import '../css/SignUp.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set} from "firebase/database";
import { Label } from 'reactstrap';
import PasswordChecklist from "react-password-checklist"
import NavBar from "./NavBar"


function SignUp() {

  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [passwordValid, setPasswordValid] = useState(false);

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }
  function writeUserData(newName, userId) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      name: newName,
      master: false
    });
  }
  const signup = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, name, password)
        .then((userCredential) => {
          const user = userCredential.user;
          writeUserData(name, userCredential.user.uid);
          <h2>User Created</h2>
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setName('')
    setPassword('')
    setConfirmPassword('')
  }
  


    return (
      <div>
      <NavBar/>
        <div className='center'>
        <div className='auth'>
          <h1>Sign Up</h1>
          {error && <div className='auth__error'>{error}</div>}
          <form onSubmit={signup} name='registration_form'>
            <input 
              type='email' 
              value={email}
              placeholder="Enter your email"
              required
              onChange={e => setEmail(e.target.value)}/>
              <input 
                type='name' 
                value={name}
                placeholder="Enter your name"
                required
                onChange={e => setName(e.target.value)}/>
            <input 
              type='password'
              value={password} 
              required
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}/>

              <input 
              type='password'
              value={confirmPassword} 
              required
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}/>

            <PasswordChecklist 
              rules = {["minLength","specialChar","number","capital","match"]} 
              minLength = {5} 
              value = {password} 
              valueAgain = {confirmPassword}
              onChange={(isValid) => {setPasswordValid(isValid)}}
            />

            <button type='submit' disabled = {!passwordValid}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default SignUp;