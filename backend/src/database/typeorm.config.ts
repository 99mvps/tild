import { CodeEditor } from "src/code-editor/code-editor.entity";
import { User } from "src/users/user.entity";
import { DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

console.log("process.env", process.env);

export default {
  type: process.env.DATABASE_TYPE as PostgresConnectionOptions["type"],
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  migrationsTableName: "tild_migrations",
  subscribers: ["dist/**/*.subscriber{.js,.ts}"],
  migrations: ["dist/database/migrations/*{.js,.ts}"],
  entities: [User, CodeEditor],
  logging: true,
  cli: {
    migrationsDir: "src/database/migrations",
  },
  synchronize: false,
  name: "default",
} as DataSourceOptions;
