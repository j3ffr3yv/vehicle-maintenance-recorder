import React from 'react';
import "../css/VehicleInfo.css"

const VehicleInfo = (prop) =>
{
    return (
        <div className = "testCell">
            <div>{prop.id}</div>
            <div>{prop.name}</div>
            <div>{prop.model}</div>
        </div>
    )
}

export default VehicleInfo;