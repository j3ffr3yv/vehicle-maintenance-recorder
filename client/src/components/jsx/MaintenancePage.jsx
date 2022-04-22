import React from "react";
import { getAuth } from "firebase/auth"
import { Link } from "react-router-dom";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import NavBar from "./NavBar"

const MaintenancePage = () => {

    const auth = getAuth();
    const maintenanceData = JSON.parse(localStorage.getItem("loadedMaintenance"));

    return (
        <div>
            <NavBar/>
            <Link to="/vehiclepage"> 
                <ArrowBackIosNewSharpIcon />
            </Link>
            { 
                auth.currentUser != null ?
                    <div>
                    <p>{maintenanceData.id}</p>
                    <p>{maintenanceData.name}</p>
                    <p>{maintenanceData.date}</p>
                    <p>{maintenanceData.mechanic}</p>
                    <p>{maintenanceData.parts_cost}</p>
                    <p>{maintenanceData.labor}</p>
                    <p>{maintenanceData.notes}</p>
                    </div>
                :
                    <h1>Please log in in order to view this information!</h1>
            }
        </div>
    )
}
export default MaintenancePage;