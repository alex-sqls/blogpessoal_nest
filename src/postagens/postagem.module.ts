import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controllers/postagem.controller";
import { PostagemService } from "./service/postagem.service";
import { TemaModule } from "src/tema/tema.module";

// tudo o que eu fiz tenho que dispoinibilizar na module
@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //estou disponibilizando a postagem no typeorm
  controllers: [PostagemController], //disponibilizei o caminho
  providers: [PostagemService], //prove o servico para a aplicacao
  exports:[TypeOrmModule] //exportacao de suso
})
export class PostagemModule {}