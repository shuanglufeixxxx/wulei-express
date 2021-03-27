import { Request } from "express";
import { client } from "../../redis-init";
import { of, timer } from "rxjs";
import { concatMap, switchMap } from "rxjs/operators";
import { path_logging } from "../../models/path_logging";

export const initLogPathHandler = (path: string) => {
    const key = `path_logging.count:${path}`;

    const nextMidnightTime = () => {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() + 1);
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        return date;
    };

    const timeInterval = () =>
        new Date().getTime() - nextMidnightTime().getTime();

    // set expiration time for path_logging.count
    of(null)
        .pipe(
            concatMap((v) => {
                return timer(nextMidnightTime());
            })
        )
        .subscribe((v) => {
            if (v === null) {
                client.pexpireat(key, timeInterval() - 5);
            } else {
                client.pexpire(key, 24 * 60 * 60 * 1000);
            }
        });

    // schedule save logs from redis to mysql
    timer(timeInterval() - 10, 24 * 60 * 60 * 1000)
        .pipe(switchMap((v) => client.getAsync(path)))
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
        const key = `path_logging.count:${path}`;
        
        client.incr(key);

        next();
    };

    return logPath;
};
