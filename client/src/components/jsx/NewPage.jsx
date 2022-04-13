import React, {useState, Fragment, useEffect, useMemo, useReducer} from 'react';
import '../css/NewPage.css';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useParams } from "react-router";

import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import { nanoid } from "nanoid";


function NewPage() {

    const vehicleData = JSON.parse(localStorage.getItem("loadedVehicle"));
    const [maintenances, setMaintenances] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    
    const maintenance = () =>
    {
        const db = getDatabase();
        const Ref = ref(db, 'maintenances/v1');
        var newMaintenances = [];
    
        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            Object.values(data).map((curMaintanences, k) => {
                displayMaintenances.push(curMaintanences);
                /*console.log(maintenances);*/
                forceUpdate();
            })
            /*console.log("NEWMAINTENANCES: " + newMaintenances);*/
            /*setMaintenances(newMaintenances);*/
            /*setMaintenances({...maintenances, newMaintenances})*/
        });

        //console.log(newMaintenances[0].date);
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
        notes: ""
    })
    //editVehicleData
    const [editMaintenanceData, setEditMaintenanceData] = useState({
        id: "",
        name: "",
        date: "",
        mechanic: "",
        parts_cost: "",
        labor: "",
        notes: ""
    });
    //UseEffect
        useEffect(() => {
        updateMaintenances();
    }, [])
    //All original functions for home page.
    const updateMaintenances = () =>
    {
        console.log("maintenances updated");
        const db = getDatabase();
        const starCountRef = ref(db, 'vehicles/' + vehicleData.idP + '/maintenances/');
        var newMaintenances = [];
  
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            Object.values(data).map((curMaintenance, k) => {
                newMaintenances.push(curMaintenance);
            })
        });
  
        setMaintenances(newMaintenances); 
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
          notes: maintenance.notes
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
            notes: addMaintenanceData.notes
        }
        console.log(newMaintenance);
    
      writeMaintenanceData(newMaintenance);
      const newMaintenances = [...maintenances, newMaintenance];
      setMaintenances(newMaintenances);
    }
    return (
         <div>
            <IconButton aria-label="delete"> 
                <ArrowBackIosNewSharpIcon />
            </IconButton>
            <div className = "addMaintenance">
                <h2>Add Maintenance</h2>
                <form onSubmit={handleAddMaintenanceSubmit}>
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
                    <button type="submit">Add</button>
                </form>
            </div>
            <h1>Vehicle Data: {vehicleData.stateP}</h1>

            <div className = "vehicleDataList">
                <div>(FOR DEBUGGING) id: {vehicleData.idP}</div>
                <div>State: {vehicleData.licenseP}</div>
                <div>VIN: {vehicleData.vinP}</div>
                <div>TWF: {vehicleData.twfP}</div>
                <div>Year: {vehicleData.yearP}</div>
                <div>Make: {vehicleData.makeP}</div>
                <div>Model: {vehicleData.modelP}</div>
                <div>Purchase Date: {vehicleData.pur_dateP}</div>
            </div>

            <h1>Maintenance Performed</h1>
            <table className = "table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Mileage</th>
                </tr>
                </thead>
                <tbody>
                    {displayMaintenances.map((currMaint, index) => {
                        return (
                            <tr key = {index}>
                                <td>{currMaint.date}</td>
                                <td>{currMaint.service}</td>
                                <td>{currMaint.mileage}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <IconButton aria-label="delete">
                <AddSharpIcon />
            </IconButton>
         </div>
         
        
        
    )
}


export default NewPage;