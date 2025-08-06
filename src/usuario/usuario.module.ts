import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)], 
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule {}


