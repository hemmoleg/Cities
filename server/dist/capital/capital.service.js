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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapitalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const capital_entity_1 = require("./capital.entity");
let CapitalService = class CapitalService {
    constructor(capitalRepository) {
        this.capitalRepository = capitalRepository;
    }
    async count() {
        return this.capitalRepository.count();
    }
    async bulkInsert(capitals) {
        await this.capitalRepository.save(capitals);
    }
    findAll() {
        return this.capitalRepository.find();
    }
    findByName(name) {
        return this.capitalRepository
            .createQueryBuilder('capital')
            .where('LOWER(capital.name) = LOWER(:name)', { name })
            .getOne();
    }
    create(capital) {
        return this.capitalRepository.save(capital);
    }
    update(id, capital) {
        return this.capitalRepository.save(Object.assign({ id }, capital));
    }
    async delete(id) {
        await this.capitalRepository.delete(id);
    }
    async clear() {
        await this.capitalRepository.clear();
    }
};
exports.CapitalService = CapitalService;
exports.CapitalService = CapitalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(capital_entity_1.Capital)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CapitalService);
//# sourceMappingURL=capital.service.js.map