import express from 'express';
import { promises as fs } from 'fs';

import gradesRouter from './routes/grades.js';

const { readFile, writeFile } = fs;

global.fileName = 'grades.json';

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName);
        console.log('API Started.');
    }
    catch (err) {
        console.log(`File "${global.fileName} doesn't exist."`);
    }
});