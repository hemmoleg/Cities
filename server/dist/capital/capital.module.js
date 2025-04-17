"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const capital_entity_1 = require("./capital.entity");
const capital_service_1 = require("./capital.service");
const capital_controller_1 = require("./capital.controller");
const capital_seeder_1 = require("./capital.seeder");
let CapitalModule = class CapitalModule {
};
exports.CapitalModule = CapitalModule;
exports.CapitalModule = CapitalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([capital_entity_1.Capital])],
        controllers: [capital_controller_1.CapitalController],
        providers: [capital_service_1.CapitalService, capital_seeder_1.CapitalSeeder],
    })
], CapitalModule);
//# sourceMappingURL=capital.module.js.map