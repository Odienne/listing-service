import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToMany,
    ManyToOne
} from "typeorm";
import { Game } from "./Game";
import { Game_User_Proposition } from "./Game_User_Proposition";

@Entity()
export class Proposition {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Game_User_Proposition, game_user_proposition => game_user_proposition.user_game)
    public game_user_proposition: Game_User_Proposition[];

}