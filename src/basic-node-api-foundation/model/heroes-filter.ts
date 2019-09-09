export class HeroesFilter {
    readonly heroId: number;
    readonly heroLevelMin: number;
    readonly heroLevelMax: number;

    constructor(data: any) {
        this.heroId = data.heroId;
        this.heroLevelMin = data.heroLevelMin;
        this.heroLevelMax = data.heroLevelMax;
    }
}