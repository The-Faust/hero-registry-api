"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cerialize_1 = require("cerialize");
class HeroModel {
}
__decorate([
    cerialize_1.deserialize
], HeroModel.prototype, "heroId", void 0);
__decorate([
    cerialize_1.deserialize
], HeroModel.prototype, "heroName", void 0);
__decorate([
    cerialize_1.deserialize
], HeroModel.prototype, "heroClass", void 0);
__decorate([
    cerialize_1.deserialize
], HeroModel.prototype, "heroLevel", void 0);
exports.HeroModel = HeroModel;
