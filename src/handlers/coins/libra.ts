import { sse } from "elysia";
import { sleep } from "@utils/sleep";

import type { HandlerCtx } from "@/types/handlers";

const libraHandler = async function* ({ request }: HandlerCtx) {
    yield sse({
        event: 'libra',
        data: { status: 'connected', at: new Date().toISOString() }
    });

    while (!request.signal.aborted) {
        try {
            const resp = await fetch('https://api.frankfurter.dev/v1/latest?base=GBP&symbols=BRL');
            const json = await resp.json();

            const rate = json?.rates?.BRL;

            yield sse({
                event: 'libra',
                data: {
                    pair: 'GBP/BRL',
                    rate,
                    sourceDate: json?.date,
                    sentAt: new Date().toISOString()
                }
            })
        } catch (err) {
            yield sse({
                event: 'libra_error',
                data: { message: 'failed_to_fetch_rate', sendAt: new Date().toISOString() }
            })
        }

        await sleep(1000);
    }
};

export default libraHandler;