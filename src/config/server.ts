import fastify from "fastify";
import { iesRoutes } from "../models/ies/routes/iesRoutes";

const server = fastify()
const PORT = 3333;

server.register(iesRoutes)

server.get('/',(request, reply) => {
    return { message: 'Voce está na API da Cesul' }
})

server.listen({port: PORT}).then(() =>{
    console.log('Servidor está rodando na porta ' + PORT)
})