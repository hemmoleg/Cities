import { Repository } from 'typeorm';
import { Capital } from './capital.entity';
export declare class CapitalService {
    private capitalRepository;
    constructor(capitalRepository: Repository<Capital>);
    count(): Promise<number>;
    bulkInsert(capitals: Partial<Capital>[]): Promise<void>;
    findAll(): Promise<Capital[]>;
    findByName(name: string): Promise<Capital | null>;
    create(capital: Partial<Capital>): Promise<Capital>;
    update(id: number, capital: Partial<Capital>): Promise<Capital>;
    delete(id: number): Promise<void>;
    clear(): Promise<void>;
}
