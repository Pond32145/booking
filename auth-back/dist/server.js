"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const passport_1 = __importDefault(require("passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
require("./config/passport.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);
const connectDB = async () => {
    try {
        await (0, typeorm_1.createConnection)({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/models/*.ts'],
            synchronize: true,
            logging: false,
        });
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
app.use('/auth', auth_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Auth service is running' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Auth server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map