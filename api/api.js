import express from 'express';
import PrettyError from 'pretty-error';
import http from 'http';
import config from '../src/config';

const pretty = new PrettyError();
const app = express();

app.get('/users', (req, res) => {
    res.json("FROM API");
});

if (config.apiPort) {
    const runnable = app.listen(config.apiPort, (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
        console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    });
}
