import { sse } from "elysia";

import { HandlerCtx } from "@/types/handlers";
import { sleep } from "@/utils/sleep";

const dolarHandler = async function* ({ request }: HandlerCtx) {
        yield sse({
            event: 'dolar',
            data: { status: 'connected', at: new Date().toISOString() }
        });

        while (!request.signal.aborted) {
            try {
                const resp = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL');
                const json = await resp.json();

                const rate = json?.rates?.BRL;

                yield sse({
                    event: 'dolar',
                    data: {
                        pair: 'USD/BRL',
                        rate,
                        sourceDate: json?.date,
                        sentAt: new Date().toISOString()
                    }
                })
            } catch (err) {
                yield sse({
                    event: 'dolar_error',
                    data: { message: 'failed_to_fetch_rate', sendAt: new Date().toISOString() }
                })
            }

            await sleep();
        }
    };

export default dolarHandler;