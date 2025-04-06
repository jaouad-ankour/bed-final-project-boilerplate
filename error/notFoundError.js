class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`${resourceType} with ID ${id} was not found.`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
  