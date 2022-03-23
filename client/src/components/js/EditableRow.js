import React from "react";
import "../css/EditableRow.css";

const EditableRow = ({
  editVehicleData,
  handleEditVehicleChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="License: "
          name="license"
          value={editVehicleData.license}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="State: "
          name="state"
          value={editVehicleData.state}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Vin: "
          name="vin"
          value={editVehicleData.vin}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Twf: "
          name="twf"
          value={editVehicleData.twf}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Year: "
          name="year"
          value={editVehicleData.year}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Make: "
          name="make"
          value={editVehicleData.make}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Model: "
          name="model"
          value={editVehicleData.model}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Pur_date: "
          name="pur_date"
          value={editVehicleData.pur_date}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          className = "inputEdit"
          required="required"
          placeholder="Mileage: "
          name="mileage"
          value={editVehicleData.mileage}
          onChange={handleEditVehicleChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
