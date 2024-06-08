import { Request, Response } from "express";
import peopleModel from "../models/people.model";

export const createAnUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const isExist = await peopleModel.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(409).json({
        message: `Email ${req.body.email} already exist!`,
      });
    }

    const userSaved = await peopleModel.create(data);

    if (!userSaved) {
      return res.status(400).json({
        message: "Something went wrong! Please try again",
      });
    }

    res.status(201).json({
      message: "User successfully created!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const updateAnUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedUser = await peopleModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(204).json({
      message: "User successfully updated!",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const deleteAnUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await peopleModel.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(204).json({
      message: "User successfully removed!",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getAnUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getUser = await peopleModel.findOne({ _id: id });

    if (!getUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    res.status(204).json({
      message: "User successfully found!",
      user: getUser,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const name = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
