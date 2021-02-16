const sql = require("./db.js"); // constructor 
const Test = function (test) {
    this.name = test.name;
    // this.location = department.location;
    this.cost = test.cost;
    // this.active = customer.active;
};
Test.create = (newTest, result) => {
    sql.query("INSERT INTO test1 SET ?", newTest, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created test: ", {
            id: res.insertId,
            newTest
        });
        result(null, {
            id: res.insertId,
            newTest
        });
    });
};
Test.findById = (testId, result) => {
    sql.query(`SELECT * FROM test1 WHERE id = ?`, testId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found test1: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Customer with the id
        result({
            kind: "not_found"
        }, null);
    });
};

Test.getAll = result => {
    sql.query("SELECT * FROM test1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("test1: ", res);
        result(null, res);
    });
};

Test.remove = (id, result) => {
    sql.query("DELETE FROM test1 WHERE id = ?", id, (err, res) => {
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

Test.removeAll = result => {
    sql.query("DELETE FROM test1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} test1`);
        result(null, res);
    });
};

Test.updateById = (id, test, result) => {
    sql.query("UPDATE test1 SET name = ?,cost=? WHERE id = ?", [test.name, test.cost, id], (err, res) => {
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
            test
        });
        result(null, {
            id: id,
            test
        });
    });
};

module.exports = Test;