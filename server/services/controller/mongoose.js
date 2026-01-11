const session = require("express-session");
const mongoose = require("mongoose");
const { CheckConnection } = require("../../services/repository/Database");
const MongoDBSession = require("connect-mongodb-session")(session);
const dbconnect = require("../../services/repository/dbconnect");
const MONGO_URI = process.env._MONGO_URI;
const SESSION_COLLECTION = process.env._SESSION_COLLECTION;


exports.SetMongo = (app) => {
  //mongodb
  mongoose.connect(MONGO_URI).then((res) => {
    console.log("MongoDB Connected!");
  });

  const store = new MongoDBSession({
    uri: MONGO_URI,
    collection: SESSION_COLLECTION,
  });

  //Session
  app.use(
    session({
      secret: "5L Secret Key",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  );

  //Check SQL Connection
  CheckConnection();
  dbconnect.CheckConnection();
};
