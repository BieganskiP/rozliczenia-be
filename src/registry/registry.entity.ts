import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  user_id: number;

  @Column({ type: 'float', default: 0 })
  wage: number;
}
