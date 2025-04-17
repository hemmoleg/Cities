import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capital } from './capital.entity';

@Injectable()
export class CapitalService {
  constructor(
    @InjectRepository(Capital)
    private capitalRepository: Repository<Capital>,
  ) {}

  async count(): Promise<number> {
    return this.capitalRepository.count();
  }

  async bulkInsert(capitals: Partial<Capital>[]): Promise<void> {
    await this.capitalRepository.save(capitals);
  }

  findAll(): Promise<Capital[]> {
    return this.capitalRepository.find();
  }

  findByName(name: string): Promise<Capital | null> {
    return this.capitalRepository
      .createQueryBuilder('capital')
      .where('LOWER(capital.name) = LOWER(:name)', { name })
      .getOne();
  }

  create(capital: Partial<Capital>): Promise<Capital> {
    return this.capitalRepository.save(capital);
  }

  update(id: number, capital: Partial<Capital>): Promise<Capital> {
    return this.capitalRepository.save({ id, ...capital });
  }

  async delete(id: number): Promise<void> {
    await this.capitalRepository.delete(id);
  }

  async clear(): Promise<void> {
    await this.capitalRepository.clear(); // Achtung: löscht alle Datensätze
  }
}