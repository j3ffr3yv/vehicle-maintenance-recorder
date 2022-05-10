import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from './components/jsx/Home.jsx';
import NavBar from './components/jsx/NavBar.jsx';
import Login from './components/jsx/Login.jsx';
import VehiclePage from './components/jsx/VehiclePage.jsx';
import MaintenancePage from './components/jsx/MaintenancePage.jsx'
import SignUp from './components/jsx/SignUp.jsx';


import './components/css/NavBar.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getDatabase, ref, set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxCd71aKYWvP88iVGhGfj8nKHGU3PD12c",
  authDomain: "my-application-database-test.firebaseapp.com",
  databaseURL: "https://my-application-database-test-default-rtdb.firebaseio.com",
  projectId: "my-application-database-test",
  storageBucket: "my-application-database-test.appspot.com",
  messagingSenderId: "1035826648035",
  appId: "1:1035826648035:web:338b5872a03739911546d6",
  measurementId: "G-GPTK97CLDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Get a database reference 
//https://firebase.google.com/docs/database/web/read-and-write#get_a_database_reference

const database = getDatabase();

//Write data https://firebase.google.com/docs/database/web/read-and-write#write_data

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

const App = () => {
    return (
        <Router>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path ="/login" element = {<Login/>} />
                    <Route path ="/vehiclepage" element = {<VehiclePage/>} />
                    <Route path ="/maintenance" element = {<MaintenancePage/>} />
                    <Route path ="/signup" element = {<SignUp/>} />
                </Routes>   
        </Router>
    );
}
export default App;

