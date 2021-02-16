const sql = require("./db.js"); // constructor 
const Contact = function (contact) {
    this.name = contact.name;
    // this.location = department.location;
    this.email = contact.email;
    this.town = contact.town;
    // this.active = customer.active;
};
Contact.create = (newContact, result) => {
    sql.query("INSERT INTO contacts SET ?", newContact, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created contact: ", {
            id: res.insertId,
            newContact
        });
        result(null, {
            id: res.insertId,
            newContact
        });
    });
};
Contact.findById = (contactId, result) => {
    sql.query(`SELECT * FROM contacts WHERE id = ?`, contactId, (err, res) => {
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

Contact.getAll = result => {
    sql.query("SELECT * FROM contacts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("contacts: ", res);
        result(null, res);
    });
};

Contact.remove = (id, result) => {
    sql.query("DELETE FROM contacts WHERE id = ?", id, (err, res) => {
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

Contact.removeAll = result => {
    sql.query("DELETE FROM contacts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} contacts`);
        result(null, res);
    });
};

Contact.updateById = (id, contact, result) => {
    sql.query("UPDATE contacts SET name = ?, email =?,town=? WHERE id = ?", [contact.name, contact.email, contact.town, id], (err, res) => {
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
            contact
        });
        result(null, {
            id: id,
            contact
        });
    });
};

module.exports = Contact;