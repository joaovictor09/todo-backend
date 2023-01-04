import { Router } from "express";
import { CreateUserController } from "./useCase/createUser/CreateUserController";

const createUserController = new CreateUserController();

const router = Router()

router.get("/", (req, res) => { res.send('Hello World') })

router.post('/login' )
router.post('/signin', createUserController.handle)

export { router }