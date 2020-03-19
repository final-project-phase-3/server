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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUrl = {
  test: "mongodb://localhost:27017/foodTest",
  development: "mongodb://localhost:27017/foodDev"
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

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
