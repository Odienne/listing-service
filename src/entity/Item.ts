import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";


@Entity()
@Unique(["id"])
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    @IsNotEmpty()
    value: string;

    @Column({
        length: 255
    })
    type: string;

    @Column({
        nullable: true,
        default: null
    })
    userId: number;

    @Column({
        nullable: true,
        default: null
    })
    gameId: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
