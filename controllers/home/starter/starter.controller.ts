import { Request, Response } from "express";
import User from "../../../models/user.model";

interface CustomRequest extends Request {
  token?: {
    _id: string;
  };
}

export const starter = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.token._id;
    console.log(`userId: ${userId}`);
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const starter = user.starter;
    await user.save();
    res.status(200).json({ starter: starter });
  } catch (error) {
    res.status(400).json({ msg: `Error: ${error}` });
    console.log(error);
  }
};

export const saveCoach = async (req: CustomRequest, res: Response) => {
  try {
    const { newCoach } = req.body;
    const userId = req.token._id;
    console.log(`User ID: ${userId}`);
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.coach = newCoach;
    await user.save();
    res.status(201).json({ coach: user.coach });
  } catch (error) {
    res.status(400).json({ msg: `Error: ${error}` });
    console.log(error);
  }
};

export const welcome = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.token._id;
    console.log(`User ID: ${userId}`);
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const coach = user.coach;
    res.status(200).json({ coach: coach });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const setGender = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.token._id;
    console.log(`User ID: ${userId}`);
    const { gender } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.gender = gender;
    await user.save();
    res.status(201).json({ gender: user.gender });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const setArea = async (req: CustomRequest, res: Response) => {
  try {
    const { area } = req.body;
    const userId = req.token._id;
    console.log(`UserId: ${userId}`);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.area = area;
    await user.save();
    res.status(201).json({ area: area });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const setGoal = async (req: CustomRequest, res: Response) => {
  try {
    const { goal } = req.body;
    const userId = req.token._id;
    console.log(`UserId:${userId}`);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.goal = goal;
    await user.save();
    res.status(201).json({ goal: goal });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

export const setAgeRange = async (req: CustomRequest, res: Response) => {
  try {
    const { ageRange } = req.body;
    const userId = req.token._id;
    console.log(`UserId: ${userId}`);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: `User not found` });
    user.ageRange = ageRange;
    await user.save();
    res.status(201).json({ ageRange: ageRange });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};

// set profile avatar and end starter
export const setProfileAvatar = async (req: CustomRequest, res: Response) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.token._id;
    console.log(`UserId: ${userId}`);
    const user = await User.findById(userId);
    user.profilePicture = profilePicture;
    user.starter = false;
    await user.save();
    res.status(201).json({ msg: "Avatar set and starter ends" });
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
};
