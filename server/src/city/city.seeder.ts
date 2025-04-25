import { Injectable, OnModuleInit } from '@nestjs/common';
import { CityService } from './city.service';
import axios from 'axios';
import { City } from './city.entity';

@Injectable()
export class CitySeeder implements OnModuleInit {
  constructor(private readonly citiesService: CityService) {}

  async onModuleInit() {
    const existing = await this.citiesService.count();
    if (existing > 0) return;

    const res = await axios.get('https://restcountries.com/v3.1/all');

    const cities = res.data
      .filter((c: any) => c.capital?.[0] && c.capitalInfo?.latlng)
      .map((c: any) => ({
        name: c.capital[0],
        country: c.name.common,
        latitude: c.capitalInfo.latlng[0],
        longitude: c.capitalInfo.latlng[1],
      }));

    await this.citiesService.bulkInsert(cities);

    console.log(`Imported ${cities.length} cities`);
  }
}