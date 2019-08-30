"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: replace this by morgan
class RequestLogger {
    constructor() {
        this.log = (req, res, next) => {
            console.log(new Date() + " - "
                + req.method + " Request to "
                + req.path + " by: "
                + req.user);
            next();
        };
    }
}
exports.RequestLogger = RequestLogger;
