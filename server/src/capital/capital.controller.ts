import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CapitalService } from './capital.service';
import { Capital } from './capital.entity';

@Controller('capital')
export class CapitalController {
  constructor(private readonly capitalService: CapitalService) {}

  @Get()
  findAll(): Promise<Capital[]> {
    return this.capitalService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Capital | null> {
    return this.capitalService.findByName(name);
  }

  @Post()
  create(@Body() capital: Partial<Capital>): Promise<Capital> {
    console.log("received create call");
    console.log(capital);
    return this.capitalService.create(capital);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() capital: Partial<Capital>): Promise<Capital> {
    return this.capitalService.update(+id, capital);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.capitalService.delete(+id);
  }
}