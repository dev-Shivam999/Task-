import { Response } from "express";
import { sendMail } from "../utils/mail";
import { CustomRequest } from "../utils/Types/Types";
import { ReferSchema } from "../models/models";
import ejs from "ejs";
import path from "path";

export const Mail = async (req: CustomRequest, res: Response) => {
    const { mail } = req.body;
    const user = req.User;

    if (!mail) {
        return res.json({ success: false, message: "Recipient email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        return res.json({ success: false, message: "Invalid email address" });
    }

    try {
        const data = await ReferSchema.findOne({ userId: user._id });

        if (!data) {
            const Co = await ReferSchema.create({
                userId: user?._id,
                Leader: true,
            });
            // const emailHtml = await ejs.renderFile(
            //     path.join(__dirname, "./views/index.ejs"),
            //     { referCode: Co.Code, sender: user.name }
            // );

            const info = await sendMail.sendMail({
                from: "raviswamiji512@gmail.com",
                to: mail,
                subject: "Trello Refer code",
                html: `  <h2>Hello,</h2>
    <p>You have received a reference from <strong>
            <%= sender %>
        </strong>.</p>
    <p>Your refer code is: <strong style="color: blue; font-size: 18px;">
            <%= referCode %>
        </strong></p>
    <p>Use this code to register and get rewards!</p>`            });

            console.log("Message sent: %s", info.messageId);
            return res.json({ success: true, messageId: info.messageId });
        }

        const info = await sendMail.sendMail({
            from: "raviswamiji512@gmail.com",
            to: mail,
            subject: "Trello Refer code",
            text: `You get a reference from the user. Their refer code is ${data?.Code}`,
        });

        console.log("Message sent: %s", info.messageId);
        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
