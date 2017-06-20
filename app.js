require('dotenv').config();
const twitter = require('twitter');
const config = require('./config.js');

const T = new Twitter(config);
