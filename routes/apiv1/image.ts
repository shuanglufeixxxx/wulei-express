import { apiPrefix, apiv1 } from "./init-router";
import { picture } from "../../models/picture";

const prefix = apiPrefix + "/image";

apiv1.get(prefix + "/:id", (req, res, next) => {
    picture
        .findByPk(req.params.id)
        .then((picture) => {
            res.set("Content-Type", "image/jpeg").send(picture.bytes);
        })
        .catch(next);
});
