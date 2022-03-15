import React from 'react';
import '../css/NewPage.css';

function NewPage() {
    return (
         <div>
             {/* <h1 class = 'heading'>VehicleID - Vehicle Info</h1>
             <label class = 'mileage'>
                Mileage: ##,### 
             </label>
             <label class = 'vehicleInfo'>
                Date Comment Mileage
             </label>
            <button class = 'addB'>
                ADD
            </button> */}
            
            <button class = 'back'>
                Back
            </button>
            <h1 class = 'heading'>VehicleID - Vehicle Info</h1>
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
            <button class = 'addB'>
                ADD
            </button>
         </div>
         
        
        
    )
}

export default NewPage;