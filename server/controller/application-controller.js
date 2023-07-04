const Application = require("../models/Application")
const Post = require("../models/Post")
const Notification = require("../models/Notification")

const createApplication = async(req,res)=>{
    try {
        const application = await new Application({
            from:req.body.from,
            to:req.body.to,
            name:req.body.name,
            phone:req.body.phone,
            message:req.body.message,
            status:req.body.status,
            post_id:req.body.post_id,
            post_title:req.body.post_title,
    
        })
        const newNotification = await new Notification({
            title:"You're Application has been Sent",
            message:`You're Application has been sent to ${req.body.to}`,
            for:req.body.from
        })
        await application.save()
        await newNotification.save()
        return res.status(200).json({msg:"application created"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"application creation failed"})

    }
   
}
const getApplication = async(req,res)=>{
    try {
        const application = await Application.findOne({_id:req.params.id})
            
        if(application){

            return res.status(200).json(application)
        }
        else{
            return res.status(404).json({msg:"application not found"})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"application creation failed"})

    }
   
}
const getAllApplications = async(req,res)=>{
    try {
        const applications = await Application.find({})
            
        if(applications){

            return res.status(200).json(applications)
        }
        else{
            return res.status(404).json({msg:"applications not found"})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"failed getting applications"})

    }
   
}

const updateApplication = async(req,res)=>{
    try {
        const application = await Application.findOne({_id:req.body.id})
        const post = await Post.findOne({_id:req.body.post_id})
            
        if(application){
            if(req.body.status==="Accepted"){
                const newNotification = await new Notification({
                    title:"Application Accepted",
                    message:`Congratulations your adoption application has been accepted.`,
                    for:req.body.for
                })
                await newNotification.save()
                if(post){
                    post.status = "Closed"
                    await post.save()
                }
              
            }
            else if(req.body.status==="Declined"){
                const newNotification = await new Notification({
                    title:"Application Declined",
                    message:`Sorry your adoption application has been Declined.`,
                    for:req.body.for
                })
                await newNotification.save()
            }
           
            application.status = req.body.status
            await application.save()
            return res.status(200).json({msg:"Application updated",id:post._id})
        }
        else{
            return res.status(404).json({msg:"application not found"})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"application creation failed"})

    }
}
const getUserApplications = async(req,res)=>{
    try {
        const applications = await Application.find({to:req.params.name})
            
        if(applications){

            return res.status(200).json(applications)
        }
        else{
            return res.status(404).json({msg:"applications not found"})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"failed getting applications"})

    }
   
}
const applicationExists = async(req,res)=>{
    try {
        const application = await Application.findOne({post_id:req.body.post_id,from:req.body.from})
            
        if(application){

            return res.status(200).json({msg:"application exists"})
        }
        else{
            return res.status(404).json({msg:"applications not found"})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"failed getting application"})

    }
   
}
module.exports = {applicationExists,createApplication,getApplication,getAllApplications,updateApplication,getUserApplications}