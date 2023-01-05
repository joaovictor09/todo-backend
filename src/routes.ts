import { Router } from "express";
import { CreateUserController } from "./useCase/User/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCase/User/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const router = Router()

router.get("/", (req, res) => { res.send('Hello World') })

router.post('/login' , authenticateUserController.handle)
router.post('/signin', createUserController.handle)
router.get('/todos', ensureAuthenticated, (req, res) => { res.json({"message": "Authenticated"}) })

export { router }