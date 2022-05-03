import React, {useState, Fragment, useEffect, useMemo, useReducer} from 'react';
import '../css/VehiclePage.css';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import { nanoid } from "nanoid";
import { getAuth } from "firebase/auth"
import NavBar from "./NavBar"
import {useNavigate} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';


function VehiclePage() {

    const navigate = useNavigate()
    const auth = getAuth();
    let vehicleData = JSON.parse(localStorage.getItem("loadedVehicle"));
    const [maintenances, setMaintenances] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({id: vehicleData.idP, state: "", license: vehicleData.licenseP, vin: "", twf: "", year: "", make: "", model: "", pur_date: "", mileage: "", maintenances: []})

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        if (vehicleData == null)
        {
            window.location.href = '/'
        }
    })

    
    const maintenance = () =>
    {
        const db = getDatabase();
        const Ref = ref(db, 'vehicles/'+ vehicleData.idP + '/maintenances');
        var newMaintenances = [];
    
        onValue(Ref, (snapshot) => {
            let data = snapshot.val();

            if(data == null)
            {
                set(ref(db, 'vehicles/' + vehicleData.idP + '/maintenances/'), null)
                data = snapshot.val();
            }
            else {
                Object.values(data).map((curMaintanences, k) => {
                    newMaintenances.push(curMaintanences);
                    
                    forceUpdate();
                })
                setDisplayMaintenances(newMaintenances);
                forceUpdate();
            }
        });
    }

    useEffect(() => {
        if (maintenances.length == 0)
        {
            maintenance();
        }
    },[])

    //Vehicles
    const [displayMaintenances, setDisplayMaintenances] = useState([]);
    //AddVehicleData
    const [addMaintenanceData, setAddMaintenanceData] = useState({
        id: "",
        name: "",
        date: "",
        mechanic: "",
        parts_cost: "",
        labor: "",
        notes: "",
        mileage: ""
    })
    //editVehicleData
    const [editMaintenanceData, setEditMaintenanceData] = useState({
        id: "",
        name: "",
        date: "",
        mechanic: "",
        parts_cost: "",
        labor: "",
        notes: "",
        mileage: ""
    });
    //UseEffect
        useEffect(() => {
        updateMaintenances();
    }, [])
    //All original functions for home page.
    const updateMaintenances = () =>
    {
        const db = getDatabase();
        const starCountRef = ref(db, 'vehicles/' + vehicleData.idP + '/maintenances/');
        var newMaintenances = [];
  
        onValue(starCountRef, (snapshot) => {
            let data = snapshot.val();

            if(data == null)
            {
                set(ref(db, 'vehicles/' + vehicleData.idP + '/maintenances/'), null)
                data = snapshot.val();
            }
            else {
                Object.values(data).map((curMaintenance, k) => {
                    newMaintenances.push(curMaintenance);
                })
            }
            setEditingData({...editingData, maintenances: newMaintenances})
            setMaintenances(newMaintenances);
        });
   
    }
    const writeMaintenanceData = (maintenance) => {
        const db = getDatabase();
        set(ref(db, 'vehicles/' + vehicleData.idP + '/maintenances/' + maintenance.id), {
          id: maintenance.id,
          name: maintenance.name,
          date: maintenance.date,
          mechanic: maintenance.mechanic,
          parts_cost: maintenance.parts_cost,
          labor: maintenance.labor,
          notes: maintenance.notes,
          mileage: maintenance.mileage
        });
    }
    const handleAddMaintenanceChange = (event) => {
        event.preventDefault();
  
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
  
        const newMaintenanceData = {...addMaintenanceData};
        newMaintenanceData[fieldName] = fieldValue;
  
        setAddMaintenanceData(newMaintenanceData);
    }
    const handleAddMaintenanceSubmit = (event) => {
        event.preventDefault();
        const newMaintenance = {
            id: nanoid(),
            name: addMaintenanceData.name,
            date: Date.now(),
            mechanic: addMaintenanceData.mechanic,
            parts_cost: addMaintenanceData.parts_cost,
            labor: addMaintenanceData.labor,
            notes: addMaintenanceData.notes,
            mileage: addMaintenanceData.mileage
        }
    
      writeMaintenanceData(newMaintenance);
      const newMaintenances = [...maintenances, newMaintenance];
      setMaintenances(newMaintenances);
    }

    function handleMaintenancePage(maintenance) {
        localStorage.setItem("loadedMaintenance", JSON.stringify(maintenance))
        //console.log("MAINTENANCE TO PAGE: " + localStorage.getItem("loadedMaintenance"));
    }

    function handleDeleteVehicle() {
        //console.log("DELETING " + vehicleData.idP)
        const db = getDatabase();
        remove(ref(db, 'vehicles/' + vehicleData.idP));
        localStorage.setItem("loadedVehicle", null);
        vehicleData = null;
        window.location.href = '/'
       // window.location.reload(false);
    }

    function handleStartEditing()
    {
        setIsEditing(true)
        setEditingData({...editingData,
            id: vehicleData.idP, 
            state: vehicleData.stateP, 
            license: vehicleData.licenseP, 
            vin: vehicleData.vinP, 
            twf: vehicleData.twfP, 
            year: vehicleData.yearP, 
            make: vehicleData.makeP, 
            model: vehicleData.modelP, 
            pur_date: vehicleData.pur_dateP,
            mileage: vehicleData.mileageP,
        })
    }

    function handleSubmitEdit(vehicle)
    {
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
            mileage: vehicle.mileage,
            maintenances: vehicle.maintenances
        });
        //vehicleData = vehicle;

        localStorage.setItem("loadedVehicle", JSON.stringify({
            idP: vehicle.id,
            licenseP: vehicle.license, 
            stateP: vehicle.state,
            vinP: vehicle.vin, 
            twfP: vehicle.twf, 
            yearP: vehicle.year, 
            makeP: vehicle.make, 
            modelP: vehicle.model, 
            pur_dateP: vehicle.pur_date, 
            mileageP: vehicle.mileage,
            maintenancesP: vehicle.maintenances
        }));
        setIsEditing(false)
        //navigate('/')
        
    }

    return (
         <div>
             <NavBar/>
             <Link to="/"> 
                <ArrowBackIosNewSharpIcon />
            </Link>
            {
                auth.currentUser != null && vehicleData != null ?
                    <div>
                        <button onClick={handleDeleteVehicle}>
                            Delete
                        </button>

                        {isEditing == false ? 
                                <div>
                                    <h1>Vehicle Data: {vehicleData.twfP}</h1>
                                    <div className = "vehicleDataList">
                                        <div>State: {vehicleData.stateP}</div>
                                        <div>VIN: {vehicleData.vinP}</div>
                                        <div>Liscence: {vehicleData.licenseP}</div>
                                        <div>Year: {vehicleData.yearP}</div>
                                        <div>Make: {vehicleData.makeP}</div>
                                        <div>Model: {vehicleData.modelP}</div>
                                        <div>Purchase Date: {vehicleData.pur_dateP}</div>
                                        <div>Mileage: {vehicleData.mileageP}</div>
                                        <button onClick = {handleStartEditing}>Edit</button>
                                    </div>
                                </div>
                            :
                                <div>
                                    <h1>Editing Vehicle Data...</h1>
                                    <div className = "vehicleDataList">
                                        <input placeholder = "State..." defaultValue = {vehicleData.stateP} onChange = {(event) => setEditingData({...editingData, state: event.target.value})}></input>
                                        <input placeholder = "VIN..." defaultValue = {vehicleData.vinP} onChange = {(event) => setEditingData({...editingData, vin: event.target.value})}></input>
                                        <input placeholder = "TWF..." defaultValue = {vehicleData.twfP} onChange = {(event) => setEditingData({...editingData, twf: event.target.value})}></input>
                                        <input placeholder = "Year..." defaultValue = {vehicleData.yearP} onChange = {(event) => setEditingData({...editingData, year: event.target.value})}></input>
                                        <input placeholder = "Make..." defaultValue = {vehicleData.makeP} onChange = {(event) => setEditingData({...editingData, make: event.target.value})}></input>
                                        <input placeholder = "Model..." defaultValue = {vehicleData.modelP} onChange = {(event) => setEditingData({...editingData, model: event.target.value})}></input>
                                        <input placeholder = "Purchase_date..." defaultValue = {vehicleData.pur_dateP} onChange = {(event) => setEditingData({...editingData, pur_date: event.target.value})}></input>
                                        <input placeholder = "Mileage..." defaultValue = {vehicleData.mileageP} onChange = {(event) => setEditingData({...editingData, mileage: event.target.value})}></input>
                                        <button onClick = {() => handleSubmitEdit(editingData)}>Submit</button>
                                    </div>
                                </div>
                        }

                        <div className = "addMaintenance">
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>Adding Maintenance</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={handleAddMaintenanceSubmit} >
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="name"
                                    required="required"
                                    placeholder="Name: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="mechanic"
                                    defaultValue=""
                                    placeholder="Mechanic: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="parts_cost"
                                    required="required"
                                    placeholder="Parts Cost: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="labor"
                                    required="required"
                                    placeholder="Labor(hrs): "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="notes"
                                    required="required"
                                    placeholder="Notes: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="date"
                                    required="required"
                                    placeholder="Date: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <input
                                    className = "inputAdd"
                                    type="text"
                                    name="mileage"
                                    required="required"
                                    placeholder="Mileage: "
                                    onChange={handleAddMaintenanceChange}
                                    />
                                    <button type="submit">Add</button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal>

                        </div>
                        <h1 className = "maintenancePerformed">Maintenance Performed</h1>   
                        <table className = "table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Service</th>
                                <th>Mileage</th>
                            </tr>
                            </thead>
                            <tbody>
                                {displayMaintenances.map((currMaint, index) => {
                                    return (
                                        <tr key = {index}>
                                            <td>
                                                <Link to = "/maintenance" onClick = {() => handleMaintenancePage(
                                                    {
                                                        id: currMaint.id,
                                                        name: currMaint.name,
                                                        date: currMaint.date,
                                                        mechanic: currMaint.mechanic,
                                                        parts_cost: currMaint.parts_cost,
                                                        labor: currMaint.labor,
                                                        notes: currMaint.notes,
                                                        vehicleID: vehicleData.idP
                                                    }
                                                )}>{Date(currMaint.date)}</Link>
                                            </td>
                                            <td>{currMaint.name}</td>
                                            <td>{currMaint.mileage}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <IconButton aria-label="delete"> 
                        <AddSharpIcon onClick={handleShow} />
                        </IconButton>
                    </div>
                : 
                    <h1>Please log in in order to view this information!</h1>
            }
         </div>   
    )
}


export default VehiclePage;