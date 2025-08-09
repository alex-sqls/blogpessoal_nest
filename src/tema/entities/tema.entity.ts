import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagens/entities/postagem.entity";

@Entity({name:"tb_temas"})
export class Tema {

    //definicao da chave primaria e preenchimento automatico
    @PrimaryGeneratedColumn()
    id: number

    // definicao da coluna descricao, nao nula do tipo string
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    descricao: string

    //criando a relacao com a postagem - bidirecional
    @OneToMany(() => Postagem, (postagem) => postagem.tema) postagem: Postagem[];
}