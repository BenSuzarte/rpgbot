import { bootstrapApp } from "#base";
import { log } from "#settings";
import ck from "chalk";
import { AppDataSource } from "database/data-source.js";

await AppDataSource.initialize().then(async () => {
    log.success(ck.green("Database: RPG (PostgreSQL)"))
    await bootstrapApp({ workdir: import.meta.dirname });
}).catch((e) => {
    log.error(ck.red("Falha ao se conectar com a database."))
    console.log(e)
})