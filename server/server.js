const PORT = require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('./database/database');
const cors = require('cors');
//Settings

//Middlewares
//Cors configuration
var corsOptions = {
  'origin': '*',
  'methods': 'GET,HEAD,POST,PUT,DELETE'
}
app.use(cors(corsOptions));
app.use(express.json());


//Routes
app.use('/users', require('./routes/user.routes'));


//Server
app.listen(PORT, () => {
      console.log('Servidor corriendo en el puerto', PORT);
})
