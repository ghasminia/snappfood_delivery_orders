import http from 'http';
import app from "./app";
import Config from "./config/config";

const server = http.createServer(app);

server.listen(Config.app.port, Config.app.host, () => {
    console.log(`Server is running in ${Config.app.host}:${Config.app.port}`);
});
