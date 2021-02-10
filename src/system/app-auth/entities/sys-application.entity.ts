import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sys_application' })
export class SysApplication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    nama: string;

    @Column('varchar', { length: 40 })
    app_key: string;

    @Column('varchar', { length: 20 })
    app_secret: string;

    @Column('varchar', { length: 50 })
    status: string;
}