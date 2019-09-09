// TODO: Really got to figure out a way to create dependency injection in typescript

import morgan from "morgan";
import express from "express"

import {Authentication} from "./src/basic-node-api-shared/middlewares/authentication/authetication";
import {headerHandler} from "./src/basic-node-api-shared/middlewares/authentication/header-handler";
import {heroRouter} from "./src/basic-node-api-web/routers/hero-router";

const logger = morgan("dev");

const authentication: Authentication = new Authentication();

const app = express();

app.use(authentication.authenticator);
app.use(logger);
app.use(headerHandler);

app.use("heroes", heroRouter);

app.get("/", (req, res, next) => {
    res.send("heroes registry api works")
});

app.listen(
    process.env.PORT || 8091,
    () => {
        console.log("server started...")
    });