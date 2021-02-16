const express = require("express");
const bodyParser = require("body-parser");
//const fs = require("fs");
const dt = require("./module.js");
const app = express();
const fileupload = require("./module.js");
//const basicAuth = require('express-basic-auth');

//Upload File to directory
app.post("/upload", fileupload.upload.single("file"), function (req, res) {
  console.log(req.file);
  res.json({
    message:
      "Upload file " +
      req.file.originalname +
      " and Change file name to " +
      req.file.filename,
  });
});

// basic authentication
// app.use(basicAuth({
//     users: {
//         'admin': 'abcd'
//     }
// }))

// const test = require("./models/db.js")

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// simple route
require("./routes/customer.route.js")(app);
require("./routes/dept.route.js")(app);
require("./routes/cont.route.js")(app);
require("./routes/test.route.js")(app);
require("./routes/porder.route.js")(app);
require("./routes/st.route.js")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to first application." + dt.myDateTime(),
  });

  // fs.appendFile('myfile.txt', 'This is my text!', function(err){
  //     if (err) throw err;
  //     console.log('updated!');
  // });

  // fs.writeFile('myfile.txt', 'This is my text!', function(err){
  //     if (err) throw err;
  //     console.log('saved!');
  // });

  // fs.unlink('myfile.txt',  function(err){
  //     if (err) throw err;
  //     console.log('File deleted!');
  // });
});

app.get("/test", (req, res) => {
  res.json({
    message: "Welcome to My NodeJS " + dt.myDateTime(),
  });
});

// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
