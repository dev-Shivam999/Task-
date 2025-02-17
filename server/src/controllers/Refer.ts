import { Response } from "express";
import jwt from "jsonwebtoken";
import { ReferSchema } from "../models/models";
import { CustomRequest } from "../utils/Types/Types";

export const Refer = async (req: CustomRequest, res: Response) => {
  const { refer } = req.body;

  if (!refer) {
    return res.status(400).json({ success: false, message: "Refer code is required" });
  }

  const user = req.User;
  if (!user?.id) {
    return res.status(401).json({ success: false, message: "Unauthorized user" });
  }

  try {
    const data = await ReferSchema.findOne(
      { Code: refer, Leader: true })

    if (data!=null) {
      await ReferSchema.create({
        userId: user._id
      })

      
      const jwtToken = jwt.sign(String(data.userId), "lol");
      const jwtToken2 = jwt.sign(String(user._id), "lol");
      res
        .cookie("token", jwtToken, 
        )
        .cookie("token2", jwtToken2, {
          httpOnly: true,
          sameSite: "none",
          secure: true,

          maxAge: 240000 * 360000,
        })
        .status(200)
        .json({ success: true, message: data ? "Refer code processed successfully" : "Operation failed" });
    } else {
      res.json({ success: false, message: "invalid code" });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An unexpected error occurred" });
  }
};

