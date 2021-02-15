import { apiPrefix, apiv1 } from "./init-router";
import { sequelize } from "../sequelize-init";

const prefix = apiPrefix + '/account';

apiv1.get(prefix + '/exist', (req, res, next) => {
    sequelize
        .query(
            `select
                case when exists (select * from account where id = :id)
                then true
                else false
            end`,
            {
                replacements: {
                    id: req.params.id
                }
            }
        )
        .then(exist => {
            res.send(exist)
        })
        .catch(next)
})