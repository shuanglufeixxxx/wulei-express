import { apiv1 } from "./init-routes";
import { featured_picture } from "../../models/featured_picture";
import { authHandler } from "./account";

const prefix = '/featuredPicture';

apiv1.get(prefix, (req, res, next) => {
    featured_picture
        .findAll({
            where: {
                place: req.query.place
            },
            attributes: [['picture_id', 'id']]
        })
        .then(ids => {
            res.json(ids)
        })
        .catch(next)
})

const run = () => {}
export default run