import { apiPrefix, apiv1 } from "./init-router";
import { sequelize } from "../sequelize-init";

const prefix = apiPrefix + '/featuredPicture';

apiv1.get(prefix, (req, res, next) => {
    sequelize
        .query(
            `select id from picture where id in (select picture_id from featured_picture where place = :place)`,
            {
                replacements: {
                    place: req.params.place
                },
                fieldMap: {
                    id: 'id'
                }
            }
        )
        .then(ids => {
            res.json(ids)
        })
        .catch(next)
})