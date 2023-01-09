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
exports.CreateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../../prisma/client");
const GenerateJwtTokenProvider_1 = require("../../../provider/GenerateJwtTokenProvider");
class CreateUserUseCase {
    execute({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !password) {
                throw new Error("Username and password are required");
            }
            //Verify if user exists
            const userAlreadyExists = yield client_1.client.user.findFirst({
                where: {
                    username
                }
            });
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            //Hash Password
            const hashPassword = yield (0, bcrypt_1.hash)(password, 8);
            //Create user
            const user = yield client_1.client.user.create({
                data: {
                    username,
                    password: hashPassword
                }
            });
            //Return new jwt token
            const generateJwtTokenProvider = new GenerateJwtTokenProvider_1.GenerateJwtTokenProvider();
            const token = yield generateJwtTokenProvider.execute(user.id);
            return { token };
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
