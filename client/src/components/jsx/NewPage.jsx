import React, {useEffect, useReducer} from 'react';
import '../css/NewPage.css';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useParams } from "react-router";
import { getDatabase, onValue , ref, set } from 'firebase/database';
import { useState } from 'react';

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
                maintenances.push(curMaintanences);
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

    return (
         <div>
            <IconButton aria-label="delete"> 
                <ArrowBackIosNewSharpIcon />
            </IconButton>

            <h1>Vehicle Data: {vehicleData.stateP}</h1>

            <div className = "vehicleDataList">
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
                    {maintenances.map((currMaint, index) => {
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