import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('testes dos modulos usuario e auth (e2e)', () => {

  let token: any; //o token para ter acesso, guardar
  let usuarioId: any; //modulo usuario
  let app: INestApplication; //toda a aplicacao nest

  //sempre o executado primeiro - ele que cria o ambiente, para que os outros terstes facam sentido
  beforeAll(async () => {
    //moduloFix: configura todo o modulo para testes
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', //banco em memoria
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], // as entidades que ele vai criar, no caso todas em entities
          synchronize: true,
          dropSchema: true, //garatir que esse banco comece zerado. Toda vez que executa ele limpa
        }),
        AppModule], // app modulo traz toda a estrutra/modulos do projeto
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init(); //faz a execucao e inicializa
  });

  afterAll(async () => {
    await app.close();
  }) // depois que todos os testes tiver passado, ele executa afterAll

  //it teste isolado
  //ele e um async pois precisa da resposta do banco
  it("01 - Deve Cadastrar um novo Usuário", async () => {
    //request trabalha com requisicao http e ter resposta - primeiro: caminho; segundo:endpoint com o verbo; terceiro envia o json
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201) //espera que esse metodo retorne 201(deu certo)

    usuarioId = resposta.body.id;

  });

  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400)

  });

  it("03 - Deve Autenticar o Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/logar")
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',
    })
    .expect(200)

    token = resposta.body.token;

  })

  it("04 - Deve Listar todos os Usuários", async () => {
    return request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  })

  it("05 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Atualizado',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(200)
    .then( resposta => {
      expect("Root Atualizado").toEqual(resposta.body.nome);
    })

  })

});
