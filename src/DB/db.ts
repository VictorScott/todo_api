import { Sequelize } from "sequelize-typescript";
import appConfig from "../config";
import {Todo, User} from "@DB/Models";

const db = new Sequelize({
  database:
    appConfig.environment == "development"
      ? appConfig.database.dev.name
      : appConfig.database.prod.name,
  dialect:
    appConfig.environment == "development"
      ? (appConfig.database.dev.dialect as any)
      : (appConfig.database.prod.dialect as any),
  host:
    appConfig.environment == "development"
      ? appConfig.database.dev.host
      : appConfig.database.prod.host,
  port: Number(
    appConfig.environment == "development"
      ? appConfig.database.dev.port
      : appConfig.database.prod.port
  ),
  username:
    appConfig.environment == "development"
      ? appConfig.database.dev.user
      : appConfig.database.prod.user,
  password:
    appConfig.environment == "development"
      ? appConfig.database.dev.password
      : appConfig.database.prod.password,
  models: [
    User,
    Todo
  ],
});

export default db;
