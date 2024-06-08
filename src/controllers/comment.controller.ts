import { Request, Response } from "express";
import commentsModel from "../models/comments.model";
import mongoose from "mongoose";
import articleModel from "../models/article.model";
import tagsModel from "../models/tags.model";

export const createAcomment = async (req: Request, res: Response) => {
  const data = req.body;
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const comment = new commentsModel(data);
    const savedComment = await comment.save({ session });

    const currentArticle = await articleModel
      .findOneAndUpdate(
        { _id: data.article },
        { $push: { comments: savedComment._id } },
        { new: true, session }
      )
      .session(session);

    if (!currentArticle) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Article not found to add comment!",
      });
    }

    await session.commitTransaction();

    res.status(201).json({
      message: "Comment successfully added!",
      comment: savedComment,
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
export const deleteAComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // Find the comment to be deleted
    const commentToDelete = await commentsModel
      .findById({ _id: id })
      .session(session);

    if (!commentToDelete) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Comment not found!",
      });
    }

    // Delete the comment
    await commentsModel.findByIdAndDelete({ _id: id }).session(session);

    // Remove the comment reference from the article
    const currentArticle = await articleModel
      .findOneAndUpdate(
        { _id: commentToDelete.article },
        { $pull: { comments: commentToDelete._id } },
        { new: true, session }
      )
      .session(session);

    if (!currentArticle) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Article not found to remove comment!",
      });
    }

    await session.commitTransaction();

    res.status(200).json({
      message: "Comment successfully deleted!",
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
export const updateAcomment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(404).json({
      message: "You must add content",
    });
  }

  try {
    const updateComment = await commentsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateComment) {
      return res.status(404).json({
        message: "Comment not found!",
      });
    }

    res.status(200).json({
      message: "Comment successfully updated!",
      updatedComment: updateComment, // Send the updated comment in the response
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getArticleByTagName = async (req: Request, res: Response) => {
  const { tag } = req.params;
  try {
    const findTagId = await tagsModel.find({ name: tag });
    const articles = await articleModel.find({ tags: findTagId[0]._id });

    if (!articles) {
      res.status(404).json({
        message: "No data found!",
      });
    }

    res.status(200).json({
      message: "Article found successfully!",
      articles: articles,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const name = async (req: Request, res: Response) => {};
