const { PORT } = require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('./database/database');
const cors = require('cors');
const routes = require('./routes/routes.routes');
const fileUpload = require('express-fileupload');
//Settings

//Middlewares


//Cors configuration
var corsOptions = {
  'origin': '*',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

//Routes
app.use('/api', routes); // Application routes array

//Server
app.listen(PORT, () => {
      console.log('Servidor corriendo en el puerto', PORT);
})
