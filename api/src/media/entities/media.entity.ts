import { IMedia } from './definitions/media.entity.interface';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class Media implements IMedia {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column('blob')
    content: number;

    @Column()
    source_uri: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    submited_by: string;
}