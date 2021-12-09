import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import { User } from "./User";
import { UserGames } from "./UserGames";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        length: 500
    })
    description: string;

    @Column()
    statut: string;

    @Column()
    tour: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => UserGames, userGames => userGames.user)
    public userGames: UserGames[];

    @OneToOne(() => User)
    @JoinColumn()
    juge: User;

}