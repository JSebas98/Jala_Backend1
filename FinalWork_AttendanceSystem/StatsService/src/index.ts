import * as dotenv from 'dotenv';
dotenv.config();

import amqp from 'amqplib/callback_api';
import { UserService } from './services/user.service';

const QUEUE: string = 'stats';
const userService: UserService = new UserService();
const connectionParams = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST,
    port: parseInt(process.env.RABBIT_PORT as string),
    username: process.env.RABBIT_USERNAME,
    password: process.env.RABBIT_PASSWORD
}

amqp.connect(connectionParams,(err0: any, connection: any) => {
        if(err0) {
            throw err0;
        }

        connection.createChannel((err1: any, channel: any) => {
            if(err1) {
                throw err1;
            }
            channel.assertQueue(QUEUE, { durable: false });
            console.log(`Connection with queue ${QUEUE} established! Waiting for messages...`)
            channel.consume(QUEUE, async (msg: any) => {
                if (msg) {
                    const messageString = msg.content.toString();
                    console.log(`Received: ${messageString}`);
                    const message = JSON.parse(messageString);
                    const updatedUser = await userService.updateUserTotalAttendance(message);
                    
                    if (updatedUser) {
                        channel.ack(msg);
                    }
                }
            }, {
                noAck: false
            });
        });
    }
);