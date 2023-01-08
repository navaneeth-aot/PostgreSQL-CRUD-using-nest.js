import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studentstable')
export class studentEntity {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    secondName: string;

    @Column({ default: '' })
    physics: number;

    @Column({ default: '' })
    maths: number;
     
}