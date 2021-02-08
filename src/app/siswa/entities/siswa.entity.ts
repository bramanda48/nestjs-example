import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'siswa' })
export class Siswa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { width: 11 })
    id_kelas: number;

    @Column('varchar', { length: 50 })
    nama: string;

    @Column('date')
    tgl_lahir: Date;

    @Column('datetime')
    tgl_insert: Date;

    @Column('datetime')
    last_update: Date;
}
