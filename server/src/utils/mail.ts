import mail from 'nodemailer'

export const sendMail = mail.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: "raviswamiji512@gmail.com",
        pass: "qsoejeuvwcfwiilt"
    }

});