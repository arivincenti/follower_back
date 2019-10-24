const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/follower";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("Base de datos conectada");
  })
  .catch(err => {
    console.log(err);
  });

  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindeAndModify', false);

  module.exports = mongoose;