const Notification = require("../models/Notification")

const getNotifications = async (req, res) => {
    try {
        console.log(req.params.name);
        const notifications = await Notification.find({for:req.params.name})
        if (notifications) {
            res.status(200).json(notifications)
        }
        else {
            res.status(404).json({ msg: "Notifications not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error"})

    }

}

const createNotification = async(req,res)=>{
    try {
        const newNotification  = await new Notification({
            title:req.body.title,
            message:req.body.message,
            for:req.body.for
        })
        await newNotification.save()
        res.status(200).json({msg:"Notification saved"})


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error"})
    }
}
module.exports = { getNotifications,createNotification }