# Weather Journal App

Weather app to get the current temperature based on the ZIP code from user input and post the data with the user feelings to the server.

## Table of Contents
* [Dependencies](#Dependencies)
* [How To Use](#How-To-Use)
* [File Structure](#File-Structure)

## Dependencies
- ### Node JS
Download and install the latest NodeJS version from [NodeJS.org](http://nodejs.org) or check if the NodeJS is installed on your machine by running this command in the CMD: `node -v`.

_Install all other dependencies defined in `Package.json` to avoid install them separately using this command:_
```
npm install
```

- ### Express
We use express to run/serve the app and handle routes and requests.
To install express, run the below command in the project folder:
```
npm install express
```

- ### Body-Parser
This node package is a middle-ware to be used by [Express](#Express).
To install body-parser, run the below command in the project folder:
```
npm install body-parser
```

- ### CORS
This node package is for cross-origin allowance.
To install CORS, run the below command in the project folder:
```
npm install cors
```


## How To Use
Run the server using node
```
node server.js
```

## File Structure
```
website
- images
- app.js
- index.html
- styles.css
server.js
```
- `website` folder containing the client-side code.
- `server.js` this file represents the server-side code.