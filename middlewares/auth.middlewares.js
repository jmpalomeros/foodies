
const isLogged = (req,res,next)=>{
    if(req.session.loggedUser === undefined){
        res.redirect("auth/login")
    }else{
        next()
    }
}

const admin = (req, res, next) => {
    if (req.session.loggedUser === undefined ||req.session.loggedUser.role !== "admin") {
       res.redirect("/restaurant") 
     }else{next()}
}


module.exports = {
    isLogged,
    admin,
}