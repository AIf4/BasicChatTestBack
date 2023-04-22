import { User } from 'src/user/entity/User.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'chat'})
export class  Chat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: '300'
    })
    message: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt: Date;

    @OneToOne(() => User)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}

