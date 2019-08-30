"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockDatabase {
    constructor() {
        this.heroesList = [
            {
                heroId: 1,
                heroName: "All-Might",
                heroClass: "brawler",
                heroLevel: 100
            },
            {
                heroId: 19,
                heroName: "Deku",
                heroClass: "Tactician",
                heroLevel: 17
            },
            {
                heroId: 18,
                heroName: "Bakugo",
                heroClass: "Demo-man",
                heroLevel: 22
            }
        ];
    }
}
exports.MockDatabase = MockDatabase;
