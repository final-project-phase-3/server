if (
  process.env.NODE_ENV == "test" ||
  process.env.NODE_ENV == "development" ||
  !process.env.NODE_ENV
) {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const server = require("http").Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = {
  test: "mongodb://localhost:27017/foodTest",
  development: "mongodb://localhost:27017/foodDev"
  // development: `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@localhost:27017/foodDev?authMechanism=DEFAULT&authSource=admin`
};

mongoose
  .connect(mongoUrl[process.env.NODE_ENV], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(`connected to database ${mongoUrl[process.env.NODE_ENV]}`);
  });
app.use("/", routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
  });
}

module.exports = app;
