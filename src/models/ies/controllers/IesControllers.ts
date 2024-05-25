import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { SalvarIesUseCase } from "../domain/useCases/SalvarIesUseCase";
import { IesRepository } from "../data/repository/IesRepository";
import { IesCriacaoDto, IesUpdateDto } from "../data/entity/ies";
import { request } from "http";
import { UUID } from "crypto";
import { BuscarPorCnpjIesUseCase } from "../domain/useCases/BuscarPorCnpjIesUseCase";
import { AlterarIesUseCase } from "../domain/useCases/AlterarIesUseCase";
import { DelerarIesUseCase } from "../domain/useCases/DelerarIesUseCase";

export const iesControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void) =>{
        const iesRepository = new IesRepository();
        const salvarIesUseCase = new SalvarIesUseCase(iesRepository);
        const buscarPorCnpjIesUseCase = new BuscarPorCnpjIesUseCase(iesRepository)
        const alterarIesUseCase = new AlterarIesUseCase(iesRepository)
        const deletarIesUseCase = new DelerarIesUseCase(iesRepository)

        fastify.post('/salvarIes', async (request, reply) =>{
            try{
                const ies = await salvarIesUseCase.execute(request.body as IesCriacaoDto)
                reply.code(201).send(ies)
            }catch(error){
                reply.code(500).send({error: 'Houve alum problema ao salvar'})
            }
        })

        fastify.get('/burcasIes/:cnpj',async (request,reply) => {
            try{    
                const cnpj = request.params.cnpj
                const ies = await buscarPorCnpjIesUseCase.execute(cnpj)

                if(ies){
                    reply.code(200).send(ies)
                }else{
                    reply.code(404).send({erro: 'Ies não encontrada'})
                }
            }catch(error){
                reply.code(500).send({error: 'Houve alum problema ao salvar'})
            }
        })

        fastify.put('/alterarIes/:codigo',async (request,reply) => {
            try{
                const codigo = request.params.codigo as UUID
                const iesAlterar = request.body as IesUpdateDto

                const iesAlterada = await alterarIesUseCase.execute(codigo,iesAlterar)

                reply.code(200).send(iesAlterada)
            }catch(error){
                reply.code(500).send({erro: 'Problema ao alterar'})
            }
        })

        fastify.delete('/deletar/:codigo',async (request,reply) => {
            try{    
                const codigo = request.params.codigo as UUID
                await deletarIesUseCase.execute(codigo)

                reply.code(204).send('Deletado com sucesso')
            }catch(error){
                reply.code(500).send({erro: 'Problema ao deletar'})
            }
        })

        done()
}