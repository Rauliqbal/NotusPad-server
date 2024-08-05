require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./config/database");
const userRouter = require("./routes/user");
const noteRouter = require("./routes/note");

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT TO DATABASE
const DB_URI =
  "mongodb+srv://rauliqbal:HxBHdo7aANZQibkm@cluster0.jy3fw27.mongodb.net/db_notuspad?retryWrites=true&w=majority&appName=Cluster0";
// "mongodb://localhost:27017/db_notuspad";
database(DB_URI);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!🌏",
    myWebsite: "https://rauliqbal.my.id",
  });
});

// AUTH ROUTES
app.use("/api", userRouter);
//NOTE ROUTES
app.use("/api", noteRouter);

// RUN SERVER
const port = process.env.NODE_DB_PORT || 3000;
app.listen(port, () =>
  console.log(`SERVER RUNNING:   http://localhost:${port}/`)
);
