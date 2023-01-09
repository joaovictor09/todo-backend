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
exports.ChangeCompletedUseCase = void 0;
const client_1 = require("../../../prisma/client");
const VerifyJwtToken_1 = require("../../../provider/VerifyJwtToken");
class ChangeCompletedUseCase {
    execute({ todoId, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyJwtTokenProvider = new VerifyJwtToken_1.VerifyJwtTokenProvider();
            const payload = yield verifyJwtTokenProvider.execute(token);
            const userId = payload.sub;
            const todoIsValid = yield client_1.client.todo.findFirstOrThrow({
                where: {
                    id: todoId,
                    AND: {
                        userId
                    }
                },
            });
            if (!todoIsValid) {
                throw new Error("This todo doesnt exist");
            }
            const changeTodo = yield client_1.client.todo.update({
                where: {
                    id: todoId,
                },
                data: {
                    completed: !todoIsValid.completed,
                }
            });
            return changeTodo;
        });
    }
}
exports.ChangeCompletedUseCase = ChangeCompletedUseCase;
