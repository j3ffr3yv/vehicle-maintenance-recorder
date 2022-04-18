import React, {useState} from 'react';
import {Card, Form,Button,Container} from 'react-bootstrap';
import '../css/SignUp.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link} from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Label } from 'reactstrap';


function SignUp() {

  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

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

  const signup = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          <h2>User Created</h2>
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }


    return (
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

          <button type='submit'>Sign Up</button>
        </form>
        <span>
          Already have an account?  
          <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
    )
}

export default SignUp;