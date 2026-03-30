const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "bf5117f7286193",
        pass: "3010e0a518e345",
    },
});

module.exports = {
    sendMail: async (to, urlOrPassword, username) => {
        // Check if this is a password email (new import users feature)
        let subject, text, html;
        
        if (username) {
            // This is a password email for imported users
            subject = "Tài khoản đã được tạo - Mật khẩu đăng nhập";
            text = `Xin chào ${username},\n\nTài khoản của bạn đã được tạo thành công.\n\nThông tin đăng nhập:\nUsername: ${username}\nMật khẩu: ${urlOrPassword}\n\nVui lòng đổi mật khẩu sau lần đăng nhập đầu tiên.\n\nTrân trọng!`;
            html = `
                <h2>Xin chào ${username},</h2>
                <p>Tài khoản của bạn đã được tạo thành công.</p>
                <h3>Thông tin đăng nhập:</h3>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Mật khẩu:</strong> <code>${urlOrPassword}</code></p>
                <p style="color: red;">Vui lòng đổi mật khẩu sau lần đăng nhập đầu tiên.</p>
                <p>Trân trọng!</p>
            `;
        } else {
            // This is a password reset email
            subject = "request resetpassword email";
            text = "click vao day de reset";
            html = `click vao <a href=${urlOrPassword}>day</a> de reset`;
        }

        const info = await transporter.sendMail({
            from: 'Admin@NNPTUD-S3.com',
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        console.log("Message sent:", info.messageId);
    }
}