import type { HandlerCtx } from "@/types/handlers";
import { sleep } from "@/utils/sleep";
import { sse } from "elysia";

const euroHandler = async function* ({ request }: HandlerCtx) {
    yield sse({
        event: 'euro',
        data: { status: 'connected', at: new Date().toISOString() }
    });

    while (!request.signal.aborted) {
        try {
            const resp = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=BRL');
            const json = await resp.json();

            const rate = json?.rates?.BRL;

            yield sse({
                event: 'euro',
                data: {
                    pair: 'EUR/BRL',
                    rate,
                    sourceDate: json?.date,
                    sentAt: new Date().toISOString()
                }
            })
        } catch (err) {
            yield sse({
                event: 'euro_error',
                data: { message: 'failed_to_fetch_rate', sendAt: new Date().toISOString() }
            })
        }

        await sleep();
    }
};

export default euroHandler;