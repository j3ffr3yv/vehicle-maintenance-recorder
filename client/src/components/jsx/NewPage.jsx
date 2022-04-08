import React, {useEffect} from 'react';
import '../css/NewPage.css';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import { useParams } from "react-router";

function NewPage() {

    const vehicleData = JSON.parse(localStorage.getItem("loadedVehicle"));
    console.log("ON VEHICLE PAGE: " + vehicleData.licenseP);

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
                <tr>
                    <td>1/15/2022</td>
                    <td>Oil Service</td>
                    <td>33,150</td>
                </tr>
                <tr>
                    <td>11/20/2021</td>
                    <td>Front Brakes</td>
                    <td>26,900</td>
                </tr>
                <tr>
                    <td>11/20/2021</td>
                    <td>Rotate Tires</td>
                    <td>26,900</td>
                </tr>
                <tr>
                    <td>11/20/2021</td>
                    <td>Replace Cabin Air Filter</td>
                    <td>26,900</td>
                </tr>
                <tr>
                    <td>11/20/2021</td>
                    <td>Oil Service</td>
                    <td>26,900</td>
                </tr>
                <tr>
                    <td>8/10/2021</td>
                    <td>Front Brakes</td>
                    <td>18,600</td>
                </tr>
                <tr>
                    <td>8/10/2021</td>
                    <td>Oil Service</td>
                    <td>18,600</td>
                </tr>
                </tbody>
            </table>
            <IconButton aria-label="delete">
                <AddSharpIcon />
            </IconButton>
         </div>
         
        
        
    )
}

export default NewPage;