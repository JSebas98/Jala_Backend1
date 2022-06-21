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

            const exchange = 'directLogs';
            const args = process.argv.slice(2);
            const msg = args.slice(1).join(' ') || 'Default';
            const severity = (args.length > 0) ? args[0] : 'info';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });

            channel.publish(exchange, severity, Buffer.from(msg));

            console.log(` [x] Sent ${severity}: '${msg}'`);
        });

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    }
);