
const isLogged = (req,res,next)=>{
    if(req.session.loggedUser === undefined){
        res.redirect("auth/login")
    }else{
        next()
    }
}

const admin = (req, res, next) => {
    if ( req.session.loggedUser.role !== "admin") {
        res.redirect("/restaurant")
    }
}


module.exports = {
    isLogged,
    admin
}