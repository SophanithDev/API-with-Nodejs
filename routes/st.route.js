const cors = require("cors");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
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
        const token = authHeader.split(' ')[1];
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            if (decoded.email != "gangmee43@gmail.com") {
                return res.status(401).send({
                    message: "Not Admin!"
                });
            }
            req.useremail = decoded.email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
module.exports = app => {
    const st = require("../controllers/st.controller.js"); // Create a new Customer 
    //Sign Up a new Customer
    app.post("/signupst", st.signUp);
    // Sign In and get Token 
    app.post("/signinst", st.signIn);
    // Retrieve all Customers 
    //app.get("/st", authenticateJWT, st.findAll);
    app.get("/st", st.findAll);
    app.post("/st", st.create); // Retrieve all Customers 
    //app.get("/st", cors(corsOptions), IsAdmin, st.findAll){}; // Retrieve a single Customer with statementId 
    app.get("/st/:statementId", st.findOne); // Update a Customer with statementId 
    app.put("/st/:statementId", st.update); // Update a Customer with statementId 
    app.delete("/st/:statementId", st.delete); // Delete all Customer 
    app.delete("/st", st.deleteAll);
    //app.use(cors(corsOptions))
};