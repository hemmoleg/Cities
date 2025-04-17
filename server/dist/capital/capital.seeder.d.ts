import { OnModuleInit } from '@nestjs/common';
import { CapitalService } from './capital.service';
export declare class CapitalSeeder implements OnModuleInit {
    private readonly capitalService;
    constructor(capitalService: CapitalService);
    onModuleInit(): Promise<void>;
}
