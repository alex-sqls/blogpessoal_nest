import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, Like, Repository } from "typeorm";

// Service acessa a repository que acessa o banco. (Conversa com o banco de dados através da Repository)

//controla como vai ser a busca
 
// regras de registro
@Injectable() 
export class PostagemService {

    constructor (
        //os decorator sao aplicados encima de aslgo
        //injecao de depedencias
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem> // muda o tipo dela, para repository e tem como modelo postagem
    //o que e uma repository, ela e uma classe da propria typeorm - A classe repository tem os metodos de acesso aos bancos de dados
        // da poderes a postagemrepository a metodos de tb

    ) { }

    //buscar as informacoes da minha tabela do banco
    //a postagem representa minha tabela
    //findAll representa tudo. um objeto em formato de array
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
        //find representa o select
    }

    async finById(id : number) : Promise<Postagem> {
        
        //recebee a omfprmacao do banco
        // select com where de id
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            }
        })

        // se retorno for null
        if(!postagem) throw new HttpException('postagem nao encontrada', HttpStatus.NOT_FOUND)
        
        // se for direfente de nulo, roda isso
        return postagem;
    }

    async findAllByTitulo(titulo: string) : Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where: {
                //ILike: case sensitive
                //like: nao case sensitive
                titulo: Like(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem) : Promise<Postagem>{
        return await this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem>{

        //busca por id
        await this.finById(postagem.id)

        //vai salvar por cima do objeto encontrado .save()
        return await this.postagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.finById(id)

        return await this.postagemRepository.delete(id)
    }

}