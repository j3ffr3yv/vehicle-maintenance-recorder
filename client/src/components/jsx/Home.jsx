import React, {useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import "../css/Home.css"
import VehicleInfo from './VehicleInfo.jsx'

function Home() {

    const [vehicles, setVehicles] = useState([{id: '001', name: 'Big truck', model: "some kinda big truck"}]);

    return (
        <div>
            <Container>
                <Grid container spacing = {3}>
                    {vehicles.map((curVehicle, index) => {
                        return (
                            <Grid item xs = {12} md = {3}>
                                <VehicleInfo 
                                id = {curVehicle.id}
                                name = {curVehicle.name}
                                model = {curVehicle.model}
                                />
                            </Grid>
                        )
                    })}                  
                </Grid>
            </Container>
        </div>
    )
};

export default Home;