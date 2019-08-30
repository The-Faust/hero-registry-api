import {Request, Response, NextFunction} from "express";

export interface RequestExtension extends Request {
    user?: string;
}

export interface ResponseExtension extends Response {
}

export type RequestHandlerExtension =
    (req: RequestExtension, res: ResponseExtension, next: NextFunction) => any;