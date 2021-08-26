const cors = require('cors');
const express = require('express');
const connectDB = require('./db/mongoose');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.config({ path: './config/dev.env' });

app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const userRouter = require('./routers/user.js');

connectDB();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT);
});
