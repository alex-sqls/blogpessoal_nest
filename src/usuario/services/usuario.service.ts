import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { Postagem } from 'src/postagens/entities/postagem.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            },
            //Além de buscar o usuário, traga também as postagens (postagem) que estão associadas a ele.
            relations: {
                postagem: true
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            //retorna a busca com a relacao
            relations: {
            postagem: true
        }
        });
    }

        async findById(id: number): Promise<Usuario> {
 
        const usuario = await this.usuarioRepository.findOne({
            //na busca por id exibe a tabela postagem
            where: {
                id
            },
            relations: {
             postagem: true,
      }
        });
 
        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
 
        return usuario;
 
    }

    async create(usuario: Usuario): Promise<Usuario> {
        //busca o usuario no banco
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
        //se existir erro
        if (buscaUsuario)
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);
        //se nao pede para cadastrar a senha
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        if(usuario.id == undefined) throw new HttpException('id nao informado', HttpStatus.BAD_REQUEST)

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

}