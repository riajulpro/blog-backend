import express from "express";
import {
  createAcomment,
  deleteAComment,
  updateAcomment,
} from "../../controllers/comment.controller";
const router = express.Router();

router.post("/create", createAcomment);
router.delete("/delete/:id", deleteAComment);
router.patch("/update/:id", updateAcomment);

export default router;
