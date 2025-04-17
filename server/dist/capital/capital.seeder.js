"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalSeeder = void 0;
const common_1 = require("@nestjs/common");
const capital_service_1 = require("./capital.service");
const axios_1 = require("axios");
let CapitalSeeder = class CapitalSeeder {
    constructor(capitalService) {
        this.capitalService = capitalService;
    }
    async onModuleInit() {
        const existing = await this.capitalService.count();
        if (existing > 0)
            return;
        const res = await axios_1.default.get('https://restcountries.com/v3.1/all');
        const capitals = res.data
            .filter((c) => { var _a, _b; return ((_a = c.capital) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = c.capitalInfo) === null || _b === void 0 ? void 0 : _b.latlng); })
            .map((c) => ({
            name: c.capital[0],
            country: c.name.common,
            latitude: c.capitalInfo.latlng[0],
            longitude: c.capitalInfo.latlng[1],
        }));
        await this.capitalService.bulkInsert(capitals);
        console.log(`Imported ${capitals.length} capitals`);
    }
};
exports.CapitalSeeder = CapitalSeeder;
exports.CapitalSeeder = CapitalSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [capital_service_1.CapitalService])
], CapitalSeeder);
//# sourceMappingURL=capital.seeder.js.map