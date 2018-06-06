var sqldb = require('./sqldb.js');
var im = require('imagemagick');
var path = require('path');

var resizeImage = function(req, res) {
    var destImagePath = './public/uploaded_images/' + 'h' + req.body.image.height + 
        'w' + req.body.image.width + '_' + path.basename(req.body.image.path);
        
    im.resize({
        srcPath: req.body.image.path,
        dstPath: destImagePath,
        width: req.body.image.width,
        height: req.body.image.height
    }, function(err) {
        if (err) {
            console.log(err);
            return res.end('Something went wrong!');
        }
        
        console.log('Resizing image successful!');
        console.log(path.basename(destImagePath));
        console.log(destImagePath);

        var values = [];
        var date = new Date().toISOString().replace('T', ' ').substr(0, 10);

        values.push([path.basename(destImagePath), destImagePath, date]);
        console.log(values);

        // insert to database
        sqldb.query('INSERT INTO image (name, path, uploadDate) VALUES ?', [values], function (err, result) {
            if (err) {
                res.send('Something went wrong!');
            }
            console.log('Resized image saved to database!');
        });

        res.send(destImagePath);
    });
};

module.exports = resizeImage;