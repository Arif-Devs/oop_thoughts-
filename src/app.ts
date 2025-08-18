import express from "express";

const app = express();

//error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

export default app;
