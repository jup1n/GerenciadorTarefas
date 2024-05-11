import { UUID } from "crypto";
import { IesRepository } from "../../data/repository/IesRepository";
import { IesUpdateDto } from "../../data/entity/ies";
import { Ies } from "@prisma/client";

export class AlterarIesUseCase{
    constructor(private iesRepository: IesRepository){}
    async execute(codigo: UUID,iesUpdate: IesUpdateDto):Promise<Ies>{
        try{
            return await this.iesRepository.altererIes(codigo,iesUpdate)
        }catch(error){
            throw new Error('Problema ao alterar IES')
        }
    }
}