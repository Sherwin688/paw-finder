const Post = require("../models/Post");
require('dotenv').config()
const grid = require("gridfs-stream");
const mongoose = require("mongoose");

const conn = mongoose.connection
let gfs,gridfsBucket;
conn.once("open",()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:"fs"
    })
    gfs = grid(conn.db,mongoose.mongo)
    gfs.collection("fs")
})
const getImage = async(request,response)=>{
    try {
        const file = await gfs.files.findOne({filename:request.params.filename})
        const readStream = gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(response)
        
    } catch (error) {
        return response.status(500).json({msg:error})
    }
    
    }
const uploadImage = async(req, res) => {
    if(!req.files) 
    return response.status(404).json("Files not found");
    const files = req.files.map((fileObj)=>`${process.env.URL}/file/${fileObj.filename}`)
    
    res.status(200).json(files);    


}

module.exports = {getImage,uploadImage,gfs}