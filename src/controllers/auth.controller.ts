import { Response, Request } from "express"
import { verify } from "jsonwebtoken"

export const verifyToken = ( req:Request, res:Response ) => {
    const { chatToken } = req.cookies

    if ( !chatToken ){
        return res.status(401).json({ message:"No token provided" })
    }

    const authCheck = verify(chatToken, process.env.JWT_SECRET as string)

    if(!authCheck){
        return res.status(401).json({ message:"Invalid Token" })
    }

    return res.status(200).json({ message:"Token approved" })
}