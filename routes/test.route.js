module.exports = app => {
    const test1 = require("../controllers/test1.controller.js"); // Create a new Customer 

    app.post("/test1", test1.create); // Retrieve all Customers 
    app.get("/test1", test1.findAll); // Retrieve a single Customer with customerId 
    app.get("/test1/:testId", test1.findOne); // Update a Customer with customerId 
    app.put("/test1/:testId", test1.update); // Update a Customer with customerId 
    app.delete("/test1/:testId", test1.delete); // Delete all Customer 
    app.delete("/test1", test1.deleteAll);
};