import { Response, Request } from "express"
import USERS from "../models/users"
import { hashSync, genSaltSync, compareSync } from "bcrypt-nodejs"
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"

export const registerUser = async (req: Request, res:Response) => {
    const { username, password, email } = req.body

    if(!password || !email || !username){
        res.status(500).json({message:"Missing credentials, make sure you're sending this values: password, username and email"})
    }

    const emailAlreadyExists = await USERS.findOne({ email })
    emailAlreadyExists && res.status(409).send("Email already exists")

    const encryptedPass = hashSync(password, genSaltSync(10))

    const newUser = new USERS({
        username,
        password: encryptedPass,
        email,
        publicId:`${username}#${Math.floor(Math.random() * (9999 - 1000) + 1000)}`
    })
    await newUser.save()
    
    const token = sign({
            publicId:newUser.publicId,
            email:newUser.email,
            name:newUser.username,
            password:newUser.password
        }, "4sad654t65j4yi51hg32n18wr74tqe6w4f32c1v3")

    const serialized = serialize("chat-token", token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "development",
        sameSite:"strict",
        path:"/",
        maxAge:1000000
    })

    res.setHeader("Set-Cookie", serialized)
    res.status(200).json({message:"User created succesfully"})
}

export const loginUser = async (req: Request, res:Response) => {

    const { password, email } = req.body
    const user = await USERS.findOne({email})

    if(!user){
        return res.status(401).send({message:"bad credentials"})
    }else if(!compareSync(password, user.password)){
        return res.status(401).send({message:"bad credentials"})
    }else{
        const token = sign({
            publicId:user.publicId,
            email:user.email,
            name:user.username,
            password:user.password
        }, "4sad654t65j4yi51hg32n18wr74tqe6w4f32c1v3")

        const serialized = serialize("chat-token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "development",
            sameSite:"strict",
            path:"/",
            maxAge:1000000
        })

        res.setHeader("Set-Cookie", serialized)
        res.status(200).json({message:"User logged succesfully"})
    }
}

export const logoutUser = async (req: Request, res:Response) => {
    res.setHeader("Set-Cookie",
        serialize("chat-token", "",{
            maxAge:0,
            path:"/"
        }))   
    res.end()
}

export const getUsers = async (req: Request, res:Response) => {
    const users = await USERS.find()
    res.send(users)
}