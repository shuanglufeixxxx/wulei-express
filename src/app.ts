import dotenv from 'dotenv';

dotenv.config();


export const appName = 'wulei';

import express from 'express';
import bodyParser, { raw } from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
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

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    )
}));

app.use('/api-v1', apiv1);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    )
}));

// path example '/p/21(action:sign-in)'

const rawRegexStr = String.raw`^
    (
        (\/?)
        |
        (
            (
                \/(?!api)
            )
            [\w-]+
        )
    )*
    (
        \(
        .*
        \)
    )?
    \/?
$`

const regex = new RegExp(rawRegexStr.replace(/\s+/g, ''))

const staticHandler = express.static('public')

// handle static file
app.use(staticHandler)

// handle SPA routing
app.use(regex, staticHandler)

const port = 443;

app.listen(port, () => {
    console.log('app listen on port 3000')
});

setUpApiv1();