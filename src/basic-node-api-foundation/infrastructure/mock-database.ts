import {HeroModel} from "../model/shared/Domain/hero.model";
import {Guid} from "guid-typescript";

export class MockDatabase {
    public heroesList: HeroModel[] = [
        {
            heroId: 1,
            heroName: "All-Might",
            heroClass: "brawler",
            heroLevel: 100,
            createdAt: new Date()
        },
        {
            heroId: 19,
            heroName: "Deku",
            heroClass: "Tactician",
            heroLevel: 17,
            createdAt: new Date()
        },
        {
            heroId: 18,
            heroName: "Bakugo",
            heroClass: "Demo-man",
            heroLevel: 22,
            createdAt: new Date()
        }
    ];
}