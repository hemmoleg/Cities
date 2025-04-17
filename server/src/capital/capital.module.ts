import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capital } from './capital.entity';
import { CapitalService } from './capital.service';
import { CapitalController } from './capital.controller';
import { CapitalSeeder } from './capital.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Capital])],
  controllers: [CapitalController],
  providers: [CapitalService, CapitalSeeder],
})
export class CapitalModule {}
