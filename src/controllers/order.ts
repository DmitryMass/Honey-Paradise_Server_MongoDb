import * as dotenv from 'dotenv';
dotenv.config();
import { RequestHandler } from 'express';
import Order from '../models/Order';
import { transporter } from '../sendmailer/sendmailer';

interface IReqBody {
    email: string;
    amount: string;
    container: string;
    message?: string;
}

export const order: RequestHandler = async (req, res) => {
    try {
        const { body } = req;
        const { email, amount, container, message } = body as IReqBody;
        if (email) {
            const order = new Order({
                email,
                amount,
                container,
                message,
            });
            const mailForUser = {
                from: 'yourhoneyparadise@gmail.com',
                to: email,
                subject: 'Вас вітає HoneyParadise.',
                text: 'Дякуємо за інтерес. Вашу заявку було прийнято. Очікуйте на додаткове повідомлення.',
            };
            const mailForAdmin = {
                from: 'yourhoneyparadise@gmail.com',
                to: 'yourhoneyparadise@gmail.com',
                subject: `Клієнт: ${email}`,
                text: `Залишив заявку. Amount ${amount}. Container ${container}. Message: ${message}`,
            };
            transporter.sendMail(mailForUser);
            transporter.sendMail(mailForAdmin);
            await order.save();
            return res.status(200).send({ info: 'Дякуємо за замовлення!' });
        }
    } catch (e) {
        return res.status(400).send({
            info: 'Вибачте сервер не працює, бджілки трохи втомилися, намагаємося їх підбадьорити',
        });
    }
};
