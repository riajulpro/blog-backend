import { Request, Response } from "express";
import tagsModel from "../models/tags.model";

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updateTag = await tagsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateTag) {
      return res.status(404).json({
        message: "Tag Not found!",
      });
    }
    res.status(204).json({
      message: "Tag successfully updated!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteTag = await tagsModel.findByIdAndDelete(id);

    if (!deleteTag) {
      return res.status(404).json({
        message: "Tag not found!",
      });
    }

    res.status(204).json({
      message: "Tag successfully removed!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const name = async (req: Request, res: Response) => {};
