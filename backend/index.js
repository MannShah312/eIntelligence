import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import checkBrandRouter from './routes/checkBrand.js';

const app = express();
const port = 8000 || process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', checkBrandRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
