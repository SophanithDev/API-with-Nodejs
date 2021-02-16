const sql = require("./db.js"); // constructor 
const Department = function (department) {
    // this.email = customer.email;
    this.name = department.name;
    this.location = department.location;
    // this.active = customer.active;
};
Department.create = (newDepartment, result) => {
    sql.query("INSERT INTO departments SET ?", newDepartment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created department: ", {
            id: res.insertId,
            newDepartment
        });
        result(null, {
            id: res.insertId,
            newDepartment
        });
    });
};
Department.findById = (departmentId, result) => {
    sql.query(`SELECT * FROM departments WHERE id = ?`, departmentId, (err, res) => {
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

Department.getAll = result => {
    sql.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("departments: ", res);
        result(null, res);
    });
};

Department.remove = (id, result) => {
    sql.query("DELETE FROM departments WHERE id = ?", id, (err, res) => {
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

Department.removeAll = result => {
    sql.query("DELETE FROM departments", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} departments`);
        result(null, res);
    });
};

Department.updateById = (id, department, result) => {
    sql.query("UPDATE departments SET name = ?, location =? WHERE id = ?", [department.name, department.location, id], (err, res) => {
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
        console.log("updated department: ", {
            id: id,
            department
        });
        result(null, {
            id: id,
            department
        });
    });
};

module.exports = Department;