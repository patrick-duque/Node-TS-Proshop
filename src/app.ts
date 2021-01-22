import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = 8080 || process.env.PORT;

app.use(json());

app.listen(port, () => console.log(`listening in port ${port}`));
