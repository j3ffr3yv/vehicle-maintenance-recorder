import React from "react";

const MaintenancePage = () => {

    const maintenanceData = JSON.parse(localStorage.getItem("loadedMaintenance"));

    return (
        <div>
            <p>{maintenanceData.id}</p>
            <p>{maintenanceData.name}</p>
            <p>{maintenanceData.date}</p>
            <p>{maintenanceData.mechanic}</p>
            <p>{maintenanceData.parts_cost}</p>
            <p>{maintenanceData.labor}</p>
            <p>{maintenanceData.notes}</p>
        </div>
    )
}
export default MaintenancePage;