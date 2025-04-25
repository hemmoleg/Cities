import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<City | null> {
    return this.cityService.findByName(name);
  }

  @Post()
  create(@Body() city: Partial<City>): Promise<City> {
    console.log("received create call");
    console.log(city);
    return this.cityService.create(city);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() city: Partial<City>): Promise<City> {
    return this.cityService.update(+id, city);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cityService.delete(+id);
  }
}