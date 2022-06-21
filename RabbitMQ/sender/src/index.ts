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
            const message = 'Hello world 2!';

            channel.assertQueue(queue, {durable: false});

            channel.sendToQueue(queue, Buffer.from(message));

            console.log('Message: ' + message);
        });

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    }
);