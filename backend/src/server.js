const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

server.use(require('./routes'));
server.listen(3333);