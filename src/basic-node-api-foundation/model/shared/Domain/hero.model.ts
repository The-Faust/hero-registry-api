import {deserialize} from "cerialize";

export class HeroModel {
    @deserialize heroId!: number;
    @deserialize heroName!: string;
    @deserialize heroClass!: string;
    @deserialize heroLevel!: number;
    createdAt: Date = new Date();
}