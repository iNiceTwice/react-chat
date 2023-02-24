import { Response, Request, NextFunction } from "express"
import { verify } from "jsonwebtoken"

export const verifyToken = ( req:Request, res:Response, next:NextFunction ) => {
    const { chatToken } = req.cookies

    if ( !chatToken ){
        return res.status(401).json({ message:"No token provided" })
    }

    const authCheck = verify(chatToken, process.env.JWT_SECRET as string)

    if(!authCheck){
        return res.status(401).json({ message:"Invalid Token" })
    }

    next()   
}

export const authComplete = ( req:Request, res:Response ) => {
    res.send(200).json({message:"Auth completed successfully"})
}