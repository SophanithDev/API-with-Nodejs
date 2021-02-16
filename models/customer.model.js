const sql = require("./db.js"); // constructor 
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

const Customer = function (customer) {
    this.email = customer.email;
    this.password = customer.password;
    this.name = customer.name;
    this.active = customer.active;
};
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created customer: ", {
            id: res.insertId,
            newCustomer
        });
        result(null, {
            id: res.insertId,
            newCustomer
        });
    });
};
Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ?`, customerId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("customers: ", res);
        result(null, res);
    });
};

Customer.remove = (id, result) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Customer with the id 
            result({
                kind: "not_found"
            }, null);
            return;
        }
        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?", [customer.email, customer.name, customer.active, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }
        console.log("updated customer: ", {
            id: id,
            customer
        });
        result(null, {
            id: id,
            customer
        });
    });
};

Customer.signUp = (newCustomer, result) => {
    sql.query("SELECT email FROM customers WHERE email = ?", [newCustomer.email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Can't Sign up because found customer email: ", res[0]);
            result(null, "Can't Sign up because found customer email: " + res[0].email);
            return;
        }
        if (res.length == 0) {
            sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created customer: ", {
                    id: res.insertId,
                    newCustomer
                });
                result(null, {
                    id: res.insertId,
                    newCustomer
                });
            });
        }
    });
};

Customer.signIn = (account, result) => {
    sql.query("SELECT * FROM customers WHERE email = ? and password = ?", [account.email, account.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            var token = jwt.sign({
                email: res[0].email,
                name: res[0].name
            }, authConfig.secret, {
                expiresIn: 86400 // 24 hours 
            });
            console.log("Token: ", token);
            result(null, token);
            return;
        }
        result({
            kind: "user_not_found"
        }, null);
    });
};

module.exports = Customer;