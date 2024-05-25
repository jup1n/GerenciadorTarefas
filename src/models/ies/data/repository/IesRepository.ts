import { Ies } from "@prisma/client";
import prisma from "../../../../config/database";
import {  IesCriacaoDto, IesUpdateDto } from "../entity/ies";

export interface IesRepositoryInterface{
    //nome(parametro:tipo):retorno
    salvarIes(ies: IesCriacaoDto): Promise<Ies>
}

export class IesRepository implements IesRepositoryInterface{
    async salvarIes(ies: IesCriacaoDto): Promise<Ies> {
        try {
            const iesCriada = await prisma.ies.create({
                data: ies
            })

            return iesCriada
        } catch (error) {
            throw new Error('Falha ao salvar ies');
        }
    }

    async buscarIesPorCodigo(codigo: string): Promise<Ies|null>{
        try{
            return await prisma.ies.findUnique({
                where: {codigo}
            })
        }catch(error){
            throw new Error('Problema ao buscar IES')
        }
    }

    async buscarIesPorCnpj(cnpj: string): Promise<Ies|null>{
        try{
            return await prisma.ies.findUnique({
                where: {cnpj}
            })
        }catch(error){
            throw new Error('Problema ao buscar IES')
        }
    }

    async altererIes(codigo: string,ies: IesUpdateDto): Promise<Ies>{
        try{
            return await prisma.ies.update({
                where: {codigo},
                data: ies
            })
        }catch(error){
            throw new Error('Problema ao alterar IES')
        }
    }

    async deletarIes(codigo: string): Promise<void>{
        try{
            await prisma.ies.delete({
                where: {codigo},
            })
        }catch(error){
            throw new Error('Problema ao deletar IES')
        }
    }
}