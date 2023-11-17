import dotenv from "dotenv";
import path from "path";

// setup dotenv config
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
};
