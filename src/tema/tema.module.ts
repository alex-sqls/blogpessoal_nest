import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";
import { TemaController } from "./controllers/tema.controller";

//onde a gente declara e deixa claro a partes onde tem acesso

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService],
    controllers: [TemaController],
    exports: [TemaService]
})
export class TemaModule {}