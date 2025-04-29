import "../instrument.cjs";
import express from "express";
import loginRouter from "../routes/login.js";
import userRouter from "../routes/users.js";
import bookingRouter from "../routes/bookings.js";
import amenityRouter from "../routes/amenities.js";
import reviewRouter from "../routes/reviews.js";
import hostRouter from "../routes/hosts.js";
import propertyRouter from "../routes/properties.js";

import log from "../middleware/loggerMiddleware.js";

import errorHandler from "../middleware/errorHandler.js";

import * as Sentry from "@sentry/node";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const app = express();
app.use(express.json());
app.use(log);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/bookings", bookingRouter);
app.use("/amenities", amenityRouter);
app.use("/hosts", hostRouter);
app.use("/reviews", reviewRouter);
app.use("/properties", propertyRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

Sentry.setupExpressErrorHandler(app);
app.use(function onError(err, req, res, next) {
  console.error("🔐 AUTH ERROR:", err);
  if (err instanceof PrismaClientValidationError) {
    console.log("istance prismaclient validation error:", err);
    return res
      .status(400)
      .json("Your form is missing the required input fields");
  }
  if (err instanceof SyntaxError) {
    console.log("error", err);
    return res.status(400).json("Something went wrong");
  }

  res.statusCode = 500;
  res.end("something went wrong" + "\n");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
