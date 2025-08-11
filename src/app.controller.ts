import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get() //@Get() mapeia todas as Requisições HTTP GET
  async redirect(@Res() resposta: any) {
    return resposta.redirect('/swagger');
  }
}