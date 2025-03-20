import { Router } from "express";
import { login, logout, Signup, } from "../controllers/AuthController.js";
import { getUserInfo } from "../controllers/AuthController.js";
import { updateProfile } from "../controllers/AuthController.js";
import { addProfileImage } from "../controllers/AuthController.js";
import { removeProfileImage } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";




const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles/" })

authRoutes.post("/signup", Signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info",verifyToken, getUserInfo)
authRoutes.post("/update-profile", verifyToken, updateProfile)
authRoutes.post("/add-profile-image", verifyToken,upload.single("profile-image"), addProfileImage)
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)
authRoutes.post('/logout', logout);



export default authRoutes;