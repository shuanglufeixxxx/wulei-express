import jwt from 'jsonwebtoken';
import debugModule from 'debug';
import { account, refreshToken } from '../../models/init-models'
import { apiPrefix, apiv1 } from "./init-routes";
import { sequelize } from "../sequelize-init";
import { QueryTypes } from 'sequelize';
import { appName } from '../../app';


const debug = debugModule(appName + ':./routes/apiv1/account.ts');

const prefix = '/account';

const ACCESS_TOKEN_HEADER_NAME = 'access-token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';


export const authHandler = (req: any, res: any, next: any) => {

    const redirect = () => {
        res.redirect(`${apiPrefix + prefix}/updateToken?&original_url=${encodeURIComponent(req.url)}`);
    }

    const token = req.headers[ACCESS_TOKEN_HEADER_NAME]
    debug(":22 %j", req.headers)
    if (token == null) return redirect();

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, user: any) => {
        if ( err || user == null ) return redirect();
        req.user = user;
        next();
    })
}


export const generateAccessToken = ( user: {id: string, username: string} ) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '86400s'})
}


const account2user = (acc: account) => {
    return {
        id: acc.id.toString(),
        username: acc.username!
    }
}


apiv1.all(prefix + '/updateToken', (req: any, res) => {

    const rt = req.cookies[REFRESH_TOKEN_COOKIE_NAME]
    debug(':51 %j', rt)
    if ( rt == null ) return res.sendStatus(401);

    refreshToken.findOne({
        where: {
            refreshToken_value: rt
        }
    })
    .then(tk => {
        if ( tk == null ) return res.sendStatus(403);

        jwt.verify(rt, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {

            if ( err || user == null ) return res.sendStatus(403);

            const accessToken = generateAccessToken(account2user(user)) //
            res.set(ACCESS_TOKEN_HEADER_NAME, accessToken)

            req.query.original_url ?
            res.redirect(`${decodeURIComponent(req.query.original_url)}`) :
            res.sendStatus(200);
        })
    })
})

const REFRESH_TOKEN_DEFAULT_PROPERTIES = {
    maxAge: 1_800_000,
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as 'strict'
}

apiv1.post(prefix + '/signIn', (req: any, res, next) => {

    req.user = null;

    account
        .findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(acc => {
            if (acc == null) return res.sendStatus(403);
            const accessToken = generateAccessToken(account2user(acc));
            const rt = jwt.sign(account2user(acc), process.env.REFRESH_TOKEN_SECRET!, {expiresIn: REFRESH_TOKEN_DEFAULT_PROPERTIES.maxAge});
            
            refreshToken.create({
                refreshToken_value: rt
            })
                .then()

            res.cookie(
                REFRESH_TOKEN_COOKIE_NAME,
                rt,
                REFRESH_TOKEN_DEFAULT_PROPERTIES
            )
            .set(ACCESS_TOKEN_HEADER_NAME, accessToken)
            .sendStatus(200)
        })
        .catch(next)
})


apiv1.post(prefix + '/signUp', (req: any, res, next) => {

    req.user = null;

    account
        .findOne({
            where: {
                username: req.body.username,
            },
        })
        .then((acc) => {
            if (acc) return res.sendStatus(409);
            debug("L118 %s", req.body.username);
            account
                .create({
                    username: req.body.username,
                    password: req.body.password,
                })
                .then((acct) => {
                    if (acct == null) return res.sendStatus(500);
                    const accessToken = generateAccessToken(account2user(acct));
                    const rt = jwt.sign(account2user(acct), process.env.REFRESH_TOKEN_SECRET!, {expiresIn: REFRESH_TOKEN_DEFAULT_PROPERTIES.maxAge});
                            
                    refreshToken.create({
                        refreshToken_value: rt
                    })
                        .then()
                    
                    res.cookie(
                        REFRESH_TOKEN_COOKIE_NAME,
                        rt,
                        REFRESH_TOKEN_DEFAULT_PROPERTIES
                    )
                    .set(ACCESS_TOKEN_HEADER_NAME, accessToken)
                    .sendStatus(200)
                })
                .catch(next);
        })
        .catch(next);
});


apiv1.post(prefix + '/signOut', (req: any, res, next) => {
    const rt = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    debug(":145 cookies %o", req.cookies);
    refreshToken
        .destroy({
            where: {
                refreshToken_value: rt
            }
        })
        .then()
    req.user = null;
    res.cookie(
        REFRESH_TOKEN_COOKIE_NAME,
        rt,
        Object.assign({}, REFRESH_TOKEN_DEFAULT_PROPERTIES, {maxAge: 0})
    )
    .sendStatus(200)
})


apiv1.get(prefix + '/retrieveAccountSignedIn', authHandler, (req: any, res) => {
    res.json(req.user && {
        id: req.user.id,
        username: req.user.username
    });
})


apiv1.get(prefix + '/exist', (req, res, next) => {
    sequelize
        .query(
            `select if ((select id from account where username = :username), true, false) as 'exists';`,
            {
                type: QueryTypes.SELECT,
                plain: true,
                replacements: {
                    username: req.query.username
                },
                fieldMap: {
                    exists: 'exist'
                }
            }
        )
        .then((exist: any) => {
            res.json(exist)
        })
        .catch(next)
})


const run = () => {}
export default run