var multer = require('multer');
var path = require('path');
var sqldb = require('./sqldb.js');

var imageStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploaded_images');
    },

    filename: function(req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
    }
});

var upload = multer({
    storage: imageStorage,
    fileFilter: function(req, file, callback) {
        console.log('Checking file extension...');
        var extension = path.extname(file.originalname);
        if (extension == '.jpg' || extension == '.png' || extension == '.jpeg') {
            console.log('Extension looks good!');
            callback(null, true);
        } else {
            callback('Please upload images only!', false);
        }
    }
}).array('image');

var insertIntoDb = function(req, res) {
    // save to server's file directory
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Something went wrong!');
        }
        console.log('Upload to directory successful!');

        var jsonData = req.files;
        var values = [];
        var date = new Date().toISOString().replace('T', ' ').substr(0, 10);

        for (var i=0; i < jsonData.length; i++)
            values.push([jsonData[i].filename, jsonData[i].destination + '/' + jsonData[i].filename, date]);

        console.log(req.files);
        console.log(values);

        // insert to database
        sqldb.query('INSERT INTO image (name, path, uploadDate) VALUES ?', [values], function(err, result) {
            if (err) {
                res.send('Something went wrong!');
            } else {
                res.send('Successfully uploaded images!');
            }
        });
    });
};

module.exports = insertIntoDb;
