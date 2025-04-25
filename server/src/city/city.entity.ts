import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'country'])
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  country!: string;

  @Column('float')
  latitude!: number;

  @Column('float')
  longitude!: number;
}