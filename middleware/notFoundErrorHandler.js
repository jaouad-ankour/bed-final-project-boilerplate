const notFoundErrorHandler = (err, req, res, next) => {
    if (err.name === "NotFoundError") {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  };
  
  export default notFoundErrorHandler;