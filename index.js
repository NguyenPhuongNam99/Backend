const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Grid = require("gridfs-stream");

const auth = require("./routes/auth");
const userRoute = require("./routes/user");
const tour = require("./routes/tour");
const voucher = require("./routes/voucher");
const hotel = require("./routes/hotel");
const restaunrant = require("./routes/restaurant");
const order_tour = require("./routes/orderTour");
const review = require("./routes/review");
const room = require("./routes/room");
const tourSchedule = require("./routes/tourSchedule");
const upload = require("./routes/upload");
const uploadnew = require("./controllers/upload");
const uploadCloudDinary = require("./middlewares/cloudinary");
const cloduinary = require('cloudinary')

// const conn = mongoose.connection;
// conn.once("open", function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("photos");
// })

dotenv.config();

mongoose.connect(
  "mongodb+srv://namnguyen:NGUYENphuongnam1010@atlascluster.cnc8ipm.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    keepAlive: true,
  },
  (err) => {
    if (err) console.log("error new", err);
    else console.log("mongdb is connected");
  }
);
const app = express();
// var appView = app.createServer();

// var conditionalCSRF = function (req, res, next) {
//   //compute needCSRF here as appropriate based on req.path or whatever
//   if (needCSRF) {
//     csrf(req, res, next);
//   } else {
//     next();
//   }
// }

// app.use(conditionalCSRF);

let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // optionSuccessStatus: 200,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    // allowedHeaders: "Authorization,Origin,X-Requested-With,Content-Type,Accept",
  })
);

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000",
// }));

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
app.use("/v1/tourSchedule", tourSchedule);
app.use("/file", upload);

//upload file ckeditor
app.post("/uploadImage", uploadnew.single("upload"), (req, res) => {
  if (req) {
    console.log(req?.file)

    res.status(200).json({
      uploaded: true,
      url: req.file.location,
    });
  } else {
    res.json("An unknown error occurred!");
  }
});

//upload file cloduinary
app.post("/uploadImageCloud", uploadCloudDinary.single("upload"), (req, res) => {
  try {
    console.log('upload image', req.body.upload)
    res.status(200).json({
      uploaded: true,
      url: req?.file?.path,
    });
  } catch (error) {
    console.log("error dinary", error);
    res.status(500).json(error);

  }
});
//upload file cloduinary
app.post("/uploadImageCloudArray", uploadCloudDinary.single("upload"), (req, res) => {
  try {
    console.log('file view', req.file)
    res.status(200).json(req?.file?.path);
  } catch (error) {
    console.log("error dinary", error);
    res.status(500).json(error);
  }
});


//query image upload storage local
// media routes
app.get("/file/:filename", async (req, res) => {
  const file = await gfs.files.findOne({ filename: req.params.filename });
  const readStream = gfs.createReadStream(file.filename);
  readStream.pipe(res);
  try {
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

app.post("/images", uploadCloudDinary.array("upload", 10), async (req, res) => {
  try {
    let pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res.status(400).json({ message: "No picture attached!" });
    //map through images and create a promise array using cloudinary upload function
    let multiplePicturePromise = pictureFiles.map((picture) =>
      cloduinary.v2.uploader.upload(picture.path)
    );
    // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    let imageResponses = await Promise.all(multiplePicturePromise);
    res.status(200).json({ images: imageResponses });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const Port = process.env.PORT || 8080

app.listen(Port, () => {
  console.log("server is running");
});


//1     user admin vào tạo tour ==> chọn cả khách sạn và nhà hàng ==> tổng giá

//created by ?
//thêm tác nhân là nhân viên  ==> nhân viên sẽ là người tạo tour ==> admin là người phê duyệt

//      danh sách hiển thị tour ==> chỉ hiển 1 ảnh đại diện cho địa điểm đó ==>

//2     nhà hàng, khách sạn
//nhà hàng với khách sạn vào tạo nhà hàng, ks cho chính mình ==> thêm sửa xoá

// 3     khách hàng ko cần chọn khách sạn nữa và nhà hàng nữa

//4     mục tab menu icon
// ==> khách hàng ko muốn chọn tour có thể chọn nhà hàng hoặc khách sạn theo ý thích của riêng mình

//5    role: nhân viên ==> username, lastname, first name, role: employee,
//bình thường sẽ là đăng ký mặc định là user
//admin sẽ mặc định có tài khoản

//admin sẽ tạo tài khoản cho employee
