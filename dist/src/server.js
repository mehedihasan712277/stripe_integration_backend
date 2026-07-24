"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const prisma_1 = require("./lib/prisma");
require("dotenv/config");
const PORT = config_1.default.port;
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Database connected successfully");
        app_1.default.listen(PORT, () => {
            console.log(`server is running on port : ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error while starting the server", error);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map