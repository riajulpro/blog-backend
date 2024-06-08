import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/v1";
import connectedDB from "./config/database";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

connectedDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "You have entered into the blog server successfully",
  });
});

app.use("/api/v1", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
