export class HeroesFilter {
    readonly heroLevelMin: number;
    readonly heroLevelMax: number;

    constructor(data: any) {
        this.heroLevelMin = data.heroLevelMin;
        this.heroLevelMax = data.heroLevelMax;
    }
}