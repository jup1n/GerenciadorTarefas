import { IesRepository } from "../../src/models/ies/data/repository/IesRepository"
import { BuscarPorCnpjIesUseCase } from "../../src/models/ies/domain/useCases/BuscarPorCnpjIesUseCase"
import { SalvarIesUseCase } from "../../src/models/ies/domain/useCases/SalvarIesUseCase"
import { FakeDataService } from "../../src/services/faker.data.services"

describe("Busca de IES", () => {
    let buscarIesUseCas : BuscarPorCnpjIesUseCase
    let salvarIesUseCase : SalvarIesUseCase
    let fakeService : any
    
    beforeEach(() => {
        const iesRepository = new IesRepository()
        buscarIesUseCas = new BuscarPorCnpjIesUseCase(iesRepository)
        salvarIesUseCase = new SalvarIesUseCase(iesRepository)
        fakeService = FakeDataService();
    })

    
})