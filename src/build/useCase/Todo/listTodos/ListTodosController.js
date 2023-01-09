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
exports.ListTodosController = void 0;
const ListTodosUseCase_1 = require("./ListTodosUseCase");
class ListTodosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = request.headers.authorization;
            //Verifica se o Auth Token ou title existe
            if (!authToken) {
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
            const listTodoUseCase = new ListTodosUseCase_1.ListTodosUseCase();
            const todos = yield listTodoUseCase.execute({ token });
            response.json(todos);
        });
    }
}
exports.ListTodosController = ListTodosController;
