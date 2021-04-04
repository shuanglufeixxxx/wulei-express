import { apiv1 } from "./init-apiv1";
import { picture_item } from "../../models/picture_item";

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
