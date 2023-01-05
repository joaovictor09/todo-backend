import { Router } from "express";
import { CreateUserController } from "./useCase/User/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCase/User/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateTodoController } from "./useCase/Todos/createTodo/CreateTodoController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createTodoController = new CreateTodoController();

const router = Router()

router.get("/", (req, res) => { res.send('Hello World') })

router.post('/login' , authenticateUserController.handle)
router.post('/signin', createUserController.handle)

router.post('/todos', ensureAuthenticated, createTodoController.handle)
router.get('/todos', ensureAuthenticated, (req, res) => { res.json({"message": "Authenticated"}) })

export { router }