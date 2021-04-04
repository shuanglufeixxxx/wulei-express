import { Request } from "express";
import { ip_logging } from "../../models/ip_logging";
import axios from "axios";

const getIpGeo = async (ip: string) => {
    const response = await axios({
        method: "get",
        url: `https://ipapi.co/${ip}/json`,
    });
    return response.data;
};

export const logIp = (req: Request, res: any, next: any) => {
    const ip = req.get("X-Forwarded-For")?.match(/^[^,]+/)?.[0];

    ip &&
        getIpGeo(ip).then((geo) => {

            ip_logging.create({
                ip: ip || "anonymous",
                visit_date: new Date().toISOString(),
                path: req.originalUrl,
                referrer: req.get("referrer"),
                country: (geo as any)['country_name'],
                region: (geo as any).region,
                city: (geo as any).city,
            });
        });

    next();
};
