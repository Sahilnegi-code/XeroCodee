import express from 'express';
const app =  express();
import bodyParser from 'body-parser'
import user from './route.js'
import dotenv from 'dotenv'
import { hashSync } from 'bcrypt';
import { createClient } from 'redis';
import passport from 'passport';
import './passportConfig.js'
dotenv.config();
// initializingPassport();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// const client = createClient();
app.use('/api', user)
// console.log(hashSync('1', 10));
app.get('/',(req, res)=>{
    res.send("hello world")
})
app.get('/protected',passport.authenticate('jwt', {session : false}) , (req , res)=>{
    return res.status(200).send({
        success : true, 
        user:{
            id : req.id,
            name  : req.name 
        }
    })
})
app.listen( 3000,()=>{
    console.log('hello');
})