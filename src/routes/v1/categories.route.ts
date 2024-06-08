import express from "express";
import {
  deleteCategory,
  updateCategory,
} from "../../controllers/categories.controller";
const router = express.Router();

router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
