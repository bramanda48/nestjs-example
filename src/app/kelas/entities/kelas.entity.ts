import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'kelas' })
export class Kelas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50 })
    nama: string;
}