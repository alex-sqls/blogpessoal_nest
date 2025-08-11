import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagens/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:"tb_temas"})
export class Tema {

    //definicao da chave primaria e preenchimento automatico
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    // definicao da coluna descricao, nao nula do tipo string
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    descricao: string

    //criando a relacao com a postagem - bidirecional
    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.tema) postagem: Postagem[];
}