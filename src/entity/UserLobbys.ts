import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Lobby } from "./Lobby";

@Entity()
export class UserLobbys {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    statut: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(type => User, user => user.userLobbys, { 
        eager: true
    })
    user: User;

    @ManyToOne(type => Lobby, lobby => lobby.userLobbys, {
        eager: true
    })
    lobby: Lobby;

}
