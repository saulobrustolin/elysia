import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as authSchema from "./auth-schema";

const DATABASE_URL = process.env.DATABASE_URL!;

const queryClient = postgres(DATABASE_URL);
export const schema = { ...authSchema };

export const db = drizzle({ client: queryClient, schema });

export * from "./auth-schema";
