const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

const tracksRouter = require('./controllers/tracks.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//== middleware ============================================

app.use(express.json());
app.use(logger('dev'));

app.use('/tracks', tracksRouter);

//==========================================================

// Routes go here






//==========================================================

app.listen(3000, () => {
  console.log('The express app is ready!');
});
