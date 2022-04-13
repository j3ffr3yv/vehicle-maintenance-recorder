import * as React from 'react';
import {useState, Fragment, useEffect, useMemo} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Input from "@material-ui/core/Input";
import { makeStyles } from '@material-ui/core/styles';
import "../css/Home.css"
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from '../js/TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from '../js/Filter.js';
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Home = () => {
  //Vehicles
  const [vehicles, setVehicles] = useState([]);
  //AddVehicleData
  const [addVehicleData, setAddVehicleData] = useState({
      license: "",
      state: "",
      vin: "",
      twf: "",
      year: "",
      make: "",
      model: "",
      pur_date: "",
      mileage: "",
  })
  //editVehicleData
  const [editVehicleData, setEditVehicleData] = useState({
      license: "",
      state: "",
      vin: "",
      twf: "",
      year: "",
      make: "",
      model: "",
      pur_date: "",
      mileage: "",
  });
  //editVehicleID and Dependency
  const [editVehicleID, setEditVehicleID] = useState(null);
  const [dependency, setDependency] = useState(true);
  //UseEffect
    useEffect(() => {
      updateVehicles();
  }, [])
  //All original functions for home page.
  const updateVehicles = () =>
  {
      console.log("vehicles updated");
      const db = getDatabase();
      const starCountRef = ref(db, 'vehicles/');
      var newVehicles = [];

      onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          Object.values(data).map((curVehicle, k) => {
              newVehicles.push(curVehicle);
          })
      });

      setVehicles(newVehicles); 
  }
  const writeVehicleData = (vehicle) => {
      const db = getDatabase();
      set(ref(db, 'vehicles/' + vehicle.id), {
        id: vehicle.id,
        license: vehicle.license, 
        state: vehicle.state,
        vin: vehicle.vin, 
        twf: vehicle.twf, 
        year: vehicle.year, 
        make: vehicle.make, 
        model: vehicle.model, 
        pur_date: vehicle.pur_date, 
        mileage: vehicle.mileage
      });
  }
  const handleAddVehicleChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newVehicleData = {...addVehicleData};
      newVehicleData[fieldName] = fieldValue;

      setAddVehicleData(newVehicleData);
  }
  const handleAddVehicleSubmit = (event) => {
    event.preventDefault();

    const newVehicle = {
        id: nanoid(),
        license: addVehicleData.license, 
        state: addVehicleData.state,
        vin: addVehicleData.vin, 
        twf: addVehicleData.twf, 
        year: addVehicleData.year, 
        make: addVehicleData.make, 
        model: addVehicleData.model, 
        pur_date: addVehicleData.pur_date, 
        mileage: addVehicleData.mileage
    }

    writeVehicleData(newVehicle);
    const newVehicles = [...vehicles, newVehicle];
    setVehicles(newVehicles);
  }
  const handleEditVehicleChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newVehicleData = {...editVehicleData};
      newVehicleData[fieldName] = fieldValue;

      setEditVehicleData(newVehicleData);
  }
  const handleEditVehicleSubmit = (event) => {
      const db = getDatabase();
      event.preventDefault();

      const editedVehicle = {
          id: editVehicleID,
          license: editVehicleData.license, 
          state: editVehicleData.state,
          vin: editVehicleData.vin, 
          twf: editVehicleData.twf, 
          year: editVehicleData.year, 
          make: editVehicleData.make, 
          model: editVehicleData.model, 
          pur_date: editVehicleData.pur_date, 
          mileage: editVehicleData.mileage
      }

      const newVehicles = [...vehicles];
      const index = vehicles.findIndex((vehicleI) => vehicleI.twf = editedVehicle.twf);

      newVehicles[index] = editedVehicle;

      writeVehicleData(editedVehicle);
      setVehicles(newVehicles);
      setEditVehicleID(null);
  }
  const handleEditClick = (event, v) => {
      event.preventDefault();
      setEditVehicleID(v.id);

      const vehicleValues = {
          license: v.license, 
          state: v.state,
          vin: v.vin, 
          twf: v.twf, 
          year: v.year, 
          make: v.make, 
          model: v.model, 
          pur_date: v.pur_date, 
          mileage: v.mileage
      }

      setEditVehicleData(vehicleValues);
  }
  const handleCancelClick = () => {
      setEditVehicleID(null);
  }
  const handleDeleteClick = (vehicle) => {
      const db = getDatabase();
      const newVehicles = [...vehicles];

      const index = vehicles.findIndex((vehicleI) => vehicleI.twf = vehicle.twf);
      newVehicles.splice(index, 1);

      remove(ref(db, 'vehicles/' + vehicle.twf));
      setVehicles(newVehicles);
  }
  
  function vehicleInfoPage(vehicleInfo) {
    localStorage.setItem("loadedVehicle", JSON.stringify(vehicleInfo));
    console.log("VEHICLE TO PAGE: " + localStorage.getItem("loadedVehicle"));
  }

  const renderRowSubComponent = (row) => {
    const {
      id,
      license,
      state,
      vin,
      twf,
      year,
      make,
      model,
      pur_date,
      mileage
    } = row.original;

    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardBody>
          <CardTitle>
            <Link to={"/newpage"} onClick = {() => vehicleInfoPage(
              {
                idP: id,
                licenseP: license, 
                stateP: state, 
                vinP: vin, 
                twfP: twf, 
                yearP: year, 
                makeP: make, 
                modelP: model, 
                pur_dateP: pur_date, 
                mileageP: mileage
              })}>{make} {model}</Link>
            {/*<strong>`${make} ${model}` </strong>*/}
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {pur_date} <br />
            <strong>Address:</strong>{' '}
            {`${license} ${state} - ${vin} - ${twf}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: 'LICENSE',
        accessor: 'license',
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'STATE',
        accessor: 'state',
      },
      {
        Header: 'VIN',
        accessor: 'vin',
      },
      {
        Header: 'TWF',
        accessor: 'twf',
      },
      {
        Header: 'YEAR',
        accessor: 'year',
      },
      {
        Header: 'MAKE',
        accessor: 'make',
      },
      {
        Header: 'MODEL',
        accessor: 'model',
      },
      {
        Header: 'PUR_DATE',
        accessor: 'pur_date',
      },
      {
        Header: 'MILEAGE',
        accessor: 'mileage',
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 0 }}>
      <div className = "addVehicle">
                <h2>Add a Vehicle</h2>
                <form onSubmit={handleAddVehicleSubmit}>
                    <input
                    className = "inputAdd"
                    type="text"
                    name="license"
                    required="required"
                    placeholder="License: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="state"
                    required="required"
                    placeholder="State: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="vin"
                    required="required"
                    placeholder="Vin: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="twf"
                    required="required"
                    placeholder="Twf: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="year"
                    required="required"
                    placeholder="Year: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="make"
                    required="required"
                    placeholder="Make: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    className = "inputAdd"
                    type="text"
                    name="model"
                    required="required"
                    placeholder="Model: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    type="text"
                    className = "inputAdd"
                    name="pur_date"
                    required="required"
                    placeholder="Pur_date: "
                    onChange={handleAddVehicleChange}
                    />
                    <input
                    type="text"
                    className = "inputAdd"
                    name="mileage"
                    required="required"
                    placeholder="Mileage: "
                    onChange={handleAddVehicleChange}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
      <TableContainer
        columns={columns}
        data={vehicles}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Container>
  );
};

export default Home;