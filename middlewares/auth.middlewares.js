
const isLogged = (req,res,next)=>{
    if(req.session.loggedUser === undefined){
        res.redirect("auth/login")
    }else{
        next()
    }
}

module.exports = {
    isLogged
}