"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_database_1 = require("../../basic-node-api-foundation/infrastructure/mock-database");
const messages_1 = require("../../basic-node-api-foundation/model/shared/messages");
const heroes_filter_1 = require("../../basic-node-api-foundation/infrastructure/heroes-filter");
class HeroRegistryController {
    constructor() {
        this.heroDatabase = new mock_database_1.MockDatabase();
        this.apiGetHeroes = (req, res, next) => {
            const filter = new heroes_filter_1.HeroesFilter(req.query);
            const filteredData = this.heroDatabase.heroesList.filter((item) => {
                let conditions = [
                    filter.heroLevelMin ? (item.heroLevel > filter.heroLevelMin) : true,
                    filter.heroLevelMax ? (item.heroLevel < filter.heroLevelMax) : true
                ];
                return conditions.every(value => value);
            });
            res.send(filteredData);
        };
        this.apiGetHero = (req, res, next) => {
            const heroId = +req.params.id;
            if (this.isHeroInList(heroId)) {
                res.send(this.heroDatabase.heroesList
                    .find((hero) => hero.heroId === heroId));
            }
        };
        this.apiAddHero = (req, res, next) => {
            const requiredFields = ["heroId", "heroName", "heroClass", "heroLevel"];
            const givenFields = Object.getOwnPropertyNames(req.body);
            if (!requiredFields.every(field => givenFields.includes(field))) {
                return next(new messages_1.APIError("DataMissing", "Not all required fields are present", 400));
            }
            if (!this.isHeroInList(req.body.heroId)) {
                const newHero = req.body;
                newHero.createdAt = new Date();
                this.heroDatabase.heroesList.push(newHero);
                res.json(new messages_1.PublicInfo("hero added", 200, { hero: newHero }));
            }
            else {
                res.send("hero already exists");
                return next(new messages_1.APIError("HeroAlreadyExists", "this hero already exists in registry", 400));
            }
        };
        this.apiUpdateHero = (req, res, next) => {
            const heroId = req.body.heroId;
            const heroIndex = this.heroDatabase.heroesList
                .findIndex((hero) => hero.heroId == heroId);
            if (heroIndex > -1) {
                this.heroDatabase.heroesList[heroIndex] = req.body;
                res.send("hero: " + heroId.toString() + " updated");
            }
            else {
                res.send("hero does not exist");
            }
        };
        this.apiDeleteHeroById = (req, res, next) => {
            const heroId = +req.params.id;
            const heroIndex = this.heroDatabase.heroesList
                .findIndex((hero) => hero.heroId == heroId);
            if (heroIndex > -1) {
                this.heroDatabase.heroesList.splice(heroIndex, 1);
                res.send("hero with hero id: " + heroId + " deleted");
            }
            else {
                res.send("hero is not in registry");
            }
        };
    }
    isHeroInList(heroId) {
        return this.heroDatabase.heroesList
            .some((hero) => hero.heroId === heroId);
    }
    ;
}
exports.HeroRegistryController = HeroRegistryController;
