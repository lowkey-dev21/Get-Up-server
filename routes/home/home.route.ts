import express, { Response, Request, NextFunction } from "express";
import {
  starter,
  saveCoach,
  welcome,
  setGender,
  setArea,
  setGoal,
  setAgeRange,
  setProfileAvatar,
} from "../../controllers/home/starter/starter.controller";

import {getUserProfileAvatar} from "../../controllers/home/profile/profile.controller"

import { profileAvatar} from "../../controllers/home/profile/profileAvatar.controller";
const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = express.Router();

// starter
router.get("/starter", asyncHandler(starter));
router.post("/starter/coach", asyncHandler(saveCoach));
router.get("/starter/welcome", asyncHandler(welcome));
router.post("/starter/gender", asyncHandler(setGender));
router.post("/starter/area", asyncHandler(setArea));
router.post("/starter/goal", asyncHandler(setGoal));
router.post("/starter/age-range", asyncHandler(setAgeRange));

// avatar
router.get("/starter/profile-avatar", asyncHandler(profileAvatar));
export default router;
router.post("/stater/set-profile-avatar", asyncHandler(setProfileAvatar));

// profile
router.get("/profile/profile-picture", asyncHandler(getUserProfileAvatar))
