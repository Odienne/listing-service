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
import { UserGames } from "./UserGames";

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
    dateOfBirth: Date;

    @Column()
    @IsNotEmpty()
    dateInscription: Date;

    @Column()
    @IsNotEmpty()
    dateLastConnexion: Date;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserGames, userGames => userGames.game)
    public userGames: UserGames[];
    
    @ManyToOne(() => Lobby, lobby => lobby.users)
    lobby: Lobby;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}