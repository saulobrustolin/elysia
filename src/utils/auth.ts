import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "@/database/schema";
import { createClient } from "redis";
import { sendEmail } from "@/email/email";

const redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

await redis.connect();

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void sendEmail({
                to: user.email,
                subject: "Verificação de e-mail",
                text: `Clique no endereço URL para verificar o seu email: ${url}`,
            })
        }
    },
    rateLimit: {
        enabled: true,
        window: 10,
        max: 5,
        customStorage: {
            async get(key) {
                const raw = await redis.get(key);
                return raw ? JSON.parse(raw) : undefined;
            },
            async set(key, value) {
                await redis.set(key, JSON.stringify(value));
            },
        },
    }
});
