import React, {useEffect, useState} from "react";
import { getAuth } from "firebase/auth"
import { Link } from "react-router-dom";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import NavBar from "./NavBar"
import "../css/MaintenancePage.css"
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import { format } from 'date-fns'

const MaintenancePage = () => {

    const auth = getAuth();
    let maintenanceData = JSON.parse(localStorage.getItem("loadedMaintenance"));

    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({id: maintenanceData.id, name: "", date: "", mechanic: "", parts_cost: "", labor: "", notes: "", vehicleID: maintenanceData.vehicleID});

    function handleDelete()
    {
        if(window.confirm("Delete this maintenance update?"))
        {
            console.log("delete");
            const db = getDatabase();
            remove(ref(db, 'vehicles/' + maintenanceData.vehicleID + "/maintenances/" + maintenanceData.id))
            localStorage.setItem("loadedMaintenance", null);
            maintenanceData = null;
            window.location.href = "/VehiclePage";
            console.log("deleted");
        }
    }

    useEffect(() => {
        if (maintenanceData == null)
        {
            window.location.href = '/'
        }
    })

    function handleStartEdit()
    {
        setIsEditing(true);
        setEditingData({
            id: maintenanceData.id,
            name: maintenanceData.name,
            date: maintenanceData.date,
            mechanic: maintenanceData.mechanic,
            parts_cost: maintenanceData.parts_cost,
            labor: maintenanceData.labor,
            notes: maintenanceData.notes,
            vehicleID: maintenanceData.vehicleID 
        })
    }

    function handleSubmit(maintenance)
    {
        const db = getDatabase();
        set(ref(db, 'vehicles/' + maintenance.vehicleID + "/maintenances/" + maintenance.id), {
            id: maintenance.id,
            name: maintenance.name,
            date: maintenance.date,
            mechanic: maintenance.mechanic,
            parts_cost: maintenance.parts_cost,
            labor: maintenance.labor,
            notes: maintenance.notes,
            vehicleID: maintenance.vehicleID
        });

        localStorage.setItem("loadedMaintenance", JSON.stringify({
            id: maintenance.id,
            name: maintenance.name,
            date: maintenance.date,
            mechanic: maintenance.mechanic,
            parts_cost: maintenance.parts_cost,
            labor: maintenance.labor,
            notes: maintenance.notes,
            vehicleID: maintenance.vehicleID
        }));

        setIsEditing(false);
    }
    
    function handleCancelEdit()
    {
        setEditingData(
            {
                id: maintenanceData.id, 
                name: "", 
                date: "", 
                mechanic: "", 
                parts_cost: "", 
                labor: "", 
                notes: "", 
                vehicleID: maintenanceData.vehicleID
            }
        )
        setIsEditing(false);
    }

    return (
        <div>
            <NavBar/>
            <div className = "deleteAndBack">
                <Link to="/vehiclepage"> 
                    <ArrowBackIosNewSharpIcon />
                </Link>
                {
                    auth.currentUser != null & maintenanceData != null?
                    <button onClick = {handleDelete} style = {{backgroundColor: "transparent", borderwidth: "0px", padding: "0px", shadow: "0px", borderWidth: "0px", height: "30px", width: "30px"}}>
                        <img src = {require("../../Images/Delete.png")} style = {{height: "30px", width: "30px", margin: "0px"}}/>
                    </button>
                    :
                        null
                }
            </div>
            { 
                auth.currentUser != null & maintenanceData != null?
                    <div>
                        {isEditing == false ? 
                            <div>
                                <h1>Maintenance Data: {maintenanceData.name}</h1>
                                <div className = "maintenanceDataList">
                                    <p>Date: {maintenanceData.date}</p>
                                    <p>Mechanic: {maintenanceData.mechanic}</p>
                                    <p>Parts Costs: {maintenanceData.parts_cost}</p>
                                    <p>Labor: {maintenanceData.labor}</p>
                                    <p>Notes: {maintenanceData.notes}</p>
                                    <button onClick = {handleStartEdit}> edit </button>
                                </div>
                            </div>
                            :
                            <div>
                                <h1>Editing Maintenance Data...</h1>
                                <div className = "maintenanceDataList">
                                    <div style = {{fontSize: "15px"}}>Name</div>
                                    <input placeholder = "Name..." defaultValue = {maintenanceData.name} onChange = {(event) => setEditingData({...editingData, name: event.target.value})}></input>
                                    <div style = {{fontSize: "15px"}}>Date</div>
                                    <input placeholder = "Date..." defaultValue = {maintenanceData.date} onChange = {(event) => setEditingData({...editingData, date: event.target.value})}></input>
                                    <div style = {{fontSize: "15px"}}>Mechanic</div>
                                    <input placeholder = "Mechanic..." defaultValue = {maintenanceData.mechanic} onChange = {(event) => setEditingData({...editingData, mechanic: event.target.value})}></input>
                                    <div style = {{fontSize: "15px"}}>Cost of Parts</div>
                                    <input placeholder = "Cost of Parts..." defaultValue = {maintenanceData.parts_cost} onChange = {(event) => setEditingData({...editingData, parts_cost: event.target.value})}></input>
                                    <div style = {{fontSize: "15px"}}>Labor hours</div>
                                    <input placeholder = "Labor hours..." defaultValue = {maintenanceData.labor} onChange = {(event) => setEditingData({...editingData, labor: event.target.value})}></input>
                                    <div style = {{fontSize: "15px"}}>Notes</div>
                                    <input placeholder = "Notes..." defaultValue = {maintenanceData.notes} onChange = {(event) => setEditingData({...editingData, notes: event.target.value})}></input>
                                    <div style = {{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                                        <button onClick = {handleCancelEdit}> cancel </button>
                                        <button onClick = {() => handleSubmit(editingData)}> submit </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                :
                    <h1>Please log in in order to view this information!</h1>
            }
        </div>
    )
}
export default MaintenancePage;