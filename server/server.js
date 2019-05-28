const express = require('express');
const app = express();
const logger = require('morgan');
const userRoutes = require('./routes/user');
require('./config/connection');


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require('cookie-parser')(process.env.SECRET));
app.use(logger('dev'));

app.use('/users', userRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log('express app listening');
});