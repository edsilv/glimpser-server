var bodyParser = require('body-parser');
var config = require('./config');
var express = require('express');
var fs = require("fs");
var http = require("http");
var json = require('express-json');
var url = require("url");
var app = express();

app.set('port', config.server.port);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(json());

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/item_types', function (req, res) {
    
    request(buildUri('item_types')).then((result) => {
        res.status(200).send(result);
    });
    
});

function buildUri(method) {
    return config.endPoint + '/' + method + '?key=' + config.apiKey;
}

function request(uri) {
    
    return new Promise((resolve, reject) => {

        var u = url.parse(uri);

        var opts = {
            host: u.hostname,
            port: u.port,
            path: u.path,
            method: "GET",
            withCredentials: false
        };
    
        var request = http.request(opts, (response) => {
            var result = "";
            response.on('data', (chunk) => {
                result += chunk;
            });
            response.on('end', () => {
                resolve(result);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}