import { apiPrefix, apiv1 } from "./init-router";
import { post } from "../../models/init-models";
import { sequelize } from "../sequelize-init";

const prefix = apiPrefix + '/post';

apiv1.get(prefix + '/:id', (req, res, next) => {
    post.findByPk(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});