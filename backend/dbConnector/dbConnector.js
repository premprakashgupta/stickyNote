const mongoose = require("mongoose");

const dbConncetorFunc = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected mongo"))
    .catch((e) => console.log(e));
};

module.exports = dbConncetorFunc;
