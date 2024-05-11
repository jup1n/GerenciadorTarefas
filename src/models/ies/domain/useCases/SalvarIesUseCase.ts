import { IesCriacaoDto } from "../../data/entity/ies";
import { IesRepository } from "../../data/repository/IesRepository";

export class SalvarIesUseCase {

    constructor(private iesRepository: IesRepository){}

    async execute(ies: IesCriacaoDto){
        try{
            const IesCriada = await this.iesRepository.salvarIes(ies);
            return IesCriada;
        }catch (error){
            throw new Error('Problema ao criar IES')
        }
    } 
}