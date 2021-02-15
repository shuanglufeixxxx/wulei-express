import { apiPrefix, apiv1 } from "./init-router";
import { post, post_like } from "../../models/init-models";
import { sequelize } from "../sequelize-init";

const prefix = apiPrefix + "/postLike";

apiv1.post(prefix, (req, res, next) => {
    post_like
        .create({
            post_id: req.body.postId,
            account_id: 0, //
        })
        .then((_) => {
            res.send();
        })
        .catch(next);
});

apiv1.delete(prefix, (req, res, next) => {
    post_like
        .destroy({
            where: {
                post_id: req.params.postId,
                account_id: 0, //
            },
        })
        .then((_) => {
            res.send();
        })
        .catch(next);
});

apiv1.get(prefix + "/exist", (req, res, next) => {
    sequelize
        .query(
            `select
                case when exists (select * from post_like where post_id = :postId and accountId = :id)
                then true
                else false
            end`,
            {
                replacements: {
                    postId: req.params.postId,
                    accountId: "", //
                },
            }
        )
        .then((exist) => {
            res.send(exist);
        })
        .catch(next);
});

apiv1.get(prefix + "/count", (req, res, next) => {
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

apiv1.get(prefix + "/my", (req, res, next) => {
    sequelize
        .query(
            `select * from post where id in (select post_id from post_like where account_id = :accountId)`,
            {
                replacements: {
                    accountId: 0,
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
