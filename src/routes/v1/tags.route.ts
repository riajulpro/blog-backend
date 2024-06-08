import express from "express";
import { deleteTag, updateTag } from "../../controllers/tags.controller";
const router = express.Router();

router.patch("/update/:id", updateTag);
router.delete("/delete/:id", deleteTag);

export default router;
