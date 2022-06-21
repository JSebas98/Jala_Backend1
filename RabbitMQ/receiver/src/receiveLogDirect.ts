const amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length === 0) {
    console.log('To run: ts-node receiveLogDirect.ts [info] [warning] [error]');
    process.exit(1);
}

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

            const exchange = 'directLogs';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.assertQueue('', {
                exclusive: true
            }, function(error2: any, q: any) {
                if (error2) {
                    throw error2;
                }

                console.log(' [*] Waiting for logs. To exit press CTRL+C');

                args.forEach(function(severity) {
                    channel.bindQueue(q.queue, exchange, severity);
                });

                channel.consume(q.queue, function(msg: any) {
                    console.log(` [x] ${msg.fields.routingKey}: '${msg.content.toString()}'`);
                }, {
                    noAck: true
                });
            });
        });
    }
);