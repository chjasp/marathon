const axios = require("axios");
require('dotenv').config();

var url = "https://www.strava.com/api/v3/athlete/activities"

const reqOptions = {
    headers: {
        "Authorization": `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`
    }
};

/*
console.log(process.env.STRAVA_ACCESS_TOKEN);

async function l () {
    const response = await axios.get(url, reqOptions);
    const runs = response.data.filter(activity => activity.type = "Run");
    console.log(runs)
    return runs
};

l();
*/

module.exports = async () => {
    const response = await axios.get(url, reqOptions);
    const runs = response.data.filter(activity => activity.type = "Run");
    console.log(runs)
    return runs
}