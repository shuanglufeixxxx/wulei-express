import { apiv1 } from "./init-routes";
import { picture } from "../../models/picture";
import { authHandler } from "./account";

const prefix = "/image";

apiv1.get(prefix + "/:id", (req, res, next) => {
    picture
        .findByPk(req.params.id)
        .then((picture) => {
            if (picture == null) return res.sendStatus(404);
            res.set("Content-Type", "image/jpeg").send(picture.bytes);
        })
        .catch(next);
});


const run = () => {}
export default run