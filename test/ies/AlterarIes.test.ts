import { IesCriacaoDto, IesUpdateDto } from "../../src/models/ies/data/entity/ies"
import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { AlterarIesUseCase } from "../../src/models/ies/domain/useCases/AlterarIesUseCase"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase"
import { FakeDataService } from "../../src/services/faker.data.services"

describe("AlteracaoIesTest", () => {
    let alterarIesUseCas : AlterarIesUseCase
    let salvarIesUseCase : SalvarIesUseCase
    let fakeService : any
    
    beforeEach(() => {
        const iesRepository = new IesRepository()
        alterarIesUseCas = new AlterarIesUseCase(iesRepository)
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService()
    })

    it('teste de alteraçao de nova Ies', async () =>{

        const iesCriacaoDto: IesCriacaoDto = {
            nome : fakeService.username,
            cnpj : fakeService.cnpj
        }

        const ies = await salvarIesUseCase.execute(iesCriacaoDto)

        const iesAlterarDto : IesUpdateDto = {
            nome: "UPDATE IES"
        }

        const iesUpdate = await alterarIesUseCas.execute(ies.codigo, iesAlterarDto)
        
        expect(iesUpdate).toBeDefined()
        expect(iesUpdate.codigo).toBe(ies.codigo)
        expect(iesUpdate.cnpj).toBe(ies.cnpj)
        expect(iesUpdate.nome).toBe(iesAlterarDto.nome)
    })
})