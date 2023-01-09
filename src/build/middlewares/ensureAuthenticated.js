"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    //Verifica se token existe
    if (!authToken) {
        return response.status(401).json({
            "message": "Token in missing"
        });
    }
    //Desestruta Bearer Token
    const [, token] = authToken.split(' ');
    if (!token) {
        return response.status(401).json({
            "message": "Token is an invalid format"
        });
    }
    try {
        (0, jsonwebtoken_1.verify)(token, "77189d47-bc7e-4fbb-9bca-9b2ff4940155");
        return next();
    }
    catch (error) {
        return response.status(401).json({
            message: "Token is invalid"
        });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
