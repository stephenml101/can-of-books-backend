'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;


//LISTEN

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// Connect MongoDB

mongoose.connect(process.env.Mongo_URL);


// *** HELPFUL FOR TROUBLESHOOTING IN TERMINAL WHY YOU CAN'T CONNECT TO YOUR MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//ROUTES
app.get('/', (request, response) => {

  response.status(200).send('Welcome!')

});

app.get('*', (request, response) => {
  response.statusMessage(404).send('Not available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
