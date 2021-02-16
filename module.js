const multer = require('multer');
const path = require('path')

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
        console.log(Date.now() + path.extname(file.originalname));
    }
});
exports.upload = multer({
    storage: Storage
});


exports.myDateTime = function () {
    return Date();

}