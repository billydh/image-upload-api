var fs = require('fs');
var path = require('path');
var sqldb = require('./sqldb.js');

var deleteOldFiles = {};

// delete files that are over 30 days old since upload
deleteOldFiles.deleteInDirectory = function(uploadDir) {
    
    var removedFiles = [];

    fs.readdir(uploadDir, function(err, files) {

        files.forEach(function(file, index) {
            var filePath = path.join(uploadDir, file);

            fs.stat(filePath, function(err, stat) {
                if (err) {
                return console.error(err);
                }

                var now = new Date().getTime();
                var endTime = new Date(stat.ctime).getTime();
                var diffDays = parseInt((now - endTime) / (1000 * 60 * 60 * 24));

                console.log(now);
                console.log(endTime);
                console.log(diffDays + ' days');

                if (diffDays > 30) {
                    fs.unlink(filePath, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

                    removedFiles.push(file)
                    console.log(file + ' has been removed!');
                }

                if (removedFiles.length > 0) {
                    console.log(removedFiles.length + ' files were removed from directory!');
                    console.log(removedFiles);
                    console.log('-----------');
                } else {
                    console.log('No files were removed!')
                    console.log('-----------');
                }
            });
        });
    });
};

// delete the records in database
deleteOldFiles.deleteInDb = function(uploadDir) {
    fs.readdir(uploadDir, function(err, files) {
        if (err) {
            return console.log(err);
        }

        sqldb.query('DELETE FROM image WHERE name NOT IN (?)', [files], function(err, result) {
            if (err) {
                return console.log(err);
            }
        });
    });
};

module.exports = deleteOldFiles;