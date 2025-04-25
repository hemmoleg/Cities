import { Repository } from 'typeorm';
import { City } from './city.entity';
export declare class CityService {
    private cityRepository;
    constructor(cityRepository: Repository<City>);
    count(): Promise<number>;
    bulkInsert(citys: Partial<City>[]): Promise<void>;
    findAll(): Promise<City[]>;
    findByName(name: string): Promise<City | null>;
    create(city: Partial<City>): Promise<City>;
    update(id: number, city: Partial<City>): Promise<City>;
    delete(id: number): Promise<void>;
    clear(): Promise<void>;
}
