import React, { useEffect, useState } from 'react';
import '../css/Login.css';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import { getDatabase, ref, set } from "firebase/database";
import useStyles from './styles';
import { makeStyles } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

function Login() {

    const classes = makeStyles;

    const [license, setLicense] = useState({name: ""})
    const [state, setState] = useState({name: ""})
    const [vin, setVin] = useState({name: ""})
    const [twf, setTwf] = useState({name: ""})
    const [year, setYear] = useState({name: ""})
    const [make, setMake] = useState({name: ""})
    const [model, setModel] = useState({name: ""})
    const [pur_date, setPur_date] = useState({name: ""})
    const [mileage, setMileage] = useState({name: ""})
        
    const writeVehicleData = (v_license, v_state, v_vin, v_twf, v_year, v_make, v_model, v_pur_date, v_mileage) => {
        const db = getDatabase();
        set(ref(db, 'vehicles/' + v_license), {
        license: v_license, 
        state: v_state,
        vin: v_vin, 
        twf: v_twf, 
        year: v_year, 
        make: v_make, 
        model: v_model, 
        pur_date: v_pur_date, 
        mileage: v_mileage
        });
    }

    const doSomething = (event) => {
        event.preventDefault();
        console.log("Starting");
        writeVehicleData(
            "6NMC791", 
            "CA", 
            "JN8AZ2KR6AT161278", 
            "A052", 
            "2010", 
            "NIS", 
            "CUBE", 
            "06/08/10", 
            "148,118"
        )
        
        console.log("1");
        writeVehicleData(
            "6SBF037",
            "CA",
            "JN8AS5MV0BW684408",
            "A065",
            "2011",
            "NIS",
            "ROGUE",
            "11/19/11",
            "167,727"
        )
        
        console.log("1");
        writeVehicleData(
            "7ESF548",
            "CA",
            "KMHCU5AE4EU158412",
            "A081",
            "2014",
            "HYN",
            "ACCENT",
            "05/07/14",
            "128,565"
        )
        console.log("3");
        if(license.name !== ""){
            writeVehicleData(
                license.name,
                state.name,
                "KMHCU5AE4EU158412",
                "A081",
                "2014",
                "HYN",
                "ACCENT",
                "05/07/14",
                "128,565"
            )
        }
    }
    
    return (
        <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {doSomething}>
            <div className = "loginMenuParent">
                <TextField className = "loginTextField" name = "Email" variant = "filled" label = "Email Address" margin = "normal" inputlabelprops = {{ shrink: true}} required value = {license.name} onChange = {(e) => setLicense({...license, name: e.target.value})}/>
                <TextField className = "loginTextField" name = "Password" variant = "filled" label = "Password" margin = "normal" inputlabelprops = {{ shrink: true}} required value = {state.name} onChange = {(f) => setState({...state, name: f.target.value})}/>
                <Button type = "submit"> Submit! </Button>                    
            </div>
        </form> 
    )
}

export default Login;