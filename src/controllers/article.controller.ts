import { Request, Response } from "express";
import mongoose from "mongoose";
import findOrCreateTags from "../utils/findOrCreateTags";
import articleModel from "../models/article.model";
import findOrCreateCategories from "../utils/findOrCreateCategories";
import commentsModel from "../models/comments.model";

export const postNewArticle = async (req: Request, res: Response) => {
  const data = req.body;

  const tags = Array.isArray(data.tags) ? data.tags : [];
  const categories = Array.isArray(data.categories) ? data.categories : [];

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const tagsIds = await findOrCreateTags(tags, session);
    const categoriesIds = await findOrCreateCategories(categories, session);

    const post = new articleModel({
      title: data.title,
      content: data.content,
      tags: tagsIds,
      categories: categoriesIds,
      author: data.author,
      comments: [],
    });
    const savedPost = await post.save({ session });

    if (!savedPost) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Something went wrong! Please try again",
      });
    }

    await session.commitTransaction();

    res.status(201).json({
      message: "Article successfully created!",
      article: savedPost,
    });
  } catch (err: any) {
    await session?.abortTransaction();
    res.status(400).json({
      message: err.message,
    });
  } finally {
    session?.endSession();
  }
};
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const storedPosts = await articleModel
      .find()
      .populate("author")
      .populate("tags")
      .populate("categories")
      .populate("comments")
      .exec();

    if (storedPosts.length === 0) {
      return res.status(404).json({
        message: "No articles found!",
        success: false,
      });
    }

    res.status(200).json({
      message: "Articles retrieved successfully!",
      success: true,
      articles: storedPosts,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while retrieving articles.",
      error: error.message,
    });
  }
};
export const deleteSinglePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const deleted = await articleModel
      .findByIdAndDelete({ _id: id })
      .session(session);

    if (!deleted) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Article not found!",
      });
    }

    await commentsModel.deleteMany({ article: id }).session(session);

    session.commitTransaction();
    res.status(204).json({
      message: "The article and associated comments successfully deleted!",
    });
  } catch (error: any) {
    await session?.abortTransaction();
    res.status(400).json({
      message: error.message,
    });
  } finally {
    session?.endSession();
  }
};
export const updateAnArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const updateData: any = {
      title: data.title,
      content: data.content,
      author: data.author,
    };

    // Conditionally add tags and categories to updateData if they are provided
    if (Array.isArray(data.tags) && data.tags.length > 0) {
      const tagsIds = await findOrCreateTags(data.tags, session);
      updateData.tags = tagsIds;
    }

    if (Array.isArray(data.categories) && data.categories.length > 0) {
      const categoriesIds = await findOrCreateCategories(
        data.categories,
        session
      );
      updateData.categories = categoriesIds;
    }

    const updatedArticle = await articleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, session }
    );

    if (!updatedArticle) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Article not found! Please try again",
      });
    }

    await session.commitTransaction();

    res.status(200).json({
      message: "Article successfully updated!",
      article: updatedArticle,
    });
  } catch (err: any) {
    await session?.abortTransaction();
    res.status(400).json({
      message: err.message,
    });
  } finally {
    session?.endSession();
  }
};
export const name = async (req: Request, res: Response) => {};
