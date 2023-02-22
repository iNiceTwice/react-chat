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
    if( emailAlreadyExists ){
        return res.status(409).send("Email already exists")
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
            }
        })
    }
}

export const logoutUser = async (req: Request, res:Response):Promise<Object> => {
    res.clearCookie("chat-token")
    return res.json({message:"User logout"})
}

export const getUsers = async (req: Request, res:Response):Promise<Object> => {
    const users = await USERS.find()
    return res.send(users)
}

export const addContact = async (req: Request, res:Response):Promise<Object> => {
    const { contactID, userID } = req.body
    const newContact = await USERS.find({ publicId:contactID })
    
    if(!newContact){
        return res.status(404).json({message: "Contact not found"})
    }else{
        const user = await USERS.find({ publicId:userID })
        user[0].contacts?.push(contactID)
        await user[0].save()
    }
    return res.json({message:"Contact added successfully"})
}

interface ContactProps {
    username:string,
    image:string
}

export const getContacts = async (req: Request, res:Response) => {
    
    const { userID } = req.query    

    if(!userID) return res.status(500).json({message:"No userID provided"})
    
    const user = await USERS.find({publicId:userID})
    
    if(user[0].contacts?.length > 0){
        const contacts = await Promise.all(
            user[0].contacts.map(async (contactID):Promise<ContactProps> => {
                const contact = await USERS.find({publicId:contactID})
                return {
                    username:contact[0]?.username,
                    image:contact[0]?.profileImage
                }
            })
        )
        return res.status(200).send(contacts)
    }

    return res.status(500)

}