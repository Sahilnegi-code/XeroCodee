// import {ExtractJwt, Strategy } from 'passport-jwt'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport"
import {create , getUserById} from  './db.js'
import './auth.js'
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random String';

passport.use(new JwtStrategy(opts,  async (jwt_payload, done) =>{
    console.log(jwt_payload)
    try{
        const response  = await getUserById(jwt_payload.id);
        console.log(response)
        if(response){
            return done(null, response)
        }
        else{
            return done(null , false);
        }
    }
    catch(err){
        console.log('user is defined');
        return done(err , false);
    }

}));
