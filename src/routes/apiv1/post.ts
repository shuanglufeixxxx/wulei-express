import { apiv1 } from "./init-apiv1";
import { post } from "../../models/init-models";

const prefix = "/post";

apiv1.get(prefix, (req, res, next) => {
    post
        .findAll({
            where: {
                classify: req.query.classify
            }
        })
        .then((posts) => {
            res.json(posts);
        })
        .catch(next);
});

apiv1.get(prefix + "/:id", (req, res, next) => {
    post.findByPk(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

