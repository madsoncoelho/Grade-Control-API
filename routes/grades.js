import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let grade = req.body;

        if (!grade.student || !grade.subject || !grade.type || grade.value == null) {
            throw new Error('Student, subject, type e value são obrigatórios.');
        }
        
        const data = JSON.parse(await readFile(global.fileName));

        grade = {
            id: data.nextId++,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: new Date(),
        };
        data.grades.push(grade);

        await writeFile(global.fileName, JSON.stringify(data, null, ' '));
        res.send(grade);

    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try {
        let grade = req.body;

        if (!grade.id || !grade.student || !grade.subject || !grade.type || grade.value == null) {
            throw new Error('Id, student, subject, type e value são obrigatórios.');
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.grades.findIndex(currentGrade => currentGrade.id === grade.id);

        if (index === -1) {
            throw new Error('O registro solicitado não foi encontrado.');
        }

        data.grades[index].student = grade.student;
        data.grades[index].subject = grade.subject;
        data.grades[index].type = grade.type;
        data.grades[index].value = grade.value;
        data.grades[index].timestamp = new Date();

        await writeFile(global.fileName, JSON.stringify(data, null, ' '));
        res.send(grade);

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(data, null, ' '));
        res.send(JSON.parse('{"mensagem": "O registro foi excluído com sucesso."}'));
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const grade = data.grades.find(grade => grade.id === parseInt(req.params.id));

        res.send(grade);
    } catch (err) {
        next(err);
    }
});

router.get('/:student/total/:subject', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        
        let filteredData = data.grades.filter(grade => grade.student === req.params.student);
        if (filteredData.length === 0) {
            throw new Error(`O registro ${req.params.student} não foi encontrado.`);
        }

        filteredData = filteredData.filter(grade => grade.subject === req.params.subject);
        if (filteredData.length === 0) {
            throw new Error(`O registro ${req.params.student} não possui subject ${req.params.subject}`);
        }

        const totalSum = filteredData.reduce((previous, current) => previous + current.value, 0);
        const result = { total: totalSum };

        res.send(result);
        
    } catch (err) {
        next(err);
    }
});

router.get('/:subject/avg/:type', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let filteredData = data.grades.filter(grade => grade.subject === req.params.subject);
        if (filteredData.length === 0) {
            throw new Error(`O subject ${req.params.subject} não foi encontrado.`);
        }

        filteredData = filteredData.filter(grade => grade.type === req.params.type);
        if (filteredData.length === 0) {
            throw new Error(`O type ${req.params.type} para o subject ${req.params.subject} não foi encontrado.`);
        }

        const gradesAverage = (filteredData.reduce((previous, current) => 
            previous + current.value, 0) / filteredData.length).toFixed(2);

        const result = { average: gradesAverage };
        res.send(result);

    } catch (err) {
        next(err);
    }
});

router.get('/:subject/best/:type', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let filteredData = data.grades.filter(grade => grade.subject === req.params.subject);
        if (filteredData.length === 0) {
            throw new Error(`O subject ${req.params.subject} não foi encontrado.`);
        }

        filteredData = filteredData.filter(grade => grade.type === req.params.type);
        if (filteredData.length === 0) {
            throw new Error(`O type ${req.params.type} para o subject ${req.params.subject} não foi encontrado.`);
        }
        
        const best = filteredData.sort((previous, current) => current.value - previous.value).slice(0, 3);
        res.send(best);

    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.log(err.message);
    res.status(400).send({ error: err.message });
});

export default router;