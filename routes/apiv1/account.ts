import jwt from 'jsonwebtoken';
import debugModule from 'debug';
import { account } from '../../models/init-models'
import { apiv1 } from "./init-routes";
import { sequelize } from "../sequelize-init";
import { QueryTypes } from 'sequelize';
import { appName } from '../../app';


const debug = debugModule(appName + ':./routes/apiv1/account.ts');

const prefix = '/account';


const authenticateFn = (req: any, res: any, next: any, required: boolean) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (required && token == null) return res.sendStatus(401)

    token && jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, user: any) => {
        if ( required && err) return res.sendStatus(403);
        req.user = user;
        debug("auth success %o", user);
        if ( required && user ) next();
    })

    if ( !required ) next();
}


export const authenticate = {
    required: (req: any, res: any, next: any) => authenticateFn(req, res, next, true),
    optional: (req: any, res: any, next: any) => authenticateFn(req, res, next, false),
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


apiv1.post(prefix + '/signIn', authenticate.optional, (req: any, res, next) => {

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
            res.json({
                accessToken: accessToken
            })
        })
        .catch(next)
})


apiv1.post(prefix + '/signUp', authenticate.optional, (req: any, res, next) => {

    req.user = null;

    account
        .findOne({
            where: {
                username: req.body.username,
            },
        })
        .then((acc) => {
            if (acc) return res.sendStatus(409);
            account
                .create({
                    username: req.body.username,
                    password: req.body.password,
                })
                .then((acct) => {
                    if (acct == null) return res.sendStatus(500);
                    const accessToken = generateAccessToken(account2user(acct));
                    res.json({
                        accessToken: accessToken,
                    });
                })
                .catch(next);
        })
        .catch(next);
});


apiv1.get(prefix + '/exist', authenticate.optional, (req, res, next) => {
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