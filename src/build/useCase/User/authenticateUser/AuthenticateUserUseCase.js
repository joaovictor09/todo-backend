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
exports.AuthenticateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../../prisma/client");
const GenerateJwtTokenProvider_1 = require("../../../provider/GenerateJwtTokenProvider");
class AuthenticateUserUseCase {
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verifica se os campos estão preenchidos
            if (!username || !password) {
                throw new Error('Username or password is empty');
            }
            //Verifica se o usuario existe
            const userAlreadyExists = yield client_1.client.user.findFirst({
                where: {
                    username
                }
            });
            if (!userAlreadyExists) {
                throw new Error('Username or Password are incorrect');
            }
            //Verifica se a senha está correta
            const passwordMatch = yield (0, bcrypt_1.compare)(password, userAlreadyExists.password);
            if (!passwordMatch) {
                throw new Error('Username or Password are incorrect');
            }
            //Gera JWT Token
            const generateJwtTokenProvider = new GenerateJwtTokenProvider_1.GenerateJwtTokenProvider();
            const token = yield generateJwtTokenProvider.execute(userAlreadyExists.id);
            return { token };
        });
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
