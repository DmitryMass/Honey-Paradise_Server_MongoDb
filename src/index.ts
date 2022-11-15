import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import router from './routes/router';

const app = express();

app.use(fileUpload());
app.use(
    cors({
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        origin: '*',
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandler);

app.use('/', (req, res) => {
    return res.status(200).send({ message: 'hello GET' });
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI!);
        app.listen(process.env.PORT || 5005, () => {
            console.log(`Server on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
