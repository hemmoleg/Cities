import { Injectable, OnModuleInit } from '@nestjs/common';
import { CapitalService } from './capital.service';
import axios from 'axios';
import { Capital } from './capital.entity';

@Injectable()
export class CapitalSeeder implements OnModuleInit {
  constructor(private readonly capitalService: CapitalService) {}

  async onModuleInit() {
    const existing = await this.capitalService.count();
    if (existing > 0) return;

    const res = await axios.get('https://restcountries.com/v3.1/all');
    const capitals = res.data
      .filter((c: any) => c.capital?.[0] && c.capitalInfo?.latlng)
      .map((c: any) => ({
        name: c.capital[0],
        country: c.name.common,
        latitude: c.capitalInfo.latlng[0],
        longitude: c.capitalInfo.latlng[1],
      }));

    await this.capitalService.bulkInsert(capitals);

    console.log(`Imported ${capitals.length} capitals`);
  }
}