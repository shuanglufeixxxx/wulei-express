import { apiPrefix, apiv1 } from "./init-router";
import { sequelize } from "../sequelize-init";
import { post } from "../../models/post";

const prefix = apiPrefix + "/featuredPost";

apiv1.get(prefix, (req, res, next) => {
    sequelize
        .query(
            "select * from post where id in (select post_id from featured_post where classify = ?)",
            {
                replacements: { classify: req.params.classify },
                model: post,
                mapToModel: true,
            }
        )
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});
