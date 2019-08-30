"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Authentication {
    constructor() {
        this.authenticator = (req, res, next) => {
            const userName = "faust";
            req.user = userName;
            next();
        };
    }
}
exports.Authentication = Authentication;
