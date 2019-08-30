"use strict";
// TODO: Really got to figure out a way to create dependency injection in typescript
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hero_registry_controller_1 = require("./src/basic-node-api-web/controllers/hero-registry-controller");
const bodyParser = __importStar(require("body-parser"));
const authetication_1 = require("./src/basic-node-api-web/middlewares/authetication");
const morgan_1 = __importDefault(require("morgan"));
const errorHandling_1 = require("./src/basic-node-api-web/middlewares/errorHandling/errorHandling");
const messages_1 = require("./src/basic-node-api-foundation/model/shared/messages");
const api_check_heroes_filter_1 = require("./src/basic-node-api-web/middlewares/api-check-heroes-filter");
const heroRegistryController = new hero_registry_controller_1.HeroRegistryController();
//const requestLogger: RequestLogger = new RequestLogger();
const logger = morgan_1.default("dev");
const authentication = new authetication_1.Authentication();
const app = express_1.default();
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
        next(new messages_1.APIError("Content type not supported", "This API only supports json objects", 400));
    }
});
app.get("/", (req, res, next) => {
    res.send("heroes registry api works");
});
// app.param("fromDate", dateParam);
// app.get("/addedAt/:fromDate", (req, res, next) => res.json(req.params));
app.get("/headers", (req, res, next) => res.json(req.headers));
app.get("/heroes", api_check_heroes_filter_1.apiCheckHeroesFilter, heroRegistryController.apiGetHeroes);
app.get("/hero/:id", heroRegistryController.apiGetHero);
app.post("/hero", jsonParser, 
//urlEncodedParser,
heroRegistryController.apiAddHero);
app.put("/hero", jsonParser, 
//urlEncodedParser,
heroRegistryController.apiUpdateHero);
app.delete("/hero/:id", heroRegistryController.apiDeleteHeroById);
app.use(errorHandling_1.apiErrorHandler);
app.listen(process.env.PORT || 8091, () => {
    console.log("server started...");
});
