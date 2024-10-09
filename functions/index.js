const functions = require('firebase-functions'); // import firebase functions
const express = require('express'); // import express framework
const fetch = require('node-fetch'); // import node-fetch to make http requests
const cors = require('cors'); // import cors to allow cross-origin requests
const path = require('path'); // import path to work with file and directory paths
require('dotenv').config(); // load environment variables from .env file

const app = express(); // initialize express app

app.use(cors()); // enable cors for all routes

// route to get repositories of a github user
app.get('/api/github/:user/repos', async (req, res) => {
  const { user } = req.params; // get the github username from request parameters
  const specificRepos = req.query.repos ? req.query.repos.split(',') : []; // get specific repos if provided in the query, otherwise an empty array

  try {
    // fetch user repos from github api
    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PAT}`, // authenticate using personal access token from environment variables
        'Accept': 'application/vnd.github.v3+json', // specify github api version
      },
    });

    if (!response.ok) {
      console.error('Response not OK:', await response.text()); // log error response
      throw new Error(`Failed to fetch: ${response.statusText}`); // throw an error if fetch fails
    }

    let data = await response.json(); // parse json response data

    // filter repos based on specificRepos array if provided
    if (specificRepos.length > 0) {
      data = data.filter(repo => specificRepos.includes(repo.name));
    } else {
      if (user === 'astro0725') {
        const excludedRepos = ['will-you', 'portfolio', 'student-portfolio-css', 'astro0725', 'spawn-point', 'PixelPals', 'prework-study-guide', 'horiseon-refactor-challenge'];
        data = data.filter(repo => !excludedRepos.includes(repo.name));
      }
    }

    res.json(data); // send filtered data back to client as json
  } catch (error) {
    console.error(error); // log error
    res.status(500).send('Server error'); // send server error status
  }
});

// route to get readme file for a specific repo
app.get('/api/github/:user/:repoName/readme', async (req, res) => {
  const { user, repoName } = req.params; // get github username and repo name from request parameters
  try {
    // fetch readme file from github api
    const response = await fetch(`https://api.github.com/repos/${user}/${repoName}/readme`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PAT}`, // authenticate using personal access token from environment variables
        'Accept': 'application/vnd.github+json', // specify github api version
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch README: ${response.statusText}`);
    const data = await response.json(); // parse json response data
    res.json(data); // send readme data back to client as json
  } catch (error) {
    console.error('Error fetching README:', error); // log error
    res.status(500).send('Server error'); // send server error status
  }
});

// serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// catch-all route to send index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html')); // serve index.html file for client-side routing
});

// export the express app as a firebase function
exports.api = functions.https.onRequest(app);