import {APIError} from "../errorHandling/messages";
import {RequestHandler} from "express";

export const headerHandler: RequestHandler = (req, res, next) => {
    if (req.accepts("application/json")) {
        next();
    }
    else {
        next(
            new APIError(
                "Content type not supported",
                "This API only supports json objects",
                400)
        );
    }
};