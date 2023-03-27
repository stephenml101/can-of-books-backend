'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.Mongo_URL);

const Book = require('./models/books.js');

async function seed() {
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  // status: { type: Boolean, required: true } 
  await Book.create({
    title: 'Moby Dick',
    description: 'Captain chases whale until he dies',
    status: true
  });

  console.log('Moby Dick was created!')

  await Book.create({
    title: 'Cat in a Hat',
    description: 'Cat pastors children',
    status: true
  });

  console.log('Cat in dat hat')
  
  await Book.create({
    title: 'The Bible',
    description: 'Jesus is the reason for the season',
    status: true
  });

  console.log('In the beginning...')
  
  mongoose.disconnect();
}

seed();