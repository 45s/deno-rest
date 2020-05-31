import { Application } from 'https://deno.land/x/oak/mod.ts';
import { port } from './constants/config.ts';
import { router } from './router.ts';

const app = new Application();

app.use(router.routes());

console.log(`App has been started on ${port}...`);
await app.listen({ port });
