const express = require("express");
const app = express();
const axios = require("axios");
var strava = require('./strava.js');
const fs = require('fs');

require('dotenv').config();


let rawdata = fs.readFileSync('data.json');
let runs_data = JSON.parse(rawdata);

console.log(runs_data);

const PORT = 8000;

app.get("/strava_runs", async (req, res) => {
    // const response = await strava();
    res.json(runs_data)
});


app.get("/strava", async (req, res) => {
    let axiosConfig = {
        headers: {
            "Accept" : "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    }

    const postData = {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: process.env.STRAVA_AUTH_CODE,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: "authorization_code"
    }

    try {

        // const reauthorizeResponse = await axios.post("https://www.strava.com/oauth/token", postData, axiosConfig)

        const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + "0af2984d6ebbb4c8d472680d38f1151daa064769" // reauthorizeResponse.data.access_token
        };

        fetch("https://www.strava.com/api/v3/athlete/activities?per_page=60&page=1", {
            method: 'GET',
            headers: headers
        }).then(responses => {
            console.log(responses)
            return responses.json();
        }).then(
            strava0 => {
                console.log("Activities");
                console.log(strava0);
            });

        /*
        const stravaResponse = await axios.get("https://www.strava.com/api/v3/athlete/activities?per_page=1&page=60", {
            // method: "GET",
            headers: headers
        })*/

        /*
        const { count, distance } = stravaResponse.data.recent_run_totals
        const movingTime = stravaResponse.data.recent_run_totals.movingTime */

        return res.status(200)
    }
    catch (err) {
        console.log(err)
    }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))