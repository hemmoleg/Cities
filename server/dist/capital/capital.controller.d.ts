import { CapitalService } from './capital.service';
import { Capital } from './capital.entity';
export declare class CapitalController {
    private readonly capitalService;
    constructor(capitalService: CapitalService);
    findAll(): Promise<Capital[]>;
    findOne(name: string): Promise<Capital | null>;
    create(capital: Partial<Capital>): Promise<Capital>;
    update(id: string, capital: Partial<Capital>): Promise<Capital>;
    remove(id: string): Promise<void>;
}
