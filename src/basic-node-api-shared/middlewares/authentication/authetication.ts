import {RequestHandlerExtension} from "../extensions/request";

export class Authentication {
    public authenticator: RequestHandlerExtension = (req, res, next) => {
        req.user = "faust";
        next()
    };
}
