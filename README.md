# image-upload-api
Simple API built using `node.js` - `express` to accept batch image upload, query the uploaded images and resize them.

The storage system is a combination between server's `file system` and `mysql` database.
- server's `file system` - contains the actual images, as shown below in Folder structure
- `mysql` database - contains the images' `id`, `name`, `path` and `uploadDate` in the server's file system which are used by the API calls

The `mysql` table named `image` looks like this:

| id        | name           | path  | uploadDate  |
| ------------- |:-------------|:-----|:-----|
| 1      | 1528304421060_snappy.png | ./public/uploaded_images/1528304421060_snappy.png | 2018-06-06 |
| 2      | 1528304421063_steakmediumrare.jpg      |   ./public/uploaded_images/1528304421063_steakmediumrare.jpg | 2018-06-06 |
| 3 | 1528304421099_sausagedogversion.jpg      |    ./public/uploaded_images/1528304421069_hamburger.jpg | 2018-06-06 |

## Folder structure
```
image-upload-api
│   README.md
|   package.json
│   server.js
|   image.sql
|   image-upload-api.postman_collection.json
│
└───public
│   │
│   └───uploaded_images
│       │   1528304421060_snappy.png
│       │   1528304421063_steakmediumrare.jpg
│       │   1528304421099_sausagedogversion.jpeg
│   
└───functions
|   │   allImages.js
|   │   deleteOldFiles.js
|   |   insertIntoDb.js
|   |   queryImage.js
|   |   resizeImage.js
|   |   sqldb.js
|
└───node_modules
    │
    └───module1
    │
    └───module2
    │
    └───module3
```

Below are the details on what each folder/ file does:
- `package.json` - basic information about the project, including dependencies and their version
- `server.js` - application entry point, to handle incoming http requests
- `image.sql` - a sql command used to create the `image` table in the database
- `image-upload-api.postman_collection.json` - a postman's collection used to test all the API services
- `public` - a folder containing the uploaded images from users and is also for storing `html`, `css` and `javascript` files in the future for front end
  - `public/uploaded_images` - a folder where users' uploaded images are stored
- `functions` - a folder containing all user defined modules which are used in `server.js`
- `node_modules` - a folder containing all node modules required for the application

## Enables API's
Below is the list of available API's:
- `/api/uploadImages` - handle single/ batch uploads of images including storing them in the server's file system and inserting the images' information into database
- `/api/resizeImage` - handle image's resize, taking `height` and `width` from `request body` as an input
- `/api/allImages` - return the list of all available images from which a user can query from
- `/api/queryImage/:id` - return the queried image based on image `id`
