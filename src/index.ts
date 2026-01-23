import { appRouter } from "./routes/main";

appRouter
  .listen(3000);

  // appRouter.handle(new Request('http://localhost:3000/user/profile')).then(console.log)

console.log(
  `🦊 Elysia is running at ${appRouter.server?.hostname}:${appRouter.server?.port}`
);
