import { Router } from "express";
import { CreateUserController } from "./useCase/User/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCase/User/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateTodoController } from "./useCase/Todo/createTodo/CreateTodoController";
import { ListTodosController } from "./useCase/Todo/listTodos/ListTodosController";
import { DeleteTodoController } from "./useCase/Todo/deleteTodo/DeleteTodoController";
import { ChangeCompletedController } from "./useCase/Todo/changeCompleted/ChangeCompletedController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createTodoController = new CreateTodoController();
const listTodosController = new ListTodosController();
const deleteTodoController = new DeleteTodoController();
const changeCompletedController = new ChangeCompletedController();

const router = Router()

router.get("/", (req, res) => { res.send('Hello World') });

router.post('/login' , authenticateUserController.handle);
router.post('/signin', createUserController.handle);

router.delete('/todos/:todoId', ensureAuthenticated, deleteTodoController.handle)
router.put('/todos/:todoId', ensureAuthenticated, changeCompletedController.handle)
router.post('/todos', ensureAuthenticated, createTodoController.handle);
router.get('/todos', ensureAuthenticated, listTodosController.handle);

export { router }