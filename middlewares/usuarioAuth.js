function auth(req, res, next){
    if(req.session.usuario){
        next();
    } else{
        res.redirect("/users/login");
    }
}

module.exports = auth;