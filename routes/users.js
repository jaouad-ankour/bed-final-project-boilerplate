import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import getUsers from "../services/users/getUsers.js";
import authMiddleware from "../middleware/auth.js";
import createUser from "../services/users/createUsers.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUserById.js";
import NotFoundError from "../error/notFoundError.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { username, email } = req.query;
      const users = await getUsers(username, email);

      res.status(200).json(users);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

// router.post("/", authMiddleware, async (req, res, next) => {
//   console.log("req POST=USER", req.body);
//   try {
//     const { email, name, password, phoneNumber, pictureUrl, username } =
//       req.body;
//     const newUser = await createUser(
//       email,
//       name,
//       password,
//       phoneNumber,
//       pictureUrl,
//       username
//     );
//     res.status(201).json(newUser);
//   } catch (error) {
//     if (error instanceof NotFoundError) {
//       return res.status(404).json({ message: "Resource not found" });
//     }
//     next(error);
//   }
//   notFoundErrorHandler;
// });

router.post("/", authMiddleware, async (req, res) => {
  console.log("req POST=USER", req.body);

  try {
    const { email, name, password, phoneNumber, pictureUrl, username } =
      req.body;

    const newUser = await createUser(
      email,
      name,
      password,
      phoneNumber,
      pictureUrl,
      username
    );

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: "Resource not found" });
    }

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email, name, password, phoneNumber, pictureUrl, username } =
        req.body;
      const updatedUser = await updateUserById(
        id,
        email,
        name,
        password,
        phoneNumber,
        pictureUrl,
        username
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await deleteUser(id);

      res.status(200).json({
        message: `User with id ${deletedUser} was deleted!`,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
