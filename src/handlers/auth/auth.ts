import { auth } from "@/utils/auth";
import { Elysia, Context } from "elysia";

const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    
    if(BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request);
    }
    return context.status(405, "Method Not Allowed");
}

const authHandler = new Elysia().all("/auth/*", betterAuthView);

export default authHandler;