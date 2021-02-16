module.exports = app => {
    const departments = require("../controllers/department.controller.js"); // Create a new Customer 

    app.post("/departments", departments.create); // Retrieve all Customers 
    app.get("/departments", departments.findAll); // Retrieve a single Customer with customerId 
    app.get("/departments/:departmentId", departments.findOne); // Update a Customer with customerId 
    app.put("/departments/:departmentId", departments.update); // Update a Customer with customerId 
    app.delete("/departments/:departmentId", departments.delete); // Delete all Customer 
    app.delete("/departments", departments.deleteAll);
};