import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from './components/jsx/Home.jsx';
import NavBar from './components/jsx/NavBar.jsx';
import Login from './components/jsx/Login.jsx';
import NewPage from './components/jsx/NewPage.jsx';

import './components/css/NavBar.css';

const App = () => {
    return (
        <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path ="/login" element = {<Login/>} />
                    <Route path ="/newpage" element = {<NewPage/>} />
                </Routes>   
        </Router>
    );
}

export default App;