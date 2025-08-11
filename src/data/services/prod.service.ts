import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      //define o endereço do servidor, a porta, o usuário, a senha e o nome do Banco de dados. Essa url será enviada pelo Render
      url: process.env.DATABASE_URL,
      logging: false,
      //impedir que todas as tabelas do Banco de dados sejam apagadas e recriadas todas as vezes que a aplicação for reiniciada
      dropSchema: false, 
      ssl: {
        rejectUnauthorized: false, //desabilitar o SSL na comunicação com o Banco de dados
      },
      synchronize: true, //serão criadas/atualizadas automaticamente em cada inicialização da aplicação
      autoLoadEntities: true,
    };
  }
}