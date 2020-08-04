/* Global Variables */
const openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';   // Base URL
const openWeatherMapKey = '&appid=10ea0f9a9318c280943f4169ecf8e22e';            // App Key
let countryCode = ',us';            // Country code i.e, `us`, `uk, `fi`, etc.
let tempUnit = '&units=metric';     // Units are: `metric` (Celsius) or `imperial` (Fahrenheit).

// Create a new date instance dynamically with JS
let d = new Date();
let todayDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


/**
 * @description Generate weather journal based on the zip code from user input.
 */
const generateWeatherJournal = () => {
    let zipCode = document.getElementById('zip').value;
    let userFeeling = document.getElementById('feelings').value;

    if (!zipCode) {
        alert('Please enter a valid zip code');
    } else {
        let weatherMapApiUrl = openWeatherUrl + zipCode + countryCode + tempUnit + openWeatherMapKey;
        getWeatherData(weatherMapApiUrl).then(weatherData => {
            if (weatherData) {
                let data = {
                    temperature: weatherData.main.temp,
                    date: todayDate,
                    userResponse: userFeeling,
                    zipCode: zipCode
                }
                postWeatherData('/add', data).then(responseMsg => {
                    console.log(responseMsg);
                    updateUI(zipCode);
                });
            }
        });
    }

}


// Add event listener on the click of "Generate" button.
document.getElementById('generate').addEventListener('click', generateWeatherJournal);


/**
 * @description Async function to get the weather data for a specific city from OpenWeatherMap.org
 * @param {string} url
 */
const getWeatherData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        if (response.status === 200)    // "OK" (response has no errors)
            return data;
        else
            throw data;                 // throw an exception with the response error
    } catch (error) {
        console.log('error', error);
        alert(`Error (${error.cod}): ${error.message}!`);
    }
}


/**
 * @description Post the combined data (user input data & retrieved one) to the server
 * @param {string} url 
 * @param {object} data - must contain 4 keys: `temperature`, `data`, `userResponse` & `zipCode`
 */
const postWeatherData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const responseText = await response.text();
        console.log(responseText);
    } catch (error) {
        console.log('error', error);
        alert(`Failed to send weather data to the server. ${error.message || error}.`);
    }
}


/**
 * @description Update User Interface with the latest updated data for the current zip code.
 * @param {string | number} zipCode - Entered zip code from the user input
 */
const updateUI = async (zipCode) => {
    const response = await fetch('/all');
    try {
        const data = await response.json();
        const updatedData = data[zipCode];
        document.getElementById('date').innerHTML = updatedData.date;
        document.getElementById('temp').innerHTML = Math.round(updatedData.temperature) + '°C';
        document.getElementById('content').innerHTML = updatedData.userResponse;
    } catch (error) {
        console.log('error', error);
        alert(`Something went wrong while retrieving data from the server. ${error.message || error}.`);
    }
}