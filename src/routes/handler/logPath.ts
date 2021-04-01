import { Request } from "express";
import { client } from "../../redis-init";
import { timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { path_logging } from "../../models/path_logging";

export const initLogPathHandler = (path: string) => {
    const key = `path_logging.count:${path}`;

    const oneDay = 24 * 60 * 60 * 1000;

    const nextMidnightTime = () => {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        return date.getTime() + oneDay - new Date().getTime()
    };

    // set expiration time for path_logging.count
    timer(nextMidnightTime() + 10)
        .subscribe((v) => {
            client.pexpire(key, oneDay);
        });

    // schedule save logs from redis to mysql
    timer(nextMidnightTime() + oneDay, oneDay)
        .pipe(switchMap((v) => client.getAsync(key)))
        .subscribe((v) => {
            path_logging
                .create({
                    path,
                    date: new Date().toISOString(),
                    count: v === null ? 0 : Number(v),
                })
                .then();
        });

    // create a path logging request handler with path
    const logPath = (req: Request, res: any, next: any) => {
        
        client.incr(key);

        next();
    };

    return logPath;
};
