import React, {useState, Fragment, useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import "../css/Home.css"
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import { makeStyles } from '@material-ui/core/styles';
import EditableRow from '../js/EditableRow';
import ReadOnlyRow from '../js/ReadOnlyRow';
import { nanoid } from "nanoid";

function Home() {

    const classes = makeStyles;
    const [vehicles, setVehicles] = useState([]);

    const [addVehicleData, setAddVehicleData] = useState({
        license: "",
        state: "",
        vin: "",
        twf: "",
        year: "",
        make: "",
        model: "",
        pur_date: "",
        mileage: "",
    })

    const [editVehicleData, setEditVehicleData] = useState({
        license: "",
        state: "",
        vin: "",
        twf: "",
        year: "",
        make: "",
        model: "",
        pur_date: "",
        mileage: "",
    });

    const [editVehicleID, setEditVehicleID] = useState(null);
    const [dependency, setDependency] = useState(true);

    useEffect(() => {
        updateVehicles();
    }, [])

    

    const updateVehicles = () =>
    {
        console.log("vehicles updated");
        const db = getDatabase();
        const starCountRef = ref(db, 'vehicles/');
        var newVehicles = [];

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            Object.values(data).map((curVehicle, k) => {
                newVehicles.push(curVehicle);
            })
        });

        setVehicles(newVehicles); 
    }
    
    const writeVehicleData = (vehicle) => {
        const db = getDatabase();
        set(ref(db, 'vehicles/' + vehicle.id), {
            id: vehicle.id,
            license: vehicle.license, 
            state: vehicle.state,
            vin: vehicle.vin, 
            twf: vehicle.twf, 
            year: vehicle.year, 
            make: vehicle.make, 
            model: vehicle.model, 
            pur_date: vehicle.pur_date, 
            mileage: vehicle.mileage
        });
    }


    const handleAddVehicleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newVehicleData = {...addVehicleData};
        newVehicleData[fieldName] = fieldValue;

        setAddVehicleData(newVehicleData);
    }

    const handleEditVehicleChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newVehicleData = {...editVehicleData};
        newVehicleData[fieldName] = fieldValue;

        setEditVehicleData(newVehicleData);
    }

    const handleAddVehicleSubmit = (event) => {
        event.preventDefault();

        const newVehicle = {
            id: nanoid(),
            license: addVehicleData.license, 
            state: addVehicleData.state,
            vin: addVehicleData.vin, 
            twf: addVehicleData.twf, 
            year: addVehicleData.year, 
            make: addVehicleData.make, 
            model: addVehicleData.model, 
            pur_date: addVehicleData.pur_date, 
            mileage: addVehicleData.mileage
        }

        writeVehicleData(newVehicle);
        const newVehicles = [...vehicles, newVehicle];
        setVehicles(newVehicles);
    }

    const handleEditVehicleSubmit = (event) => {
        const db = getDatabase();
        event.preventDefault();

        const editedVehicle = {
            id: editVehicleID,
            license: editVehicleData.license, 
            state: editVehicleData.state,
            vin: editVehicleData.vin, 
            twf: editVehicleData.twf, 
            year: editVehicleData.year, 
            make: editVehicleData.make, 
            model: editVehicleData.model, 
            pur_date: editVehicleData.pur_date, 
            mileage: editVehicleData.mileage
        }

        const newVehicles = [...vehicles];
        const index = vehicles.findIndex((vehicleI) => vehicleI.id = editedVehicle.id);

        newVehicles[index] = editedVehicle;

        writeVehicleData(editedVehicle);
        setVehicles(newVehicles);
        setEditVehicleID(null);
    }

    const handleEditClick = (event, v) => {
        event.preventDefault();
        setEditVehicleID(v.id);

        const vehicleValues = {
            id: v.id,
            license: v.license, 
            state: v.state,
            vin: v.vin, 
            twf: v.twf, 
            year: v.year, 
            make: v.make, 
            model: v.model, 
            pur_date: v.pur_date, 
            mileage: v.mileage
        }

        setEditVehicleData(vehicleValues);
    }

    const handleCancelClick = () => {
        setEditVehicleID(null);
    }

    const handleDeleteClick = (vehicle) => {
        const db = getDatabase();
        const newVehicles = [...vehicles];

        const index = vehicles.findIndex((vehicleI) => vehicleI.id = vehicle.id);
        newVehicles.splice(index, 1);

        remove(ref(db, 'vehicles/' + vehicle.id));
        setVehicles(newVehicles);
    }
    
    return (
        <div className = "MainDisplay">
            {/*
            <div>hello</div>
            <form autoComplete='off' noValidate onSubmit = {doSomething}>
                <div className = "loginMenuParent">
                    <TextField className = "loginTextField" name = "Email" variant = "filled" label = "Email Address" margin = "normal" inputlabelprops = {{ shrink: true}} required value = {license.name} onChange = {(e) => setLicense({...license, name: e.target.value})}/>
                    <TextField className = "loginTextField" name = "Password" variant = "filled" label = "Password" margin = "normal" inputlabelprops = {{ shrink: true}} required value = {state.name} onChange = {(f) => setState({...state, name: f.target.value})}/>
                    <Button type = "submit"> Submit! </Button>                    
                </div>
            </form> 
            */}

        <div className = "addVehicle">
                <h2>Add a Vehicle</h2>
                <form onSubmit={handleAddVehicleSubmit}>
                    <input
                    className = "inputAdd"
                    type="text"
                    name="state"
                    required="required"
                    placeholder="State: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="license"
                    required="required"
                    placeholder="License: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="vin"
                    required="required"
                    placeholder="Vin: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="twf"
                    required="required"
                    placeholder="Twf: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="year"
                    required="required"
                    placeholder="Year: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="make"
                    required="required"
                    placeholder="Make: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="model"
                    required="required"
                    placeholder="Model: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    type="text"
                    className = "inputAdd"
                    name="pur_date"
                    required="required"
                    placeholder="Pur_date: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    type="text"
                    className = "inputAdd"
                    name="mileage"
                    required="required"
                    placeholder="Mileage: "
                    onChange={handleAddVehicleChange}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>

            <div className = "displayVehicles">
                <form onSubmit={handleEditVehicleSubmit}>
                    <table>
                        <thead>
                            <tr>
                            <th>State</th>
                            <th>License</th>
                            <th>Vin</th>
                            <th>Twf</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Pur Date</th>
                            <th>Mileage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((curVehicle) => {
                                return (
                                    <Fragment key = {curVehicle.id}>
                                        {editVehicleID === curVehicle.id ? (
                                        <EditableRow
                                            editVehicleData={editVehicleData}
                                            handleEditVehicleChange={handleEditVehicleChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                        ) : (
                                        <ReadOnlyRow
                                            vehicle={curVehicle}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                        )}
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
};

export default Home;