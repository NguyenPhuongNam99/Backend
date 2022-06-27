const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGOODB_URL ,() =>  {
    console.log('conect to mogoose db');
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());


//routes
app.use("/v1/auth", auth);
app.use("/v1/user", userRoute)


app.listen(8000, () => {
    console.log('server is running');
})