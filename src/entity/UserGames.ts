import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Game } from "./Game";
import { User } from "./User";

@Entity()
export class UserGames {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    score: number;

    @ManyToOne(type => Game, game => game.userGames, {
        eager: true
    })
    game: Game;

    @ManyToOne(type => User, user => user.userGames, {
        eager: true
    })
    user: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
