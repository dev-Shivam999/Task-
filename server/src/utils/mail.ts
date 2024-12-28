import mail from 'nodemailer'

export const sendMail = mail.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "raviswami512@gmail.com",
        pass: "tgwt hihm wjje upca"
    }

});