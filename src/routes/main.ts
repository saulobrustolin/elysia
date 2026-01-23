import { Elysia } from "elysia";
import { coins } from "./coins";
import { users } from "./users";
import { files } from "./files";

export const appRouter = new Elysia()
    .use(users)
    .use(coins)
    .use(files);
