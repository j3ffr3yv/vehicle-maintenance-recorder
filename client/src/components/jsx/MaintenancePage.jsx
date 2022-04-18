import React from "react";
import { getAuth } from "firebase/auth"

const MaintenancePage = () => {

    const auth = getAuth();
    const maintenanceData = JSON.parse(localStorage.getItem("loadedMaintenance"));

    return (
        <div>
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