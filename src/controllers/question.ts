import { RequestHandler } from 'express';
import UserQuestions from '../models/UserQuestions';
import { transporter } from '../sendmailer/sendmailer';

export const questions: RequestHandler = async (req, res) => {
    try {
        const { email } = req.body;

        const question = new UserQuestions({ email });
        await question.save();

        const adminAlert = {
            from: 'yourhoneyparadise@gmail.com',
            to: 'yourhoneyparadise@gmail.com',
            subject: `Користувач ${email} має питання.`,
            text: `Не забудь відповісти цьому користувачу ${email}`,
        };

        const userAlert = {
            from: 'yourhoneyparadise@gmail.com',
            to: email,
            subject: `Зворотній зв'язок.`,
            text: `Доброго дня! Ми отримали ваше повідомлення, очікуйте зворотній звязок протягом двух годин. Дякуємо за довіру !`,
        };

        transporter.sendMail(adminAlert);
        transporter.sendMail(userAlert);

        return res.status(200).send({ info: 'Чекайте повідомлення.' });
    } catch (e) {
        return res.status(400).send({ info: 'Server is done..' });
    }
};
