
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.MongoDB_URL,
      file: (request, file) => {
        const match = ["image/png", "image/jpg","image/webp"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-pawfinder-${file.originalname}`;

        return {
            bucketName: "fs",
            filename: `${Date.now()}-pawfinder-${file.originalname}`
        }
    }
  });
  
  module.exports = multer({storage})