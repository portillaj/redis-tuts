const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
console.log(PORT);
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

//make reuqest to github for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching data....');
    const { username } = req.params;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    res.send(data);
  } catch(err) {
    console.error(err);
    res.status(500);
  }
}

app.get('/repos/:username', getRepos);

app.listen(() => {
  console.log(`App listening on port ${PORT}`);
});