module.exports = app => {
    const productorder = require("../controllers/porder.controller.js"); // Create a new Customer 

    app.post("/productorder", productorder.create); // Retrieve all Customers 
    app.get("/productorder", productorder.findAll); // Retrieve a single Customer with customerId 
    app.get("/productorder/:orderId", productorder.findOne); // Update a Customer with customerId 
    app.put("/productorder/:orderId", productorder.update); // Update a Customer with customerId 
    app.delete("/productorder/:orderId", productorder.delete); // Delete all Customer 
    app.delete("/productorder", productorder.deleteAll);
};