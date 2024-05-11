import { UUID } from "crypto";
import { IesRepository } from "../../data/repository/IesRepository";

export class BuscarPorCnpjIesUseCase{
    constructor(private iesRepository: IesRepository){}
    async execute(cnpj:string){
        try{
            return await this.iesRepository.buscarIesPorCnpj(cnpj)
        }catch(error){
            throw new Error('Problema ao deletar IES')
        }
    }
}