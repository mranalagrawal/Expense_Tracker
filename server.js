const express = require('express')
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

// Config Dot Env File
dotenv.config()

// use express
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
//user routes
app.use('/api/v1/users',require('./routes/userRoute'))

// transcation routes
app.use('/api/v1/transcation',require('./routes/transcationRoutes'))


// port
const PORT = 8080 || process.env.PORT;

//database
connectDb()

// listen server

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
