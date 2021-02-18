import { apiv1 } from "./init-routes";
import { post } from "../../models/init-models";
import { authenticate } from "./account";

const prefix = "/post";

apiv1.get(prefix + "/:id", authenticate.optional, (req, res, next) => {
    post.findByPk(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch(next);
});

const run = () => {};
export default run;
