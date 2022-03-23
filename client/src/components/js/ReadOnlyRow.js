import React from "react";
import "../css/ReadOnlyRow.css";

const ReadOnlyRow = ({ vehicle, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{vehicle.license}</td>
      <td>{vehicle.state}</td>
      <td>{vehicle.vin}</td>
      <td>{vehicle.twf}</td>
      <td>{vehicle.year}</td>
      <td>{vehicle.make}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.pur_date}</td>
      <td>{vehicle.mileage}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, vehicle)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(vehicle)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
