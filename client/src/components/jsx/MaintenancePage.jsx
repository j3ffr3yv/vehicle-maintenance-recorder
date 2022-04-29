import React, {useEffect} from "react";
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

    function handleDelete()
    {
        console.log("delete");
        const db = getDatabase();
        remove(ref(db, 'vehicles/' + maintenanceData.vehicleID + "/maintenances/" + maintenanceData.id))
        localStorage.setItem("loadedMaintenance", null);
        maintenanceData = null;
        window.location.href = "/vehiclepage";
        console.log("deleted");
    }

    useEffect(() => {
        if (maintenanceData == null)
        {
            window.location.href = '/'
        }
    })

    return (
        <div>
            <NavBar/>
            <Link to="/vehiclepage"> 
                <ArrowBackIosNewSharpIcon />
            </Link>
            <button onClick = {handleDelete}>
                delete
            </button>
            { 
                auth.currentUser != null ?
                    <div>
                        <h1>Maintenance Data: {maintenanceData.name}</h1>
                        <div className = "maintenanceDataList">
                            <p>{maintenanceData.date}</p>
                            <p>{maintenanceData.mechanic}</p>
                            <p>{maintenanceData.parts_cost}</p>
                            <p>{maintenanceData.labor}</p>
                            <p>{maintenanceData.notes}</p>
                        </div>
                    </div>
                :
                    <h1>Please log in in order to view this information!</h1>
            }
        </div>
    )
}
export default MaintenancePage;