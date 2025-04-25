import { CityService } from './city.service';
import { City } from './city.entity';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    findAll(): Promise<City[]>;
    findOne(name: string): Promise<City | null>;
    create(city: Partial<City>): Promise<City>;
    update(id: string, city: Partial<City>): Promise<City>;
    remove(id: string): Promise<void>;
}
