import { Request, Response } from "express";
import categoriesModel from "../models/categories.model";

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedCategory = await categoriesModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    res.status(204).json({
      message: "Category successfully updated!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteCategory = await categoriesModel.findByIdAndDelete(id);

    if (!deleteCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    res.status(204).json({
      message: "Category successfully removed!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const name = async (req: Request, res: Response) => {};
