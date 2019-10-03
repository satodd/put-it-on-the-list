const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const router = require('./route.js')

const API_PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/shows', router);


// this is our MongoDB database
const dbRoute =
  'mongodb+srv://sarah:1tAEGqU305qAFyzi@cluster0-j7ain.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
db.on('error', console.error.bind(console, 'Database Connection error:'));


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));