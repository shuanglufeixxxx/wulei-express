import { apiPrefix, apiv1 } from "./init-router";
import { sequelize } from "../sequelize-init";

const prefix = apiPrefix + "/picture";

apiv1.get(prefix, (req, res, next) => {
    sequelize
        .query(
            `select id from picture
            where id in (
                select picture_id from picture_item
                where picture_collection_id = :pictureCollectionId)`,
            {
                fieldMap: {
                    id: "id",
                },
            }
        )
        .then((ids) => {
            res.json(ids);
        })
        .catch(next);
});
