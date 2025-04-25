import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CitySeeder } from './city.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CitySeeder],
})
export class CityModule {}
