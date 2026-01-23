import { Elysia, sse } from "elysia";

// handlers/coins
import libraHandler from "@/handlers/coins/libra";
import francoSuicoHandler from "@/handlers/coins/franco_suico";
import euroHandler from "@/handlers/coins/euro";
import dolarHandler from "@/handlers/coins/dolar";

export const coins = new Elysia({ prefix: '/coins' })
    .get('/dolar', dolarHandler)
    .get('/euro', euroHandler)
    .get('/franco_suico', francoSuicoHandler)
    .get('/libra', libraHandler);