const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require("morgan");
const connectDb = require("../config/dbConnection");
const dotenv = require("dotenv").config();
const router = require("./routes");

require("../helpers/generateKey");


connectDb().then(r => console.log("Connect to database successfully")).catch(err => console.log(err));

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router.routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
