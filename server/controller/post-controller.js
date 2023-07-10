const Post = require("../models/Post");
const Notification = require("../models/Notification");
require('dotenv').config()
const createPost = async(req,res)=>{
    try {
        
        const newPost = await new Post({
            title:req.body.title,
            description:req.body.description,
            images:req.body.imageLinks,
            createdDate:new Date(),
            user_name:req.body.user_name,
            user_phone:req.body.user_phone,
            status:"Available"
        })
        await newPost.save()
        const newNotification  = await new Notification({
            title:"Post Created",
            message:`Your post ${req.body.title.substring(0,10)} has been created`,
            for:req.body.user_name
        })
        await newNotification.save()
        return res.status(200).json({msg:"Post Saved",id:newPost.id})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error"})
        
    }
   
}
const editPost = async(req,res)=>{
    try {
        const post = await Post.findOne({_id:req.body._id})
       
            post.title=req.body.title,
            post.description=req.body.description,
            post.images=req.body.images,
      
        await post.save()
        return res.status(200).json({msg:"Post edited Successfully"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server Error"})
        
    }
   
}

const getPost = async(req,res)=>{
    try {
        const post = await Post.findOne({_id:req.params.id})
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({msg:"error finding post"})
        
    }
}
const deletePost = async (req, res) => {
    try {
    //   const currentPost = await Post.findOne({ _id: req.params.id });
  
    //   if (currentPost) {
    //     for (const image of currentPost.images) {
    //       await gfs.files.findOneAndDelete({ filename: image.filename });
    //     }
    //   }
  
      await Post.findOneAndDelete({ _id: req.params.id });
  
      return res.status(200).json({ msg: "Post deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error deleting post" });
    }
  };
  
// const getAllPost = async(req,res)=>{
//     try {
//         const posts = await Post.find({})
//         return res.status(200).json(posts)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({msg:"error finding posts"})
        
//     }
// }
// const getAllPost = async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1;
//       const pageSize = parseInt(req.query.pageSize) || 10;
  
//       const totalPosts = await Post.countDocuments();
//       const totalPages = Math.ceil(totalPosts / pageSize);
  
//       const posts = await Post.find({}).skip((page - 1) * pageSize).limit(pageSize);
  
//       return res.status(200).json({
//         posts,
//         totalPages,
//         currentPage: page,
//         pageSize
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ msg: "Error finding posts" });
//     }
//   };
  const getAllPost = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const keyword = req.query.keyword || '';
  
      const query = keyword
        ? { title: { $regex: keyword, $options: 'i' } }
        : {};
  
      const totalPosts = await Post.countDocuments(query);
      const totalPages = Math.ceil(totalPosts / pageSize);
  
      const posts = await Post.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      return res.status(200).json({
        posts,
        totalPages,
        currentPage: page,
        pageSize
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error finding posts" });
    }
  };
module.exports = {createPost,getAllPost,getPost,editPost,deletePost}