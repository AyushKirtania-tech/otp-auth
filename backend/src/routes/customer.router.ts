import { Router, Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "";

const router = Router();
router.get("/login",(req:Request,res:Response)=>{
    res.json({
        message:"Login Succesful"
    })
})

export default router;
