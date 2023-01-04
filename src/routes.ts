import { Router } from "express";
import { CreateUserController } from "./useCase/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCase/authenticateUser/AuthenticateUserController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const router = Router()

router.get("/", (req, res) => { res.send('Hello World') })

router.post('/login' , authenticateUserController.handle)
router.post('/signin', createUserController.handle)

export { router }