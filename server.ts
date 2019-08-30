// TODO: Really got to figure out a way to create dependency injection in typescript

import express, {json} from "express"
import {HeroRegistryController} from "./src/basic-node-api-web/controllers/hero-registry-controller";
import * as bodyParser from "body-parser";
import {Authentication} from "./src/basic-node-api-web/middlewares/authetication";
import morgan from "morgan";
import {apiErrorHandler} from "./src/basic-node-api-web/middlewares/errorHandling/errorHandling";
import {APIError} from "./src/basic-node-api-foundation/model/shared/messages";
import {dateParam} from "./src/basic-node-api-foundation/model/shared/request-parameters";
import {apiCheckHeroesFilter} from "./src/basic-node-api-web/middlewares/api-check-heroes-filter";

const heroRegistryController: HeroRegistryController = new HeroRegistryController();
//const requestLogger: RequestLogger = new RequestLogger();
const logger = morgan("dev")
const authentication: Authentication = new Authentication();

const app = express();

const jsonParser = bodyParser.json();
//const urlEncodedParser = bodyParser.urlencoded({extended: true});

app.use(authentication.authenticator);
// app.use(requestLogger.log);
app.use(logger);

// headers handling
app.use((req, res, next) => {
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
});

app.get("/", (req, res, next) => {
    res.send("heroes registry api works")
});

// app.param("fromDate", dateParam);
// app.get("/addedAt/:fromDate", (req, res, next) => res.json(req.params));

app.get("/headers", (req, res, next) => res.json(req.headers));

app.get("/heroes",
    apiCheckHeroesFilter,
    heroRegistryController.apiGetHeroes);

app.get("/hero/:id",
    heroRegistryController.apiGetHero);

app.post("/hero",
    jsonParser,
    //urlEncodedParser,
    heroRegistryController.apiAddHero);

app.put("/hero",
    jsonParser,
    //urlEncodedParser,
    heroRegistryController.apiUpdateHero);

app.delete("/hero/:id",
    heroRegistryController.apiDeleteHeroById);

app.use(apiErrorHandler);

app.listen(
    process.env.PORT || 8091,
    () => {
        console.log("server started...")
    });