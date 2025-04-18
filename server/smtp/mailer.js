const nodemailer = require("nodemailer");
const { clientMessage } = require("./utils")

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,              // e.g., smtp.orangewebsite.com
  port: parseInt(process.env.SMTP_PORT),    // e.g., 465 or 587
  secure: false,                             // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendMail = async (user) => {
  const { name, email, phone, message } = user;

  let mailOptions = {
    from: `"Car2U" <${process.env.SMTP_USER}>`,
    to: [process.env.SMTP_USER, "car2025u@gmail.com", "yulian.kalchev@abv.bg"], // your admin inbox
    subject: `Ново запитване от ${name}`,
    html: `
      <h3>Ново запитване</h3>
      <p><strong>Име:</strong> ${name}</p>
      <p><strong>Имейл:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Съобщение:</strong><br/>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  mailOptions = {
    ...mailOptions,
    from: `Car2U <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Благодарим Ви, че избрахте Car2U, ${name}`,
    html: clientMessage
  }

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
