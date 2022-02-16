const passport = require('passport');
const auth0Strategy = require('passport-auth0').Strategy
const router = require('express').Router()

const validarUsuario = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
        return
    }
        res.status(401).json('USUARIO NO AUTENTICADO')
}

passport.use(new auth0Strategy({
    clientID: 'JMG9Jsm7dLByNgPKpaTkMRcXGTRXMILf',
    clientSecret:'WZDz2aJ6KW6Sd7FDD4NGQ0wiXOIC91rdxge4jkZFFcJb8CrdV7BFzTfQHyTSHmPP',
    callbackURL:'http://localhost:8080/api/v1/auth0/callback',
    domain: 'dev-ca0w9mgn.us.auth0.com'
},(accessToken, refreshToken,extraparams, profile, done)=>{
    console.log(profile)
    if (profile){
        done(null,profile)
    }else{
        done(new Error('No se pudo ingresar'))
    }
}))



router.get('/login/auth0', passport.authenticate('auth0'));

router.get('/auth0/callback', passport.authenticate('auth0', {
    failureRedirect: '/error',
     successRedirect: '/api/v1/users/token' }));



router.get('/error', (req,res)=> {
    console.log('La autenticación falló')
    res.status(401).json('La autenticación falló')
    });
    
    
router.get('/home',validarUsuario, (req,res)=> {
        console.log(req.user)
        console.log('La autenticación fué exitosa')
        res.status(200).json('La autenticación fué exitosa')
    });
    
    


module.exports = router