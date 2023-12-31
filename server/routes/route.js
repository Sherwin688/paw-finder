const express = require("express")
const { signup,login, test, generateOtp, verifyOtp } = require("../controller/user-controller")
const { authenticateUser } = require("../controller/jwt-controller")
const upload = require("../utils/upload")
const { uploadImage, getImage } = require("../controller/image-controller")
const { createPost, getPost, getAllPost, editPost, deletePost } = require("../controller/post-controller")
const { createApplication, getApplication, getAllApplications, updateApplication, getUserApplications, applicationExists } = require("../controller/application-controller")
const { getNotifications, createNotification, deleteNotification } = require("../controller/notification-controller")
const router = express.Router()

// router.post("/signup",signup)
router.post("/login",login)
router.get("/test",test)
router.post("/file/upload",upload.array("files",10),uploadImage)
router.get("/file/:filename",getImage)
router.post("/create",authenticateUser,createPost)
router.put("/post/edit",authenticateUser,editPost)
router.delete("/post/delete/:id",authenticateUser,deletePost)
router.get("/post/getAll",getAllPost)
router.get("/post/:id",getPost)
router.post("/application/create",createApplication)
router.post("/application/update",updateApplication)
router.post("/application/exists",applicationExists)
router.get("/application/:id",getApplication)
router.get("/applications",getAllApplications)
router.get("/applications/:name",getUserApplications)
router.get("/notifications/:name",getNotifications)
router.post("/notifications/create",createNotification)
router.delete("/notifications/delete/:id",deleteNotification)
router.post("/signup/generateOtp",generateOtp)
router.post("/signup/verifyOtp",verifyOtp)


module.exports = router