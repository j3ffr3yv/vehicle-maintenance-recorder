import * as React from 'react';
import {useState, Fragment, useEffect, useMemo, useReducer} from 'react';
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
import { getAuth } from "firebase/auth"
import NavBar from "./NavBar"

import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';

import Uploader from '../js/Uploader.js';

const Home = () => {

  const auth = getAuth();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          let data = snapshot.val();

          if (data == null)
          {
            console.log("vehicles does not exist")
            set(ref(db, 'vehicles/'), null)
            data = snapshot.val();
          }
          else {
            Object.values(data).map((curVehicle, k) => {
              newVehicles.push(curVehicle);
            })
          }
          setVehicles(newVehicles); 
      });
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
        mileage: vehicle.mileage,
        maintenances: vehicle.maintenances
      });
  }
  const uponModalClose = (event) => {
    event.preventDefault();
    updateVehicles();
    handleClose();
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
        mileage: addVehicleData.mileage,
        maintenances: []
    }

    setVehicles([...vehicles, newVehicle]);
    writeVehicleData(newVehicle);
    //const newVehicles = [...vehicles, newVehicle];
    console.log(vehicles);
    updateVehicles();
    addVehicleData.setState({
      license: '', 
      state: '',
      vin: '', 
      twf: '', 
      year: '', 
      make: '', 
      model: '', 
      pur_date: '', 
      mileage: ''
    })
  }
  
  function vehicleInfoPage(vehicleInfo) {
    localStorage.setItem("loadedVehicle", JSON.stringify(vehicleInfo));
    //console.log("VEHICLE TO PAGE: " + localStorage.getItem("loadedVehicle"));
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
      mileage,
      maintenances
    } = row.original;

    return (
      <div>
        <Card className='cardwidth'>
          <CardBody>
          < CardTitle>
            <strong>To Vehicle Page&rarr;</strong> <Link to={"/VehiclePage"} onClick = {() => vehicleInfoPage(
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
                  mileageP: mileage,
                  maintenancesP: maintenances
                })}>{twf} {year} {make} {model}</Link>
              {/*<strong>`${make} ${model}` </strong>*/}
            </CardTitle>
            <CardText>
              <strong>License:</strong> {license} <br />
              <strong>State:</strong> {state} <br />
              <strong>VIN:</strong> {vin} <br />
              <strong>TWF:</strong> {twf} <br />
              <strong>Year:</strong> {year} <br />
              <strong>Make:</strong> {make} <br />
              <strong>Model:</strong> {model} <br />
              <strong>Pur_Date:</strong> {pur_date} <br />
              <strong>Mileage:</strong> {' '}
              {`${mileage}`}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => 
        <Button variant="primary" onClick={handleShow} justifyContent='center'>
          Add +
        </Button>,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
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
    ],
    []
  );

  return (
    <div>
      <NavBar/>
      {
        auth.currentUser != null ?
        
          <Container style={{ marginTop: 0 }}>
          {console.log("Rendering")}
          <div>
              <Modal
                show={show}
                onHide={uponModalClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Adding Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                  <h2>Or, upload excel document</h2>
                  <Uploader></Uploader>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={uponModalClose}>
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
          </div>
          <TableContainer
          columns={columns}
          data={vehicles}
          renderRowSubComponent={renderRowSubComponent}
          />
          </Container>
        :
          <h1>Please log in in order to view this information!</h1>
      }
    </div>
  );
};

export default Home;