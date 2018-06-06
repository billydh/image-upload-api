var path = require('path');
var sqldb = require('./sqldb.js');

var queryImage = function(req, res) {
    var imageId = req.params.id;
    sqldb.query('SELECT id, name, path FROM image WHERE id = ?', [imageId], function(err, results) {
        if (err) {
            return console.log(err);
        }
        
        res.sendFile(path.join(__dirname, '../public/uploaded_images', results[0].name));
    });
};

module.exports = queryImage;