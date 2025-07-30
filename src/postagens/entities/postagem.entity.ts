import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//transforma classe em tabela
//postagem recebe tb_postagens - que o nome do meu database criado
@Entity({name: "tb_postagens"})
export class Postagem{

    //declara e chave primaria e que auto gerador
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length:100, nullable: false})
    titulo: string;

    @IsNotEmpty()
    @Column({length:1000, nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date;
}