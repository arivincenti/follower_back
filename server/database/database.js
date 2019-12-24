const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/follower";
const URI = "mongodb+srv://follower:amFjt2afBZ4wj5ru@cluster0-jfhtw.mongodb.net/follower?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("Base de datos conectada");
  })
  .catch(err => {
    console.log(err);
  });

  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true)
