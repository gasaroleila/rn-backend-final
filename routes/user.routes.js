import express from 'express'
const router = express.Router()
import { changePassword, checkCanReset, checkCode, checkResetLink, deleteAccount,getUser,login,loginWithLink, pyUploadFile, registerUser, resetPassword,sendLoginLink,sendResetLink, updateUserInformation, uploadFiles, validateUserEmail, verifyAccount } from '../controllers/user.controller.js'
import authenticate from '../middlewares/auth.middleware.js';
import { validateLogin, validatePasswordReset, validateUserRegistration } from '../validators/user.validator.js';
import { uploadFile } from "../utils/fileUpload.utils.js";
const upload = uploadFile()

router.get("/user/profile/:userId", getUser)
router.get("/checkCanReset/:userId", checkCanReset)

router.post("/register",validateUserRegistration, registerUser) // admin & voter registration
router.post("/login", validateLogin, login)


router.patch("/updateInfo/:userId", upload.single("documentImage"), updateUserInformation)
router.patch("/verifyAccount/:userId",verifyAccount)


router.patch("/verifyEmail", validateUserEmail)

router.post("/sendLoginLink", validateLogin, sendLoginLink)
router.post("/login/:userId/:userCode", loginWithLink)

router.post("/forgotPassword/sendResetLink", sendResetLink)
router.post("/forgotPassword/checkResetLink/:userId/:userCode", checkResetLink)
router.patch("/resetPassword/:userId", validatePasswordReset, resetPassword)

router.post("/uploadFile", upload.single("data"), pyUploadFile)


router.patch("/user/profile/changePassword", authenticate, changePassword)

export default router;

