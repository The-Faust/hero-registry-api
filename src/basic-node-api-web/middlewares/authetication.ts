import {RequestHandlerExtension} from "./extensions/request";

export class Authentication {
    public authenticator: RequestHandlerExtension = (req, res, next) => {
        const userName = "faust";
        req.user = userName;
        next()
    };
}
