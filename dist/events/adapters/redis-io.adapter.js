"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redisIoAdapter = require("socket.io-redis");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const redisAdapter = redisIoAdapter({ host: '127.0.0.1', port: 6379 });
        server.adapter(redisAdapter);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map