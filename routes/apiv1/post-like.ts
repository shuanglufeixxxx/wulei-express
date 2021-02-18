import { apiv1 } from "./init-routes";
import { post, post_like } from "../../models/init-models";
import { sequelize } from "../sequelize-init";
import { authenticate } from "./account";
import { QueryTypes } from "sequelize";

const prefix = "/postLike";

apiv1.post(prefix, authenticate.required, (req: any, res, next) => {
    if (req.body.postId == null) return res.sendStatus(202)

    post_like
        .upsert({
            post_id: req.body.postId,
            account_id: req.user.id,
            create_date: new Date().toString()
        })
        .then( _ => {
            res.send();
        })
        .catch(next);
});

apiv1.delete(prefix, authenticate.required, (req: any, res, next) => {
    if (req.body.postId == null) return res.sendStatus(202)

    post_like
        .destroy({
            where: {
                post_id: req.body.postId,
                account_id: req.user.id
            },
        })
        .then((_) => {
            res.send();
        })
        .catch(next);
});

apiv1.get(prefix + '/exist', authenticate.required, (req: any, res, next) => {
    if (req.query.postId == null) return res.sendStatus(202)

    sequelize
        .query(
            `select if (
                (select id from post_like where account_id = :aid and post_id = :pid),
                true,
                false
            ) as 'exists';`,
            {
                type: QueryTypes.SELECT,
                plain: true,
                replacements: {
                    aid: req.user.id,
                    pid: req.query.postId
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

apiv1.get(prefix + "/count", authenticate.optional, (req, res, next) => {
    post_like
        .count({
            where: {
                post_id: req.params.postId,
            },
        })
        .then((count) => {
            res.send(count);
        })
        .catch(next);
});

apiv1.get(prefix + "/my", authenticate.required, (req: any, res, next) => {
    sequelize
        .query(
            `select * from post where id in (select post_id from post_like where account_id = :accountId)`,
            {
                replacements: {
                    accountId: req.user.id,
                },
                mapToModel: true,
                model: post,
            }
        )
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});


const run = () => {}
export default run