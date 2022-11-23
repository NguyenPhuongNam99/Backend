const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const userRoute = require("./routes/user");
const tour = require("./routes/tour");
const voucher = require("./routes/voucher");
const hotel = require("./routes/hotel");
const restaunrant = require('./routes/restaurant');
const order_tour = require('./routes/orderTour');
const review = require('./routes/review');
const room = require('./routes/room');
const tourSchedule = require('./routes/tourSchedule');

const app = express();
dotenv.config();

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


app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));


app.use(cookieParser());
app.use(express.json());

//routes
app.use("/v1/auth", auth);
app.use("/v1/user", userRoute);
app.use("/v1/tour", tour);
app.use("/v1/voucher", voucher);
app.use("/v1/hotel", hotel);
app.use("/v1/restaurant", restaunrant);
app.use("/v1/orderTour", order_tour);
app.use("/v1/review", review);
app.use("/v1/room", room);
app.use("/v1/tourSchedule", tourSchedule)

app.listen(8000, () => {
  console.log("server is running");
});
