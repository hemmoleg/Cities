import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalModule } from './capital/capital.module';
import { Capital } from './capital/capital.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Capital],
      synchronize: false,
    }),
    CapitalModule,
  ],
})
export class AppModule {}