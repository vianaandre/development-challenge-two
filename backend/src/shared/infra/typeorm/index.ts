import { AppDataSource } from "@shared/infra/typeorm/data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection database success 🔥");
  })
  .catch((error) => console.log(error));
