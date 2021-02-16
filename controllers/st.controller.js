const Statement = require("../models/st.model.js");
const md5 = require('md5')

exports.create = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Statement 
    const statement = new Statement({
        email: req.body.email,
        password: md5(req.body.password),
        title: req.body.title,
        satus: req.body.satus
    });
    // Save Statement in the database 
    Statement.create(statement, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while creating the Statement."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Statement.getAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while retrieving statements."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Statement.findById(req.params.statementId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Statement with id ${req.params.statementId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Statement with id " + req.params.statementId
                });
            }
        } else res.send(data);
    })
};

exports.delete = (req, res) => {
    Statement.remove(req.params.statementId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Statement with id ${req.params.statementId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Statement with id " + req.params.statementId
                });
            }
        } else res.send({
            message: `Statement was deleted successfully!`
        });
    });
};

exports.deleteAll = (req, res) => {
    Statement.removeAll((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while removing all statements."
        });
        else res.send({
            message: `All Statements were deleted successfully!`
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
    Statement.updateById(req.params.statementId, new Statement(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Statement with id ${req.params.statementId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Statement with id " + req.params.statementId
                });
            }
        } else res.send(data);
    });
};

exports.signUp = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } // Create a Statement 
    const statement = new Statement({
        email: req.body.email,
        password: md5(req.body.password),
        title: req.body.title,
        satus: req.body.satus
    }); // Save Statement in the database 
    Statement.signUp(statement, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while creating the Statement."
        });
        else res.send(data);
    });
};

exports.signIn = (req, res) => {
    // Validate request 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const card = {
        email: req.body.email,
        password: md5(req.body.password),
    };
    Statement.signIn(card, (err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occurred while Sign In."
        });
        else res.send(data);
    });
};