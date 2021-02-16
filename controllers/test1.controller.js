const Test = require("../models/test1.model.js");

exports.create = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Contact
    const test = new Test({
        name: req.body.name,
        cost: req.body.cost,
        // town: req.body.town,
    });
    // Save Contact in the database 
    Test.create(test, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while creating the Contactt."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Test.getAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving Contacts."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Test.findById(req.params.testId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.testId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving test1 with id " + req.params.testId
                });
            }
        } else res.send(data);
    })
};

exports.delete = (req, res) => {
    Test.remove(req.params.testId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.testId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete test1 with id " + req.params.testId
                });
            }
        } else res.send({
            message: `Test1 was deleted successfully!`
        });
    });
};

exports.deleteAll = (req, res) => {
    Test.removeAll((err, data) => {
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
    Test.updateById(req.params.testId, new Test(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found test1 with id ${req.params.testId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating test1 with id " + req.params.testId
                });
            }
        } else res.send(data);
    });
};