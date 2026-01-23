import { Elysia, file } from "elysia";

const PATH_JSON = 'counter.json';

export const files = new Elysia({ prefix: '/files' })
    .get('/video', () => file('assets/video.mp4'))
    .get('/redirect', async () => {
        const f = Bun.file(PATH_JSON);
        if (await f.exists()) {
            const json: { count: number } = await JSON.parse(await f.text() as string);
            await Bun.write(PATH_JSON, JSON.stringify({ count: json.count++ }, null, 2));

            if (json.count < 0) return file('assets/html/page_1/index.html');

            return file('assets/html/page_2/index.html');
        }
    });