"use strict";
var cors = require("cors");
import "reflect-metadata";

import { aaRouter } from "./routes/accountAggregator";
const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/aa", aaRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
