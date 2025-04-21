import logger from "../utils/logs.js";

const log = (req, res, next) => {
  const start = new Date();

  res.on("finish", () => {
    const ms = new Date() - start;
    logger.info(
      `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`,
      { service: "bed-final-project" }
    );
  });

  next();
};

export default log;
