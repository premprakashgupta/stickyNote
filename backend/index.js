const express = require("express");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConncetorFunc = require("./dbConnector/dbConnector");
const userRouter = require("./route/userRoute");
const stickyNoteRouter = require("./route/stickyNoteRoute");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  // env for secret key
  require("dotenv").config({ path: "backend/config/config.env" });
}

const app = express();
// database connection
dbConncetorFunc();
// for passing json data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cookie parser for cookie
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, //access-control-allow-credentials:true
      optionSuccessStatus: 200,
    })
  );
} else {
  app.use(cors());
}
app.use("/api/v2/ppg", userRouter);
app.use("/api/v2/ppg", stickyNoteRouter);
// General page render
// app.use("/", (req, res) => {
//   res.send("home");
// });
// port listenning on 4000 if PORT is not available
app.listen(process.env.PORT || 4000, () => {
  console.log(`port is running on 4000`);
});
