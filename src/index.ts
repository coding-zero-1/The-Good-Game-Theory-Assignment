import express from "express";
import { config } from "dotenv";
import dbConnection from "./config/dbConnection";
import bookRouter from "./routes/bookRoutes";
config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

async function main() {
  if (!process.env.MONGO_URL) {
    console.error("Env variables not defined");
    return;
  }

  await dbConnection(process.env.MONGO_URL);

  app.use("/api/v1/books", bookRouter);
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}
main();
