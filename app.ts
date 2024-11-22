import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { mongoDB } from "./db/db";
import userRoute from "./routes/auth/user.route";
import morgan from "morgan";
import { verifyJWT } from "./middleware/veryJWT";
import homeRoute from "./routes/home/home.route";

const PORT: string | undefined = process.env.PORT;
const app: Express = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form submissions
app.use(helmet());

if (process.env.NODE_SERVER === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/auth", userRoute);
app.use(verifyJWT);
app.use("/home", homeRoute);

const startApplication = async () => {
  try {
    await mongoDB();
    app.listen(PORT, () => {
      console.log("server is running on localhost:" + PORT);
    });
  } catch (error) {
    console.error("server is encountering an error of:" + error);
  }
};

startApplication();
