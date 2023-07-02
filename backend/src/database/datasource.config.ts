import { DataSource } from "typeorm";
import typeormConfig from "./typeorm.config";

console.log("database configs", { typeormConfig });

export const AppDataSource = new DataSource(typeormConfig);
