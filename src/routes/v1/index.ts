import express from "express";
import article from "./article.route";
import comment from "./comment.route";
import people from "./people.route";
import tags from "./tags.route";
import categories from "./categories.route";
const router = express.Router();

router.use("/article", article);
router.use("/people", people);
router.use("/comment", comment);
router.use("/tags", tags);
router.use("/categories", categories);

export default router;
