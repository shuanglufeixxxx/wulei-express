import { apiv1 } from "./init-apiv1";
import { sequelize } from "../../services/sequelize";
import { post } from "../../models/post";

const prefix = "/featuredPost";

apiv1.get(prefix, (req, res, next) => {
    sequelize
        .query(
            "select * from post where id in (select post_id from featured_post where classify = :classify)",
            {
                replacements: { classify: req.query.classify },
                model: post,
                mapToModel: true,
            }
        )
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});

