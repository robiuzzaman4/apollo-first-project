import mongoose from "mongoose";

import app from "./app";
import config from "./app/config";

async function main(): Promise<void> {
  try {
    await mongoose.connect(config.database_uri as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on PORT ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
