const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors())
app.use(express.json());


app.use('/v1/register/user', require('./rutas/register'))


module.exports = app