import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Lobby } from "./Lobby";
import { User_Game } from "./User_Game";
import { User_Trophy } from "./User_Trophy";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    @IsNotEmpty()
    email: string;

    @Column({
        length: 300,
        select: false
    })
    password: string;

    @Column({
        length: 20
    })
    @IsNotEmpty()
    nom: string;

    @Column({
        length: 20
    })
    @IsNotEmpty()
    prenom: string;
     
    @Column({
        length: 100
    })
    @IsNotEmpty()
    pseudo: string;

    @Column()
    @IsNotEmpty()
    birthday_date: Date;

    @Column()
    @IsNotEmpty()
    inscription_date: Date;

    @Column()
    @IsNotEmpty()
    last_connexion: Date;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => User_Game, user_game => user_game.game)
    public user_game: User_Game[];

    @OneToMany(() => User_Trophy, user_trophy => user_trophy.trophy)
    public user_trophy: User_Trophy[];
    
    @ManyToOne(() => Lobby, lobby => lobby.users)
    lobby: Lobby;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}