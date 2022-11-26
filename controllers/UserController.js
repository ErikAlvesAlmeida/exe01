const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

class UserController{
    // LISTAR USUÁRIOS
    static async listarUsers(req, res){
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizar = req.query.a;
        const existe = req.query.e;
        const users = await UserModel.find();
        res.render("user/users", { users, salvo, deletado, atualizar, existe });
    }
    // CADASTRAR USUÁRIOS
    static async cadastrarUsers(req, res){
        const dados = req.body;
        const existe = await UserModel.findOne({email: dados.email});
        const salt = bcrypt.genSaltSync();
        if(existe){
            res.redirect("/users?e=2");
        } else{
            const hash = bcrypt.hashSync(dados.senha, salt);
            const novoUser = new UserModel({
                email: dados.email,
                nome: dados.nome,
                senha: hash,    
            });
            await novoUser.save();
            res.redirect("/users?s=1");
        }
    }
    // CADASTRAR TELA
    static async screenCadastro(req, res){
        res.render("user/cad_user");
    }
    // LISTAR USER INDIVIDUAL
    static async listSingleUser(req, res){
        const email = req.params.email;
        let humaninho;
        const lista_users = await UserModel.find();
        for (const element of lista_users) {
            if(element.email == email){
                humaninho = element;
                break
            }
        };
        if (humaninho == undefined){
            res.send("Pessoa não encontrada.");
        } else{
            res.render("user/detalharUser", humaninho);
        }
    }
    // DELETAR UM ÚNICO USER
    static async deleteSingleUser(req, res){
        const email = req.params.email;
        await UserModel.findOneAndDelete({email: email});
        res.redirect("/users?d=1");
    }
    // ATUALIZAR ÚNICO USER
    static async updateSingleUser(req, res){
        const dados = req.body;
        await UserModel.findOneAndUpdate({email: dados.email},
            {
                nome: dados.nome,
                senha: dados.senha,
            }
            );
        res.redirect("/users?a=1");
    }
    // ATUALIZAR TELA
    static async screenAtualizar(req, res){
        const email = req.params.email; 
        const user = await UserModel.findOne({email: email});
        res.render("user/att_user", {user});
    }
    // RELATÓRIO TELA
    static async screenRelatorio(req, res){
        const users = await UserModel.find();
        res.render("user/relatorio", {users});
    }
    // LOGIN
    static async login(req,res){
        const usuario = req.body;
        const pessoa = await UserModel.findOne({email: usuario.email});
        if(pessoa){
            const senha = bcrypt.compareSync(usuario.senha, pessoa.senha);
            if(senha){
                req.session.usuario = pessoa.email;
                res.redirect("/");
            }
            else{
                res.send("E-mail e/ou senha inválido(s)");
            }
        } else{
            res.send("E-mail e/ou senha inválido(s)");
        }
        
    }
    // SCREEN LOGIN
    static async screenLogin(req, res){
        res.render("user/login");
    }
    // LOGOUT
    static async logout(req,res){
        req.session.usuario = undefined;
        res.redirect("/users/login");
    }
}

module.exports = UserController;