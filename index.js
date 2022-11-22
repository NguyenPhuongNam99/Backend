const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const userRoute = require("./routes/user");

const app = express();
dotenv.config();

// mongoose.connect(process.env.MONGOODB_URL ,() =>  {
//     console.log('conect to mogoose db222');
// })
mongoose.connect(
  'mongodb+srv://namnguyen:NGUYENphuongnam1010@atlascluster.cnc8ipm.mongodb.net/?retryWrites=true&w=majority',{
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 75000,
  keepAlive: true,
},
  (err) => {
   if(err) console.log('error new', err) 
   else console.log("mongdb is connected");
  }
);


// app.use(cors());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));


app.use(cookieParser());
app.use(express.json());

//routes
app.use("/v1/auth", auth);
app.use("/v1/user", userRoute);

app.listen(8000, () => {
  console.log("server is running");
});
