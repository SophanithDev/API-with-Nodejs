const cors = require("cors");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.useremail = decoded.email;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
const IsAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      if (decoded.email != "gangmee43@gmail.com") {
        return res.status(401).send({
          message: "Not Admin!",
        });
      }
      req.useremail = decoded.email;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js"); // Create a new Customer
  //Sign Up a new Customer
  app.post("/signupcustomers", customers.signUp);
  // Sign In and get Token
  app.post("/signin", customers.signIn);
  // Retrieve all Customers
  //app.get("/customers", authenticateJWT, customers.findAll);
  app.get("/customers", customers.findAll);
  app.post("/customers", customers.create); // Retrieve all Customers
  //app.get("/customers", cors(corsOptions), IsAdmin, customers.findAll){}; // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne); // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update); // Update a Customer with customerId
  app.delete("/customers/:customerId", customers.delete); // Delete all Customer
  app.delete("/customers", customers.deleteAll);
  //app.use(cors(corsOptions));
};
