import { Request, Response } from "express";
import ProfileAvatar from "../../../models/profileAvatar.model";
import User from "../../../models/user.model"

interface CustomRequest extends Request {
  token?: {
    _id: string;
  };
}

export const getProfileAvatar = async (req: CustomRequest, res: Response) => {
  try {
    const avatars = await ProfileAvatar.find();
    res.status(200).json({ avatars });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfileAvatar = async(req:CustomRequest, res:Response) =>{
  try {
    const userId = req.token._id
    const user = await User.findById(userId)
    if(!user) return res.status(404).json({msg: "User not found"})
    const profileAvatar = user.profilePicture
  res.status(201).json({profilePicture: profileAvatar})
  } catch (error) {
    res.status(401).json({ msg: "Error occured," + error });
  }

}