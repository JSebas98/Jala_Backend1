import amqp from 'amqplib/callback_api';
import { injectable } from 'inversify';
import { MessageToQueue } from '../shared/types';

const connectionParams = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST,
    port: parseInt(process.env.RABBIT_PORT as string),
    username: process.env.RABBIT_USERNAME,
    password: process.env.RABBIT_PASSWORD
}

const queue: string = 'stats';

@injectable()
export class StatsService {

    connection!: amqp.Connection;
    channel!: amqp.Channel;

    constructor() { 
        this.connect();
        console.log('Connecting from constructor.');
    }

    connect() {
        amqp.connect(connectionParams, (err0: any, connection: amqp.Connection) => {
                if(err0) {
                    throw err0;
                }
                this.connection = connection;

                connection.createChannel((err1: any, channel: amqp.Channel) => {
                    if(err1) {
                        throw err1;
                    }
                    this.channel = channel;
                })
            }
        );
    }

    sendMessage(message: MessageToQueue) {
        if(!this.channel) {
            this.connect();
        }

        this.channel.assertQueue(queue, { durable: false });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    closeConnection() {
        this.connection.close();
    }
}

