import { Elysia } from "elysia";
import { coins } from "./coins";
import { users } from "./users";
import { files } from "./files";
import authHandler from "@/handlers/auth/auth";

export const appRouter = new Elysia()
    .group('/api', app =>
        app
            .use(users)
            .use(coins)
            .use(files)
            .use(authHandler)
    );
