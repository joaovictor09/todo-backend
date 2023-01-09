"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoController = void 0;
const CreateTodoUseCase_1 = require("./CreateTodoUseCase");
class CreateTodoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = request.headers.authorization;
            const { title } = request.body;
            //Verifica se o Auth Token ou title existe
            if (!authToken || !title) {
                return response.status(401).json({
                    "message": "Token is missing"
                });
            }
            //Verifica se está no formato Bearer
            const [bearer, token] = authToken.split(" ");
            if (!token || bearer !== "Bearer") {
                return response.status(401).json({
                    "message": "Token is an invalid format"
                });
            }
            //Envia para o use case
            const createTodoUseCase = new CreateTodoUseCase_1.CreateTodoUserCase();
            const todo = yield createTodoUseCase.execute({ title, token });
            response.json(todo);
        });
    }
}
exports.CreateTodoController = CreateTodoController;
