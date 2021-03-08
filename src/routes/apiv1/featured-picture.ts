import { apiv1 } from "./init-apiv1";
import { featured_picture } from "../../models/featured_picture";

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