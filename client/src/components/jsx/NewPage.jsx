import React from 'react';
import '../css/NewPage.css';
import IconButton from '@mui/material/IconButton';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';

function NewPage() {
    return (
         <div>
            <IconButton aria-label="delete">
                <ArrowBackIosNewSharpIcon />
            </IconButton>
            <h1 class = "heading">VehicleID - Vehicle Info</h1>
            <label class = "ODO">ODO: 33,150</label>
            <table class = "table">
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