import dotenv from "dotenv";

dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import expressWinston from "express-winston";
import cors from "cors";
import { pathRouterArray } from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

if (process.env.WE_WINSTON_LOG) {
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
                winston.format.prettyPrint()
            ),
        })
    );
}

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
            winston.format.prettyPrint()
        ),
    })
);

// path example '/p/21(action:sign-in)'

pathRouterArray.map(pr => {
    app.use(pr.path, pr.router)
});

const apiPathRegexStr = `
(
    ${pathRouterArray.reduce((acc, v) => `${acc}|(\\${v.path})`, "").slice(1)}
)
`;

const nonApiPathRegexStr = `
(
    (
        \\/(?!${apiPathRegexStr})
    )
    [\\w-]+
)
`;

const ordinaryPathRegexStr = `
(
    \\/[\\w-]+
)
`;

const bracketPathRegexStr = `
(
    \\(
    .*
    \\)
)
`;

const pathRegexStr = `
^
    (
        ${nonApiPathRegexStr}
        ${ordinaryPathRegexStr}*
        ${bracketPathRegexStr}?
    )?
    \\/?
$`;

const pathRegex = new RegExp(pathRegexStr.replace(/\s+/g, ""));

const staticHandler = express.static("public");

// handle static file
app.use(staticHandler);

// handle SPA routing
app.use(pathRegex, staticHandler);

const port = process.env.WE_PORT;

app.listen(port, () => {
    console.log("app listen on port %s", port);
});
