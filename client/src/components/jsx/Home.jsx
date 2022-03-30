import * as React from 'react';
import {useState, Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import Input from "@material-ui/core/Input";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import {Container, AppBar, Grow, Grid, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "../css/Home.css"
import { getDatabase, ref, remove, set, onValue } from "firebase/database";
import EditableRow from '../js/EditableRow';
import ReadOnlyRow from '../js/ReadOnlyRow';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  } 
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'license',
    numeric: false,
    disablePadding: true,
    label: 'license',
  },
  {
    id: 'state',
    numeric: true,
    disablePadding: false,
    label: 'state',
  },
  {
    id: 'vin',
    numeric: true,
    disablePadding: false,
    label: 'vin',
  },
  {
    id: 'twf',
    numeric: true,
    disablePadding: false,
    label: 'twf',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'year',
  },
  {
    id: 'make',
    numeric: true,
    disablePadding: false,
    label: 'make',
  },
  {
    id: 'model',
    numeric: true,
    disablePadding: false,
    label: 'model',
  },
  {
    id: 'pur_date',
    numeric: true,
    disablePadding: false,
    label: 'pur_date',
  },
  {
    id: 'mileage',
    numeric: true,
    disablePadding: false,
    label: 'mileage',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


const createData = (name, calories, fat, carbs, protein) => ({
  id: name.replace(" ", "_"),
  name,
  calories,
  fat,
  carbs,
  protein,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = makeStyles;
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};
export default function EnhancedTable() {
  //Table variables
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('twf');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = makeStyles;
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
      set(ref(db, 'vehicles/' + vehicle.twf), {
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

  const handleEditVehicleChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newVehicleData = {...editVehicleData};
      newVehicleData[fieldName] = fieldValue;

      setEditVehicleData(newVehicleData);
  }

  const handleAddVehicleSubmit = (event) => {
      event.preventDefault();

      const newVehicle = {
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

  const handleEditVehicleSubmit = (event) => {
      const db = getDatabase();
      event.preventDefault();

      const editedVehicle = {
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
  const [previous, setPrevious] = React.useState({});

  const onToggleEditMode = id => {
    setRows(state => {
      return vehicles.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = vehicles.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setVehicles(newRows);
  };

  const onRevert = id => {
    const newRows = vehicles.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setVehicles(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
//All new functions for home
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = vehicles.map((n) => n.twf);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - vehicles.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader aria-label="sticky table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={vehicles.length}
            />
            <TableBody>
              {}
              {stableSort(vehicles, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.twf}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" className={classes.selectTableCell}>
                        {row.isEditMode ? (
                          <>
                            <IconButton
                              aria-label="done"
                              onClick={() => onToggleEditMode(row.id)}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton
                              aria-label="revert"
                              onClick={() => onRevert(row.id)}
                            >
                              <RevertIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            aria-label="delete"
                            onClick={() => onToggleEditMode(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.license}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.vin}</TableCell>
                      <TableCell align="right">{row.twf}</TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.make}</TableCell>
                      <TableCell align="right">{row.model}</TableCell>
                      <TableCell align="right">{row.pur_date}</TableCell>
                      <TableCell align="right">{row.mileage}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={vehicles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
/*
import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (name, calories, fat, carbs, protein) => ({
  id: name.replace(" ", "_"),
  name,
  calories,
  fat,
  carbs,
  protein,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function App() {
  const [rows, setRows] = React.useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0)
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A barbone structure table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Dessert (100g serving)</TableCell>
            <TableCell align="left">Calories</TableCell>
            <TableCell align="left">Fat&nbsp;(g)</TableCell>
            <TableCell align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell align="left">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "calories", onChange }} />
              <CustomTableCell {...{ row, name: "fat", onChange }} />
              <CustomTableCell {...{ row, name: "carbs", onChange }} />
              <CustomTableCell {...{ row, name: "protein", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);







    return (
        <div className = "MainDisplay">
        <div className = "addVehicle">
                <h2>Add a Vehicle</h2>
                <form onSubmit={handleAddVehicleSubmit}>
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
                    name="license"
                    required="required"
                    placeholder="License: "
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

            <div className = "displayVehicles">
                <form onSubmit={handleEditVehicleSubmit}>
                    <table id = "vehicles_table" class = "display">
                        <thead>
                            <tr>
                            <th>State</th>
                            <th>License</th>
                            <th>Vin</th>
                            <th>Twf</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Pur Date</th>
                            <th>Mileage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((curVehicle) => {
                                return (
                                    <Fragment key = {curVehicle.id}>
                                        {editVehicleID === curVehicle.id ? (
                                        <EditableRow
                                            editVehicleData={editVehicleData}
                                            handleEditVehicleChange={handleEditVehicleChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                        ) : (
                                        <ReadOnlyRow
                                            vehicle={curVehicle}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                        )}
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
};

export default Home;
*/