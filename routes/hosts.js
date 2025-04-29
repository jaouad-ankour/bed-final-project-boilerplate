import { Router } from "express";
import notFoundErrorHandler from "../error/notFoundError.js";
import authMiddleware from "../middleware/auth.js";
import NotFoundError from "../error/notFoundError.js";
import getHostById from "../services/hosts/getHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import updateHost from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";

const router = Router();

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);

      res.status(200).json(host);
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
      const { name } = req.query;
      const hosts = await getHosts(name);

      res.status(200).json(hosts);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: "Resource not found" });
      }
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  console.log("req POST=HOST", req.body);

  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    res.status(201).json(newHost);
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

// router.post("/", authMiddleware, async (req, res, next) => {
//   console.log("req POST=HOST", req.body);
//   try {
//     const {
//       username,
//       password,
//       name,
//       email,
//       phoneNumber,
//       profilePicture,
//       aboutMe,
//     } = req.body;
//     const newHost = await createHost(
//       username,
//       password,
//       name,
//       email,
//       phoneNumber,
//       profilePicture,
//       aboutMe
//     );
//     res.status(201).json(newHost);
//   } catch (error) {
//     if (error instanceof NotFoundError) {
//       return res.status(404).json({ message: "Resource not found" });
//     }
//     next(error);
//   }
//   notFoundErrorHandler;
// });

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    console.log("req");
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const updatedHost = await updateHost(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(200).json(updatedHost);
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
      const deletedHost = await deleteHostById(id);

      res.status(200).json({
        message: `Host with id ${deletedHost} was deleted!`,
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
