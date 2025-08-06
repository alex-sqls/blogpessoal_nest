
import { PostagemService } from "../service/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from "@nestjs/common"

// responsavel pelas requisicoes e controle de acesso
// service valida isso

@Controller("/postagens")
export class PostagemController{
    //readonly so para leitura
    constructor(private readonly postagemService: PostagemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    //metodo que acessa a service
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }

    @Get('/:id') // representa o numero que vai ser passado na url - string
    @HttpCode(HttpStatus.OK)
    //metodo que acessa a service
    //pipe valida e transforma - transforma em um numero inteiro
    // e depois jogou no retorno
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.postagemService.findById(id);
    }

    //busca like por titulo como criado na regra de service
    @Get('/titulo/:titulo') 
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findAllByTitulo(titulo);
    }

    //cria
    @Post()
    @HttpCode(HttpStatus.CREATED)
    //body converte json em objeto
    create(@Body() postagem: Postagem) : Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    //atualiza
    @Put()
    @HttpCode(HttpStatus.CREATED)
    update(@Body() postagem: Postagem) : Promise<Postagem> {
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postagemService.delete(id)
    }
}