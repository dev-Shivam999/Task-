import { Response } from "express";
import { sendMail } from "../utils/mail";
import { CustomRequest } from "../utils/Types/Types";
import { ReferSchema } from "../models/models";

export const Mail = async (req: CustomRequest, res: Response) => {
    const { mail } = await req.body
    const user = req.User


    try {

        const data = await ReferSchema.findOne({ userId: user._id })
        if (data == null) {
            const Co = await ReferSchema.create({
                userId: user?._id,
                Leader: true
            })
            const info = await sendMail.sendMail({
                from: 'raviswami512@gmail.com',
                to: `${mail}`,
                subject: "Trello Refer code ",
                text: ` you get a reference from the user to their get refer code ${Co.Code} `
            })
            console.log("Message sent: %s", info.messageId);
            res.json({ success: true, messageId: info.messageId })
        }

        const info = await sendMail.sendMail({
            from: 'raviswami512@gmail.com',
            to: `${mail}`,
            subject: "Trello Refer code ",
            text: ` you get a reference from the user to their get refer code ${data?.Code} `
        })
        console.log("Message sent: %s", info.messageId);
        res.json({ success: true, messageId: info.messageId })

    } catch (error) {
        console.log("error: ", error);
        res.json({ success: false, messageId: "try again" })

    }
}