import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandlers from "./app/middleweres/globalErrorHandlers";
import router from "./app/routes";
import notFound from "./app/middleweres/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandlers);

// not found route
app.use(notFound);

export default app;
