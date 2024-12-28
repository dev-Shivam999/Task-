import { Request, Response } from "express";
import { sendMail } from "../utils/mail";

export const Mail =async(req:Request,res:Response)=>{
    const {mail}=await req.body
    try {
        const code = Math.round(Math.random() * 10000);
        const info = await sendMail.sendMail({
            from: 'raviswami512@gmail.com',
            to: `${mail}`,
            subject: "Trello Refer code ",
            text: ` you get a reference from the user to their get refer code ${code} `
        })
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log("error: ", error);

    }
}