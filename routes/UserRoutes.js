const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const UserController = require("../controllers/userController");

routes.get("/users/", auth, UserController.listarUsers);
routes.post("/users/", auth, UserController.cadastrarUsers);
routes.get("/users/cadastro", auth, UserController.screenCadastro);
routes.get("/users/relatorio", auth, UserController.screenRelatorio);
routes.get("/users/login", UserController.screenLogin);
routes.post("/users/login", UserController.login);
routes.get("/users/:email", auth, UserController.listSingleUser);
routes.get("/users/:email/deletar", auth, UserController.deleteSingleUser);
routes.get("/users/:email/atualizar", auth, UserController.screenAtualizar);
routes.post("/users/:email/atualizar", auth, UserController.updateSingleUser);
routes.post("/users/logout", UserController.logout);


module.exports = routes;