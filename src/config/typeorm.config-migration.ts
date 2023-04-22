import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
// se crea una constante para las migraciones, con los datos de conexion
export const typeOrnMigrationConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOSTNAME,
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    migrationsTableName: "migration_table",
    synchronize: false,
    logging: true,
    
}

const datasource = new DataSource(typeOrnMigrationConfig);
export default datasource;