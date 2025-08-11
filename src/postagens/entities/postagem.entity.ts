import { IsNotEmpty } from "class-validator";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

//transforma classe em tabela
//postagem recebe tb_postagens - que o nome do meu database criado
@Entity({name: "tb_postagens"})
//exporta a classe postagem
export class Postagem{

    //declara e chave primaria e que e auto gerador
    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    titulo: string;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length:1000, nullable: false})
    texto: string;

    @ApiProperty() 
    @UpdateDateColumn()
    data: Date;

    //dentro de postagem cria um coluna tema id cuja a chave estrangeira e tema_id
    @ApiProperty({ type: () => Tema }) 
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'tema_id'})
    tema: Tema;
    
    //relacao com a tabela usuario
    @ApiProperty({ type: () => Usuario }) 
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'usuario_id'})
    usuario: Usuario;
}