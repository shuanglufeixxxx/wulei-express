import { apiPrefix, apiv1 } from './init-router';
import jwt from 'jsonwebtoken';
import { account } from '../../models/init-models'

const prefix = apiPrefix + '/signIn';

const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        console.log(err)
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const generateAccessToken = ( username: string ) => {
    return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '86400s'})
}

apiv1.post(prefix, (req, res) => {
    account
        .findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then(account => {
            if(account == null) res.sendStatus(403);
            const accessToken = generateAccessToken(account.username);
            res.json({
                accessToken: accessToken
            })
        })
})