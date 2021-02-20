import { apiv1 } from "./init-routes";
import { picture_item } from "../../models/picture_item";
import { authHandler } from "./account";

const prefix = '/picture';

apiv1.get(prefix, (req, res, next) => {
    picture_item
        .findAll({
            where: {
                picture_collection_id: req.query.pictureCollectionId
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