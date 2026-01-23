import { sse } from "elysia";

import { sleep } from "@/utils/sleep";
import type { HandlerCtx } from "@/types/handlers";

const francoSuicoHandler = async function* ({ request }: HandlerCtx) {
    yield sse({
        event: 'franco_suico',
        data: { status: 'connected', at: new Date().toISOString() }
    });

    while (!request.signal.aborted) {
        try {
            const resp = await fetch('https://api.frankfurter.dev/v1/latest?base=CHF&symbols=BRL');
            const json = await resp.json();

            const rate = json?.rates?.BRL;

            yield sse({
                event: 'franco_suico',
                data: {
                    pair: 'CHF/BRL',
                    rate,
                    sourceDate: json?.date,
                    sentAt: new Date().toISOString()
                }
            })
        } catch (err) {
            yield sse({
                event: 'franco_suico_error',
                data: { message: 'failed_to_fetch_rate', sendAt: new Date().toISOString() }
            })
        }

        await sleep();
    }
};

export default francoSuicoHandler;