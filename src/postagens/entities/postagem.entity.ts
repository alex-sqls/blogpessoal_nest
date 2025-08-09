import { IsNotEmpty } from "class-validator";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

//transforma classe em tabela
//postagem recebe tb_postagens - que o nome do meu database criado
@Entity({name: "tb_postagens"})
//exporta a classe postagem
export class Postagem{

    //declara e chave primaria e que e auto gerador
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

    //dentro de postagem cria um coluna tema id cuja a chave estrangeira e tema_id
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'tema_id'})
    tema: Tema;
    
    //relacao com a tabela usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'usuario_id'})
    usuario: Usuario;
}