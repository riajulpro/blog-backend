import express from "express";
import {
  createAnUser,
  deleteAnUser,
  getAnUser,
  updateAnUser,
} from "../../controllers/people.controller";
const router = express.Router();

router.post("/create", createAnUser);
router.get("/get/single/:id", getAnUser);
router.patch("/update/:id", updateAnUser);
router.delete("/delete/:id", deleteAnUser);

export default router;
