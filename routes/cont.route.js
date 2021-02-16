module.exports = app => {
    const contacts = require("../controllers/contact.controller.js"); // Create a new Customer 

    app.post("/contacts", contacts.create); // Retrieve all Customers 
    app.get("/contacts", contacts.findAll); // Retrieve a single Customer with customerId 
    app.get("/contacts/:contactId", contacts.findOne); // Update a Customer with customerId 
    app.put("/contacts/:contactId", contacts.update); // Update a Customer with customerId 
    app.delete("/contacts/:contactId", contacts.delete); // Delete all Customer 
    app.delete("/contacts", contacts.deleteAll);
};