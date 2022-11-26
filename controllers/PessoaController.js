const PessoaModel = require("../models/pessoaModel");

class PessoaController {
    static async listarPessoas(req, res) {
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizar = req.query.a;
        const existe = req.query.e;
        const pessoas = await PessoaModel.find();
        res.render("pessoa/pessoas", { pessoas, salvo, deletado, atualizar, existe });
        
    }

    static async cadastrarPessoas(req, res){
        const dados = req.body;
        const existe = await PessoaModel.findOne({codigo: dados.codigo});
        if(existe){
            res.redirect("/pessoas?e=2");
        } else {
            const novaPessoa = new PessoaModel({
                codigo: dados.codigo,
                nome: dados.nome,
                idade: dados.idade,    
            });
            await novaPessoa.save();
            res.redirect("/pessoas?s=1");
        }
    }

    static async screenCadastro(req, res){
        res.render("pessoa/cad_pessoa");
    }

    static async listSinglePessoa(req, res){
        const id = req.params.id;
        let humaninho;
        const lista_pessoas = await PessoaModel.find();
        for (const element of lista_pessoas) {
            if(element.codigo == id){
                humaninho = element;
                break
            }
        };
        if (humaninho == undefined){
            res.send("Pessoa não encontrada.");
        } else{
            res.render("pessoa/detalharPessoa", humaninho);
        }
    }

    static async deleteSinglePerson(req, res){
        const id = req.params.id;
        await PessoaModel.findOneAndDelete({codigo: id});
        res.redirect("/pessoas?d=1");
    }

    static async updateSinglePerson(req, res){
        const dados = req.body;
        await PessoaModel.findOneAndUpdate({codigo: dados.codigo},
            {
                nome: dados.nome,
                idade: dados.idade,
            }
            );
        res.redirect("/pessoas?a=1");
    }

    static async screenAtualizar(req, res){
        const id = req.params.id; 
        const pessoa = await PessoaModel.findOne({codigo: id});
        res.render("pessoa/att_pessoa", {pessoa});
    }

    static async screenRelatorio(req, res){
        const pessoas = await PessoaModel.find();
        res.render("pessoa/relatorio", {pessoas});
    }
}
module.exports = PessoaController;