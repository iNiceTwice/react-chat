import { Response, Request } from "express"
import { sign } from "jsonwebtoken"
import USERS from "../models/users.model"
import { hashSync, genSaltSync, compareSync } from "bcrypt-nodejs"

export const registerUser = async (req: Request, res:Response):Promise<Object> => {

    const { username, password, email } = req.body
    if(!password || !email || !username){
        return res.status(500).json({message:"Missing credentials, make sure you're sending this values: password, username and email"})
    }
    
    const emailAlreadyExists = await USERS.findOne({ email })
    const usernameAlreadtExists = await USERS.findOne({ username })

    if( emailAlreadyExists || usernameAlreadtExists){
        return res.status(409).json({username:Boolean(usernameAlreadtExists), email: Boolean(emailAlreadyExists)})
    }

    const encryptedPass = hashSync(password, genSaltSync(10))

    const newUser = new USERS({
        username,
        password: encryptedPass,
        email,
        publicId:`${username}#${Math.floor(Math.random() * (9999 - 1000) + 1000)}`,
        profileImage:`https://api.dicebear.com/5.x/big-smile/svg?seed=${username}`
    })
    await newUser.save()

    const token = sign({
            publicId:newUser.publicId,
            email:newUser.email,
            name:newUser.username,
        }, process.env.JWT_SECRET as string ,{
        expiresIn: '30d'
    })

    res.cookie("chatToken", token,{
        httpOnly:true,
        maxAge: 1000000,
        secure: true,
        sameSite:'none'
    })
    return res.status(200).json({
        message:"User created successfully",
        user:{
            publicId:newUser.publicId,
            email:newUser.email,
            name:newUser.username,
            profileImage:newUser.profileImage,
            theme:newUser.themePreference            
        }
    })
}

export const loginUser = async (req: Request, res:Response):Promise<Object> => {

    const { password, email } = req.body
    const user = await USERS.findOne({email})

    if(!user){
        return res.status(401).send({message:"Bad credentials."})
    }else if(!compareSync(password, user.password)){
        return res.status(401).send({message:"Bad credentials."})
    }else{

        const token = sign({
            publicId:user.publicId,
            email:user.email,
            username:user.username,
        }, process.env.JWT_SECRET as string ,{
        expiresIn: '30d'
    })

        res.cookie("chatToken", token,{
            httpOnly:true,
            maxAge: 10000000000,
            secure: true,
            sameSite:'none'
        })

        return res.status(200).json({
            message:"User created successfully",
            user:{
                publicId:user.publicId,
                email:user.email,
                name:user.username,
                profileImage:user.profileImage,
                theme:user.themePreference
            }
        })
    }
} 

export const changeTheme = async (req: Request, res:Response) => {
    const { id, theme } = req.body

    const user = await USERS.findOneAndUpdate({ publicId:id }, { themePreference:theme })

    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    return res.status(200)
}
export const logoutUser = (req: Request, res:Response) => {
    res.clearCookie("chatToken")
    return res.end()
}

export const getUsers = async (req: Request, res:Response):Promise<Object> => {
    const users = await USERS.find()
    return res.send(users)
}
