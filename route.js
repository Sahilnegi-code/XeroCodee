import express from 'express'
import {create ,getUserById} from './db.js'
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport'
import './passportConfig.js'
const router = express.Router();
router.post('/signup', async(req, res) => {
    create(req.body);
    res.json({
        success : true,
        message : "user created Sucessfully",
        user:{
            id : req.body.id,
            username : req.body.name
        }
    })
})
router.post('/login', async(req , res , next        )=>{
    try{
        const response  = await getUserById(req.body.id)
    console.log(response)
  
    if(!response){
        return res.status(401).send({
            success : false,
            message :'Invalid username'
        })
    }
    // console.log( req.body.id ,  )
    console.log(req.body.password);
    compare(req.body.password , response.Item.password).then((data)=>{
        const payload  = {
            name : req.body.name,
            id : req.body.id
        }
     const token =    jwt.sign(payload , "Random String" , {expiresIn : "1d"});
     res.status(200).send({
        message: "Login Succesfully",
        success: true,
        token : `Bearer ${token}`
     })
    }).catch((err)=>{
        console.log(err);
         res.status(401).send({ 
            success : false,
            message :'Incorrect Password'
        })
       
    })
    
}
    
catch(err){
    console.log(err);
}   
    
})
router.get('/auth/google',  passport.authenticate('google', { scope: ['email','profile'] }) )
router.get('/login/failed' , (req , res)=>{
    res.status(401).send({
        success : false,
        message : "Login failed"
    })
})
router.get('/login/success' , (req , res)=>{
    res.status(200).send({
        success : true,
        message : "Login success"
    })
})
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login/failed' , successRedirect : '/login/success' } ),
  );


export default router