import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, Like, Repository } from "typeorm";
import { TemaService } from "src/tema/services/tema.service";

// Service acessa a repository que acessa o banco. (Conversa com o banco de dados através da Repository)

//controla como vai ser a busca

// regras de registro
@Injectable()
export class PostagemService {

    constructor(
        //os decorator sao aplicados em cima de algo
        //injecao de depedencias
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>, // muda o tipo dela para repository e tem como modelo postagem
        //o que e uma repository? ela e uma classe da propria typeorm - A classe repository tem os metodos de acesso aos bancos de dados
        // da poderes a postagemrepository a metodos de tb
        private temaService: TemaService,

    ) { }

    //buscar as informacoes da minha tabela do banco
    //a postagem representa minha tb
    //findAll representa tudo - um objeto em formato de array
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            //find representa o select
            relations: {
                tema: true,
                usuario: true
            },
        });
    }

    async findById(id: number): Promise<Postagem> {

        //recebe a confirmacao do banco
        // select com where de id
        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true,
                usuario: true
            }
        })

        // se retorno for null
        if (!postagem) throw new HttpException('postagem nao encontrada', HttpStatus.NOT_FOUND)
        //se nao for passado um id de busca
        //if(id == null) throw new HttpException('item nao encontrado', HttpStatus.NOT_FOUND)

        // se for direfente de nulo, ou o id tiver sido passado roda isso
        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                //ILike: case sensitive
                //like: nao case sensitive
                titulo: Like(`%${titulo}%`)
            },
            relations: {
                tema: true,
                usuario: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {

        await this.temaService.findById(postagem.tema.id)

        return await this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {

        const postagem_id = await this.findById(postagem.id);
        if (!postagem_id) {
            throw new HttpException("Postagem não encontrada", HttpStatus.NOT_FOUND);
        }
        // Verifica se o id do tema existe antes de atualizar;
        await this.temaService.findById(postagem.tema.id);
        // UPDATE tb_postagem SET postagem WHERE id = postagem.id;
        return await this.postagemRepository.save(postagem);
    }




        //busca por id
        // await this.finById(postagem.id)

        // await this.temaService.findById(postagem.tema.id)

        // //vai salvar por cima do objeto encontrado .save()
        // return await this.postagemRepository.save(postagem)

    async delete (id: number): Promise < DeleteResult > {
        await this.findById(id)

        return await this.postagemRepository.delete(id)
}

}