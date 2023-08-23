import passport from 'passport';
import {Strategy} from 'passport-google-oauth20'
var GoogleStrategy = Strategy;

passport.use(new GoogleStrategy({
    clientID: '281628432963-pb44ld7511lnlaa1vtj3g7i8pkgqtr17.apps.googleusercontent.com',
    clientSecret:   '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',
    callbackURL: "http://localhost:3000/api/auth/google",
    passReqToCallback:true
  },
  function(accessToken, refreshToken, profile, db) {
    db(null , profile);
  }
))
passport.serializeUser((user , db)=>{
  db(null ,user);
})
passport.deserializeUser((user , db)=>{
  db(null ,user);
})