import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes';
import cors from 'cors'

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors({ origin:  ["https://www.todo.joaovictor.dev", "https://www.joaovictor.dev"]}))
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: "Error",
    message: error.message,
  })
})

app.listen(port, () => console.log('Server is running on port ', port))