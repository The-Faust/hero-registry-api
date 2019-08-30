import {RequestHandler} from "express";
import {MockDatabase} from "../../infrastructure/mock-database";
import {HeroModel} from "../../model/Domain/hero.model";
import {APIError, PublicInfo} from "../../../basic-node-api-shared/middlewares/errorHandling/messages";
import {HeroesFilter} from "../../model/heroes-filter";

export class HeroRegistryService {
    heroDatabase = new MockDatabase();

    apiGetHeroes: RequestHandler = (req, res, next) => {
        const filter = new HeroesFilter(req.query);
        const filteredData = this.heroDatabase.heroesList.filter((item: any) => {
            let conditions = [
                filter.heroId ? (item.heroId == filter.heroId): true,
                filter.heroLevelMin ? (item.heroLevel > filter.heroLevelMin): true,
                filter.heroLevelMax ? (item.heroLevel < filter.heroLevelMax): true
            ];

            return conditions.every(value => value)
        });

        res.send(filteredData);
    };

    apiGetHero: RequestHandler = (req, res, next) => {
        const heroId = +req.params.id;
        if (this.isHeroInList(heroId)) {
            res.send(this.heroDatabase.heroesList
                .find((hero: HeroModel) => hero.heroId === heroId));
        }
    };

    apiAddHero: RequestHandler = (req, res, next) => {
        const requiredFields = ["heroId", "heroName", "heroClass", "heroLevel"];
        const givenFields = Object.getOwnPropertyNames(req.body);
        if (!requiredFields.every(field => givenFields.includes(field))) {
            return next(
                new APIError(
                    "DataMissing",
                    "Not all required fields are present",
                    400)
            );
        }

        if (!this.isHeroInList(req.body.heroId)) {
            const newHero: HeroModel = req.body;
            newHero.createdAt = new Date();

            this.heroDatabase.heroesList.push(newHero);

            res.json(new PublicInfo(
                "hero added",
                200,
                {hero: newHero})
            )
        } else {
            res.send("hero already exists");
            return next(
                new APIError(
                    "HeroAlreadyExists",
                    "this hero already exists in registry",
                    400)
            )
        }
    };

    apiUpdateHero: RequestHandler = (req, res, next) => {
        const heroId = req.body.heroId;
        const heroIndex = this.heroDatabase.heroesList
            .findIndex((hero: HeroModel) => hero.heroId == heroId);

        if (heroIndex > -1) {
            this.heroDatabase.heroesList[heroIndex] = req.body;
            res.send("hero: " + heroId.toString() + " updated");
        } else {
            res.send("hero does not exist");
        }
    };

    apiDeleteHeroById: RequestHandler = (req, res, next) => {
        const heroId = +req.params.id;
        const heroIndex = this.heroDatabase.heroesList
            .findIndex((hero: HeroModel) => hero.heroId == heroId);

        if (heroIndex > -1) {
            this.heroDatabase.heroesList.splice(heroIndex, 1);
            res.send("hero with hero id: " + heroId + " deleted")
        } else {
            res.send("hero is not in registry")
        }
    };

    private isHeroInList(heroId: number): boolean {
        return this.heroDatabase.heroesList
            .some((hero: HeroModel) => hero.heroId === heroId);
    };
}