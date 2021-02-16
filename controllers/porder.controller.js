const Order = require("../models/porder.model.js");

exports.create = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Contact
    const order = new Order({
        details: req.body.details,
        amount: req.body.amount,
        // town: req.body.town,
    });
    // Save Contact in the database 
    Order.create(order, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while creating the Contactt."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving Contacts."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving test1 with id " + req.params.orderId
                });
            }
        } else res.send(data);
    })
};

exports.delete = (req, res) => {
    Order.remove(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete test1 with id " + req.params.orderId
                });
            }
        } else res.send({
            message: `Order1 was deleted successfully!`
        });
    });
};

exports.deleteAll = (req, res) => {
    Order.removeAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while removing all contacts."
        });
        else res.send({
            message: `All contacts were deleted successfully!`
        });
    });
};

exports.update = (req, res) => {
    // Validate Request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Order.updateById(req.params.orderId, new Order(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating test1 with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
};