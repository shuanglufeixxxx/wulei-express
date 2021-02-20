import dotenv from 'dotenv';

dotenv.config();


export const appName = 'wulei';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import setUpApiv1 from './routes/apiv1/setUpApiv1';
import { apiv1 } from './routes/apiv1/init-routes';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser())
// app.use(helmet())
app.use('/api-v1', apiv1);

app.listen(3000, () => {
    console.log('app listen on port 3000')
});

setUpApiv1();