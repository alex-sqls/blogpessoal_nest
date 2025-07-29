import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagens/entities/postagem.entity';
import { PostagemModule } from './postagens/postagem.module';

@Module({
  imports: [
    TypeOrmModule .forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
      logging: true
    }),
    PostagemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
