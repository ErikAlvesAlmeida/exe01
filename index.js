const express = require("express");
const app = express();
const pessoasRoutes = require("./routes/pessoaRoutes");
const usersRoutes = require("./routes/userRoutes");
require('dotenv/config');
const session = require('express-session');
const mongoose = require("mongoose");
const auth = require('./middlewares/usuarioAuth');
app.use(session({
    secret: 'ifpe',
    saveUninitialized:false,
    resave: false
}));
mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(pessoasRoutes);
app.use(usersRoutes);

app.get("/", auth, function(req, res){
    res.render("index");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado.");
});