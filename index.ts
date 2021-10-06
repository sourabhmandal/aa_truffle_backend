"use strict";
var cors = require("cors");
import { Request, Response } from "express";
import "reflect-metadata";

const aaRouter = require("./routes/accountAggregator");
const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/aa", aaRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("TRUFFLE SERVICE IS UP");
});


app.listen(process.env["PORT"] || port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
