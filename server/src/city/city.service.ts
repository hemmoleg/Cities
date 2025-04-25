import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async count(): Promise<number> {
    return this.cityRepository.count();
  }

  async bulkInsert(citys: Partial<City>[]): Promise<void> {
    await this.cityRepository.save(citys);
  }

  findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  findByName(name: string): Promise<City | null> {
    return this.cityRepository
      .createQueryBuilder('city')
      .where('LOWER(city.name) = LOWER(:name)', { name })
      .getOne();
  }

  create(city: Partial<City>): Promise<City> {
    return this.cityRepository.save(city);
  }

  update(id: number, city: Partial<City>): Promise<City> {
    return this.cityRepository.save({ id, ...city });
  }

  async delete(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }

  async clear(): Promise<void> {
    await this.cityRepository.clear(); // Achtung: löscht alle Datensätze
  }
}