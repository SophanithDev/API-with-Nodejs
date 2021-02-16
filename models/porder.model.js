const sql = require("./db.js"); // constructor 
const Order = function (order) {

    // this.location = department.location;
    // this.cost = order.cost;
    this.details = order.details;
    this.amount = order.amount;
    // this.active = customer.active;
};
Order.create = (newTest, result) => {
    sql.query("INSERT INTO productorder SET ?", newTest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created order: ", {
            id: res.insertId,
            newTest
        });
        result(null, {
            id: res.insertId,
            newTest
        });
    });
};
Order.findById = (orderId, result) => {
    sql.query(`SELECT * FROM productorder WHERE id = ?`, orderId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found productorder: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};

Order.getAll = result => {
    sql.query("SELECT * FROM productorder", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("productorder: ", res);
        result(null, res);
    });
};

Order.remove = (id, result) => {
    sql.query("DELETE FROM productorder WHERE id = ?", id, (err, res) => {
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
        console.log("deleted contact with id: ", id);
        result(null, res);
    });
};

Order.removeAll = result => {
    sql.query("DELETE FROM productorder", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} productorder`);
        result(null, res);
    });
};

Order.updateById = (id, order, result) => {
    sql.query("UPDATE productorder SET details = ?,amount=? WHERE id = ?", [order.details, order.amount, id], (err, res) => {
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
        console.log("updated contact: ", {
            id: id,
            order
        });
        result(null, {
            id: id,
            order
        });
    });
};

module.exports = Order;