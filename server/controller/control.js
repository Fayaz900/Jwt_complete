const Mode = require("../Models/Mode");
const jsonwebtoken=require('jsonwebtoken')
// const router = require("../Routes/Routes");

const getAll = async(req,res)=>{
    
}
const bcrypt = require("bcryptjs")

const SignUp = async (req,res)=>{

    let exsitingUSer;
    const { name,email,password }= req.body;
        exsitingUSer = await Mode.findOne({email:email});
        if(exsitingUSer){
        return res.status(400).json("User Already Exist")
}
 const ciperText = bcrypt.hashSync(password);
//  console.log(ciperText);

        let result= await Mode.create({
            name:name,
            email:email,
            password:ciperText
        })
         res.status(200).json({
            msg:"added",
            sucess:true
    });
};

const login =async(req,res)=>{
    const {email,password} = req.body;
    let userExisted;
    userExisted = await Mode.findOne({email: email});
    if(!userExisted){
        return res.status(400).json({message : "Please check credentials"});
    }
    const validPassword = bcrypt.compareSync(password,userExisted.password);
    if(!validPassword){
        return res.status(400).json({message:"invalid credentials"})
    }
    const userToken = jsonwebtoken.sign(
        {
            id: userExisted._id,
        },
        process.env.WEB_TOKEN_SECRET,
        {
            expiresIn:"1hrs",
        }
    )
    res.cookie(String(userExisted._id),userToken,{
        path :"/",
        expires: new Date(Date.now()+ 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
    })
    return res.status(200).json({message:"Succesfully logged in.", user:userToken})
}

const userVerification = async(req,res,next)=>{
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1]
    console.log(token);
    if(!token){
        res.status(400).json({message: "Invalid Credentials : Token error"})
    }
    jsonwebtoken.verify(
        token.toString(),
        process.env.WEB_TOKEN_SECRET,
        (error,user)=>{
            if(error){
                return res.status(400).json({message:"Invalid Credentials"});
            }
            console.log(user.id);
            req.id = user.id
        }
    )
    next()

}

const getUser = async(req,res,next)=>{
    const userId = req.id;
    let user;
    try {
       user = await Mode.findById(userId, "-password") 
    } catch (error) {
        return new Error(error)
    }
    if(!user){
        return res.status(404).json({message: "user not found"})
    }
    return res.status(200).json({user})
}

const refreshToken=(req,res,next)=>{
    const cookie = req.headers.cookie;
    console.log(cookie);
}

module.exports={
    SignUp,
    getAll,
    getUser,
    login,
    userVerification,
    refreshToken,
};