'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Bring in book model
const Book = require('./models/books.js');

const app = express();
app.use(cors());

// ! Don't forget to bring in!
app.use(express.json());

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

//ROUTES & ENDPOINTS
app.get('/', (request, response) => {

  response.status(200).send('Welcome!')

});

// Endpoints to retrieve all books from database

app.get('/books', getBooks);

async function getBooks(request, response, next){
  //TODO: Get all dem books from dat db
  try{
    let allBooks = await Book.find({}); 

    response.status(200).send(allBooks);
    
  } catch(error){
    next(error);
  }
}

// Endpoint to Delete Book

app.delete('/books/:bookID', deleteBook);

async function deleteBook(request, response, next){
  try {
    let id = request.params.bookID;

    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted!')
  } catch (error) {
    next(error);
  }
}

// Add a book
app.post('/books', postBook);

async function postBook(request,response,next){
  try {
    let createdBook = await Book.create(request.body);

    response.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.statusMessage(404).send('Not available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
