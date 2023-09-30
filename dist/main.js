"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const adapters_1 = require("./events/adapters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet(), compression());
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 500,
    }));
    app.enableCors({ origin: (origin, callback) => {
            const whitelist = ['http://localhost:8080', 'http://localhost:3002'];
            if (!origin) {
                return callback(null, true);
            }
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    });
    app.useWebSocketAdapter(new adapters_1.RedisIoAdapter(app));
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map