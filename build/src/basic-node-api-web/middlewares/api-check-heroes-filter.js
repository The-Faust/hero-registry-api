"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heroes_filter_1 = require("../../basic-node-api-foundation/infrastructure/heroes-filter");
const messages_1 = require("../../basic-node-api-foundation/model/shared/messages");
exports.apiCheckHeroesFilter = (req, res, next) => {
    const heroesFilter = new heroes_filter_1.HeroesFilter(req.query);
    for (let filter of Object.getOwnPropertyNames(req.query)) {
        if (!heroesFilter.hasOwnProperty(filter)) {
            next(new messages_1.APIError("Query string error", "No such filter", 400));
        }
    }
    next();
};
