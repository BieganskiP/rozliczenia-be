import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Registry } from 'src/registry/registry.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    default: 'user',
  })
  role: string;

  @Column({ default: '' })
  name: string;

  @Column({ type: 'float', default: 0 })
  wage: number;

  @Column({ default: '' })
  region: string;

  @Column({ default: '' })
  car: string;

  @AfterInsert()
  logInster() {
    console.log('Inserted User with ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User');
  }
}
