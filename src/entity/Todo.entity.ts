import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class TodoEntity {

    @PrimaryColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    isDone: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
