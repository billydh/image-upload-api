var sqldb = require('./sqldb.js');

var allImages = function(req, res) {
    sqldb.query('SELECT id, name, uploadDate FROM image', function(err, results, fields) {
        if (err) {
            return console.log(err);
        }

        return res.send({ error: false, message: 'List of all available images:', data: results});
    });
}

module.exports = allImages;