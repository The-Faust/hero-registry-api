import {RequestHandlerExtension} from "./extensions/request";

// TODO: replace this by morgan
export class RequestLogger {
    public log: RequestHandlerExtension = (req, res, next) => {
        console.log(
            new Date() + " - "
            + req.method + " Request to "
            + req.path + " by: "
            + req.user);
        next();
    }
}