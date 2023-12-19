import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// se llama el config service para poder cargar las variables de entorno
const configService = new ConfigService();
// se establece la variable typeOrnAsyncConfig con la que se van a cargar
// las opciones de conexion en typeorm
export const typeOrnAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.get('MYSQL_HOSTNAME'),
      port: configService.get<number>('MYSQL_PORT'),
      username: configService.get('MYSQL_USER'),
      password: configService.get('MYSQL_PASSWORD'),
      database: configService.get('MYSQL_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      migrationsTableName: 'migration_table',
      synchronize: true,
      logging: false,
    };
  },
};
