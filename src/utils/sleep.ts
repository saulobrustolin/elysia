import { env } from "bun";

const RATE_BETWEEN_COIN = Number(env.RATE_BETWEEN_COIN) ?? 5000;

export const sleep = (ms: number = RATE_BETWEEN_COIN) => new Promise(r => setTimeout(r, ms));