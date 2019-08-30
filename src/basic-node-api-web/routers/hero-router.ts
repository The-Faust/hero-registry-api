import {Router} from "express";
import {apiCheckHeroesFilter} from "../../basic-node-api-foundation/application/hero-registry/api-check-heroes-filter";
import {apiErrorHandler} from "../../basic-node-api-shared/middlewares/errorHandling/errorHandling";

import {HeroRegistryService} from "../../basic-node-api-foundation/application/hero-registry/hero-registry-service";

import {jsonParser} from "../../basic-node-api-shared/middlewares/parsers/json-parser";

const heroRegistryService: HeroRegistryService = new HeroRegistryService();
export let heroRouter = Router();

heroRouter.get("/headers", (req, res) => res.json(req.headers));

heroRouter
    .get("/",
        apiCheckHeroesFilter,
        heroRegistryService.apiGetHeroes)
    .post("/hero",
        jsonParser,
        heroRegistryService.apiAddHero)
    .put("/hero",
        jsonParser,
        heroRegistryService.apiUpdateHero)
    .delete("/hero/:id",
        heroRegistryService.apiDeleteHeroById);

heroRouter.use(apiErrorHandler);