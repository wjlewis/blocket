import express from 'express';
import path from 'path';
import { inProd } from './tools';

const app = express();

/*
 * Because the /build directory is one level up from this one, we need to adjust
 * the path to the /public directory in production.
 */
const dir = `../${inProd() ? '' : '../'}public`;
app.use(express.static(path.join(__dirname, dir)));

const port = process.env.PORT || '8080';
app.listen(port, () => console.log(`listening on ${port}`));
