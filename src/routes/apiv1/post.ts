import { apiv1 } from "./init-routes";
import { post } from "../../models/init-models";
import { authHandler } from "./account";

const prefix = "/post";

apiv1.get(prefix + "/:id", (req, res, next) => {
    post.findByPk(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

const run = () => {};
export default run;
