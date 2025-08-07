//responsavel por interceptar a requisicao do controller para resolver localmente

//ela vai ser chamada para interceptar a requisicao e mandar para strategi para ser resolvida
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//classe de servico
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}