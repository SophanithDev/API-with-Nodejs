const Department = require("../models/department.model.js");

exports.create = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Department
    const department = new Department({
        // email: req.body.email,
        name: req.body.name,
        location: req.body.location,
        // active: req.body.active
    });
    // Save Department in the database 
    Department.create(department, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while creating the Department."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving departments."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Department.findById(req.params.departmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found department with id ${req.params.departmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving department with id " + req.params.departmentId
                });
            }
        } else res.send(data);
    })
};

exports.delete = (req, res) => {
    Department.remove(req.params.departmentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found department with id ${req.params.departmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete department with id " + req.params.departmentId
                });
            }
        } else res.send({
            message: `Department was deleted successfully!`
        });
    });
};

exports.deleteAll = (req, res) => {
    Department.removeAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while removing all departments."
        });
        else res.send({
            message: `All departments were deleted successfully!`
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
    Department.updateById(req.params.departmentId, new Department(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Department with id ${req.params.departmentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Department with id " + req.params.departmentId
                });
            }
        } else res.send(data);
    });
};