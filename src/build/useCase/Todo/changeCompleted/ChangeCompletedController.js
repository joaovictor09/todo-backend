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
exports.ChangeCompletedController = void 0;
const EnsureAuthTokenFormat_1 = require("../../../provider/EnsureAuthTokenFormat");
const ChangeCompletedUseCase_1 = require("./ChangeCompletedUseCase");
class ChangeCompletedController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authToken = request.headers.authorization;
            const todoId = request.params.todoId;
            const ensureAuthTokenFormat = new EnsureAuthTokenFormat_1.EnsureAuthTokenFormat();
            const tokenIsValid = yield ensureAuthTokenFormat.execute(authToken);
            if (!tokenIsValid) {
                response.status(401).json({
                    "message": "Invalid token format"
                });
            }
            const changeCompletedUseCase = new ChangeCompletedUseCase_1.ChangeCompletedUseCase();
            const changedTodo = yield changeCompletedUseCase.execute({ token: tokenIsValid, todoId });
            return response.json(changedTodo);
        });
    }
}
exports.ChangeCompletedController = ChangeCompletedController;
