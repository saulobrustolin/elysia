import Elysia from "elysia";

export const users = new Elysia({ prefix: '/user' })
    .get('/sign-in', 'Sign in')
    .get('/sign-up', 'Sign up')
    .get('/profile', 'Profile');
