import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';



function App() {

    const [runs, setRuns] = useState([{}]);

    useEffect(() => {
        fetch("/strava_runs").then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                setRuns(data.runs_data)
            }
        )
    }, []);

    return (
        <div className='page'>
            <Grid className="container" container spacing={2} justifyContent="flex-start">
                {(typeof runs === "undefined") ? (
                    <p>Loading ...</p>
                ) : (
                    runs.map((run, i) => (
                        <Grid item className='grid-element' xs={2} key={i} >
                            <div>{(run.distance / 1000).toFixed(2)}</div>
                        </Grid>
                    ))
                )}
            </Grid>

        </div>
    )
}

// <Grid classname="container" container spacing={2} justifyContent="flex-start">

export default App