import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const getAllUsers =async(req,res) =>{}; 
export const login =async(req,res,next) =>{
    const{ email,password }=req.body;
    const user=await User.findOne({email}).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password",500));
    
        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch)return next(new ErrorHandler("Invalid Email or Password",500));
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
        
};
export const resister =async(req,res) =>{
    const{name,email,password}=req.body;
    let user =await User.findOne({email});
    if (user) return next(new ErrorHandler("User already Exist",500));
    const hashedPassword =await bcrypt.hash(password,10)
    user=await User.create({name,email,password:hashedPassword}) 
    sendCookie(user,res,'Resistered Successfully',201)
};
export const getMyPorfile =async(req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.user,
    })
};
export const logout= async(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV ==="Development" ? "lax":"none",
        secure:process.env.NODE_ENV ==="Development" ? false: true,

    })
        .json({
        success:true,
        user:req.user,
    })
}