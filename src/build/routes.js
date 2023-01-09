"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./useCase/User/createUser/CreateUserController");
const AuthenticateUserController_1 = require("./useCase/User/authenticateUser/AuthenticateUserController");
const ensureAuthenticated_1 = require("./middlewares/ensureAuthenticated");
const CreateTodoController_1 = require("./useCase/Todo/createTodo/CreateTodoController");
const ListTodosController_1 = require("./useCase/Todo/listTodos/ListTodosController");
const DeleteTodoController_1 = require("./useCase/Todo/deleteTodo/DeleteTodoController");
const ChangeCompletedController_1 = require("./useCase/Todo/changeCompleted/ChangeCompletedController");
const createUserController = new CreateUserController_1.CreateUserController();
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController();
const createTodoController = new CreateTodoController_1.CreateTodoController();
const listTodosController = new ListTodosController_1.ListTodosController();
const deleteTodoController = new DeleteTodoController_1.DeleteTodoController();
const changeCompletedController = new ChangeCompletedController_1.ChangeCompletedController();
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => { res.send('Hello World'); });
router.post('/login', authenticateUserController.handle);
router.post('/signin', createUserController.handle);
router.delete('/todos/:todoId', ensureAuthenticated_1.ensureAuthenticated, deleteTodoController.handle);
router.put('/todos/:todoId', ensureAuthenticated_1.ensureAuthenticated, changeCompletedController.handle);
router.post('/todos', ensureAuthenticated_1.ensureAuthenticated, createTodoController.handle);
router.get('/todos', ensureAuthenticated_1.ensureAuthenticated, listTodosController.handle);