const sql = require("./db.js"); // constructor 
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

const Statement = function (statement) {
    this.email = statement.email;
    this.password = statement.password;
    this.title = statement.title;
    this.satus = statement.satus;
};
Statement.create = (newStatement, result) => {
    sql.query("INSERT INTO statement SET ?", newStatement, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created statement: ", {
            id: res.insertId,
            newStatement
        });
        result(null, {
            id: res.insertId,
            newStatement
        });
    });
};
Statement.findById = (statementId, result) => {
    sql.query(`SELECT * FROM statement WHERE id = ?`, statementId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found statement: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Statement with the id
        result({
            kind: "not_found"
        }, null);
    });
};

Statement.getAll = result => {
    sql.query("SELECT * FROM statement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("statement: ", res);
        result(null, res);
    });
};

Statement.remove = (id, result) => {
    sql.query("DELETE FROM statement WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Statement with the id 
            result({
                kind: "not_found"
            }, null);
            return;
        }
        console.log("deleted statement with id: ", id);
        result(null, res);
    });
};

Statement.removeAll = result => {
    sql.query("DELETE FROM statement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} statement`);
        result(null, res);
    });
};

Statement.updateById = (id, statement, result) => {
    sql.query("UPDATE statement SET email = ?, title = ?, satus = ? WHERE id = ?", [statement.email, statement.title, statement.satus, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Statement with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }
        console.log("updated statement: ", {
            id: id,
            statement
        });
        result(null, {
            id: id,
            statement
        });
    });
};

Statement.signUp = (newStatement, result) => {
    sql.query("SELECT email FROM statement WHERE email = ?", [newStatement.email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Can't Sign up because found statement email: ", res[0]);
            result(null, "Can't Sign up because found statement email: " + res[0].email);
            return;
        }
        if (res.length == 0) {
            sql.query("INSERT INTO statement SET ?", newStatement, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created statement: ", {
                    id: res.insertId,
                    newStatement
                });
                result(null, {
                    id: res.insertId,
                    newStatement
                });
            });
        }
    });
};

Statement.signIn = (card, result) => {
    sql.query("SELECT * FROM statement WHERE email = ? and password = ?", [card.email, card.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            var token = jwt.sign({
                email: res[0].email,
                title: res[0].title
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

module.exports = Statement;