import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './config/configDatabase';
import todoRoute from './router/todo.router'
import authRoute from './router/auth.router'
import userRoute from './router/user.router'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { responseData } from './helpers/response';
import { configRabbit } from './config/configRabbit';

AppDataSource.initialize().then(async () => {
    const app = express();
    const port = 3500

    // 1. Body parser
    app.use(express.json({ limit: '10kb' }));

    //  2. Logger
    app.use(morgan('dev'));

    // 3. Cookie Parser
    app.use(cookieParser());

    // 4. Cors
    app.use(
        cors({
            origin: "*",
            allowedHeaders: [
                "Access-Control-Allow-Headers",
                "Origin",
                " X-Requested-With",
                " Content-Type",
                " Accept",
                " Authorization",
                " x-access-token",
            ],
            methods: "PUT, POST, PATCH, DELETE, GET",
        })
    );

        // 5. Check Orbit
        app.get('/api', (req, res) => {
            return res.status(200).send({
                status: 'ON'
            })
        })
    

    //6. All Route
    app.use('/api', [todoRoute, authRoute, userRoute])

    //7. default non route
    app.use('*', (req: Request, res: Response) => {
        responseData('Unauthorized', { message: 'Forbidden Access' }, res)
    })

    //8. midleware error
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        const status = error.errorStatus || 500;
        const message = error.message;
        const data = error.data;

        res.status(status).json({ message: message, data: data });
    });

    //9. config rabbitmq
    configRabbit()

    //10 express listening
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    })
}).catch(error => console.log(error))