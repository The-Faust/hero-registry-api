import {RequestHandler} from "express";
import {HeroesFilter} from "../../basic-node-api-foundation/infrastructure/heroes-filter";
import {APIError} from "../../basic-node-api-foundation/model/shared/messages";

export const apiCheckHeroesFilter: RequestHandler = (req, res, next) => {
    const heroesFilter = new HeroesFilter(req.query);

    for (let filter of Object.getOwnPropertyNames(req.query)) {
        if (!heroesFilter.hasOwnProperty(filter)) {
            next(
                new APIError(
                    "Query string error",
                    "No such filter",
                    400)
            );
        }
    }

    next();
};