import { Request } from "express";
import { ip_logging } from "../../models/ip_logging";


export const logIp = (req: Request, res: any, next: any) => {
    const ip = req.get('X-Forwarded-For')?.match(/^[^,]+/)?.[0];

    ip_logging.create({
        ip: ip || 'anonymous',
        visit_date: new Date().toISOString(),
        path: req.originalUrl
    })

    next();
}