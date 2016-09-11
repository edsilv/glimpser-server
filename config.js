var apiKey = 'e708bb70dd10ccf7cb7f0aced4c7a64339c37e40';

var config = {
    development: {
        apiKey: apiKey,
        endPoint: 'http://37.139.8.83/api',
        server: {
            port: 3000
        }
    },
    production: {
        apiKey: apiKey,
        endPoint: 'http://127.0.0.1/api',
        server: {
            port: 9000
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];