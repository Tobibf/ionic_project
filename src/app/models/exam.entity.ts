
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  score: number | undefined;

  @Column()
  course: string | undefined;

  @Column()
  semester: number | undefined;
}
