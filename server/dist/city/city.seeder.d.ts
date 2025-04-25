import { OnModuleInit } from '@nestjs/common';
import { CityService } from './city.service';
export declare class CitySeeder implements OnModuleInit {
    private readonly citiesService;
    constructor(citiesService: CityService);
    onModuleInit(): Promise<void>;
}
