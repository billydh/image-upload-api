/***************************************/
/* IMPORT MODULES */
// import node modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var scheduler = require('node-schedule');

// import user defined modules
var insertIntoDb = require('./functions/insertIntoDb');
var resizeImage = require('./functions/resizeImage');
var allImages = require('./functions/allImages');
var queryImage = require('./functions/queryImage');
var deleteOldFiles = require('./functions/deleteOldFiles');

// specify uploaded images location
var uploadDir = __dirname + '/public/uploaded_images'

// create an express app instance
var app = express();


/***************************************/
/* DEFINE MIDDLEWARES */
// middleware to handle request url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// middleware to serve static
app.use('/viewImage', express.static(uploadDir));


/***************************************/
/* DEFINE API ROUTES */
// upload images
app.post('/api/uploadImages', insertIntoDb);

// resize image
app.post('/api/resizeImage', resizeImage);

// list all available images
app.get('/api/allImages', allImages);

// query individual image by filename
app.get('/api/queryImage/:id', queryImage);


/***************************************/
/* SCHEDULED JOBS */
// delete images in directory at 11.30PM each night
var delFileInDir = scheduler.scheduleJob('30 23 * * *', function() {
    deleteOldFiles.deleteInDirectory(uploadDir);
});

// delete records in database at 11.45PM each night
var delFileinDb = scheduler.scheduleJob('45 23 * * *', function() {
    deleteOldFiles.deleteInDb(uploadDir);
});


/***************************************/
/* PORT TO LISTEN ON */
app.listen(port=3000, function() {
    console.log('Listening to port ' + port);
});