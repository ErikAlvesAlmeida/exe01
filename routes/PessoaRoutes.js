const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const PessoaController = require("../controllers/pessoaController");

routes.get("/pessoas/", auth, PessoaController.listarPessoas);
routes.post("/pessoas/", auth, PessoaController.cadastrarPessoas);
routes.get("/pessoas/cadastro", auth, PessoaController.screenCadastro);
routes.get("/pessoas/:id", auth, PessoaController.listSinglePessoa);
routes.get("/pessoas/:id/deletar", auth, PessoaController.deleteSinglePerson);
routes.get("/pessoas/:id/atualizar", auth, PessoaController.screenAtualizar);
routes.post("/pessoas/:id/atualizar", auth, PessoaController.updateSinglePerson);
routes.get("/relatorio", auth, PessoaController.screenRelatorio);

module.exports = routes;