import { mysqlAttributeDev } from './mysql-attribute-dev'
import { mysqlAttributeProd } from './mysql-attribute-prod'

export const mysqlAttribute = process.env.NODE_ENV?.startsWith('prod') ? mysqlAttributeProd : mysqlAttributeDev