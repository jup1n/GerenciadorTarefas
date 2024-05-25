import { exec } from "child_process";
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase";
import { FakeDataService } from "../../src/services/faker.data.services";
import { IesCriacaoDto } from "../../src/models/ies/data/entity/ies";


describe('SalvarIes',() =>{

    let salvarIesUseCase: SalvarIesUseCase
    let fakeService: any

    beforeEach(() => {        
        const iesRepository = new IesRepository();
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService()
     
    })

    it('teste de criação de nova Ies', async () =>{

        const iesCriacaoDto = {
            nome : fakeService.username,
            cnpj : fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto)

        expect(ies).toBeDefined()
        expect(ies.codigo).toBeDefined()
        expect(ies.nome).toBe(iesCriacaoDto.nome)
        expect(ies.cnpj).toBe(iesCriacaoDto.cnpj)
    })

    it('teste de criação de novo CNPJ', async () =>{
        
        const cnpj = fakeService.cnpj
        let iesTest : IesCriacaoDto ={
            nome: 'Teste1',
            cnpj
        }
        
        await salvarIesUseCase.execute(iesTest)

        iesTest.nome = 'Usuario Fralde'

        try {
            const ies = await salvarIesUseCase.execute(iesTest)
            expect(ies).toBeUndefined();
        } catch(error: any) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe("Problema ao criar IES")
        }
    })
})