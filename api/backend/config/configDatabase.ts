import "reflect-metadata"
import { DataSource } from "typeorm"
import config from '../env.config'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.HOST_LOCAL_IP,
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'mysql_db',
    synchronize: false,
    logging: true,
    migrationsTableName: 'migrations',
    entities: ['entity/**/*{.ts,.js}'],
    migrations: ['migrations/**/*{.ts,.js}'],
})
