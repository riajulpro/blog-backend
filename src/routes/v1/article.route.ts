import express from "express";
import {
  deleteSinglePost,
  getAllPosts,
  postNewArticle,
  updateAnArticle,
} from "../../controllers/article.controller";
import { getArticleByTagName } from "../../controllers/comment.controller";
const router = express.Router();

router.post("/post/new", postNewArticle);
router.get("/get/all", getAllPosts);
router.patch("/post/update/:id", updateAnArticle);
router.delete("/post/delete/:id", deleteSinglePost);
router.get("/search/t/:tag", getArticleByTagName);

export default router;
