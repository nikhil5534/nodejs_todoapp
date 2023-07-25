import express from "express";
import { getAllUsers, getMyPorfile,login, logout, resister } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.get("/all",getAllUsers);
router.post("/new",resister);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated,getMyPorfile)
export default router;