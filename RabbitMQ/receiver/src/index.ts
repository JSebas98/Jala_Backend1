const amqp = require('amqplib/callback_api');

amqp.connect(
    {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'admin',
        password: 'admin123'
    }, function (error0: any, connection: any) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1: any, channel: any) {
            if (error1) {
                throw error1;
            }

            const queue = 'hello';

            channel.assertQueue(queue, {durable: false});

            console.log('Waiting for messages...');

            channel.consume(queue, function(message: any) {
                if (message) {
                    console.log('Message received: ' + message.content.toString());                    
                }
            }, {
                noAck: true
            });
        });
    }
);