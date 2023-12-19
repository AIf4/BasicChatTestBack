import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'varchar',
    length: '300',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: '300',
  })
  password: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  type_user: boolean;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
