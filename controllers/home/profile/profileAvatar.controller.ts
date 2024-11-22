import { Response, Request } from "express";
import ProfileAvatar from "../../../models/profileAvatar.model";

export const profileAvatar = async (req: Request, res: Response) => {
  try {
    const urls = [
      "https://res.cloudinary.com/dwdxytegk/image/upload/v1730109049/avataaars_1_sswpld.png",
      "https://res.cloudinary.com/dwdxytegk/image/upload/v1730109039/avataaars_3_flslwz.png",
      "https://res.cloudinary.com/dwdxytegk/image/upload/v1730109034/avataaars_4_xeoqy4.png",
      "https://res.cloudinary.com/dwdxytegk/image/upload/v1730109029/avataaars_5_mgu6dh.png",
    ];

    // Check if avatars already exist
    const existingAvatars = await ProfileAvatar.find({ url: { $in: urls } });

    if (existingAvatars.length === urls.length) {
      return res.status(200).json({ avatars: existingAvatars });
    }

    // Filter out URLs that are already in the database
    const existingUrls = existingAvatars.map((avatar) => avatar.url);
    const newUrls = urls.filter((url) => !existingUrls.includes(url));

    // Create only the new avatars
    const newAvatars = await Promise.all(
      newUrls.map(async (url) => await ProfileAvatar.create({ url }))
    );

    // Return both existing and new avatars
    const allAvatars = [...existingAvatars, ...newAvatars];
    res.status(201).json({ avatars: allAvatars });
  } catch (error) {
    res.status(500).json({ message: "Error creating avatars", error });
  }
};
