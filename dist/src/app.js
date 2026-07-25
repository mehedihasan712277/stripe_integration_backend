"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notfound_1 = require("./middleware/notfound");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const config_1 = __importDefault(require("./config"));
const auth_routes_1 = require("./models/auth/auth.routes");
const order_routes_1 = require("./models/order/order.routes");
const checkout_routes_1 = require("./models/checkout/checkout.routes");
const webhook_routes_1 = require("./models/checkout/webhook.routes");
const property_routes_1 = require("./models/property/property.routes");
// -----------routes import---------
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.client_url,
    credentials: true,
}));
app.use("/api/webhook", webhook_routes_1.webhookRoutes); // must come before express.json()
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Backend API</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            font-family: Inter, Arial, Helvetica, sans-serif;
            background: linear-gradient(-45deg,
                    #0f172a,
                    #1e3a8a,
                    #312e81,
                    #7c3aed,
                    #2563eb);
            background-size: 400% 400%;
            animation: gradient 12s ease infinite;
        }

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

        .card {
            width: 90%;
            max-width: 650px;
            padding: 50px;
            border-radius: 24px;
            text-align: center;

            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);

            border: 1px solid rgba(255, 255, 255, .12);

            box-shadow:
                0 25px 50px rgba(0, 0, 0, .35),
                inset 0 1px 1px rgba(255, 255, 255, .08);
        }

        h1 {
            font-size: 3rem;
            color: white;
            margin-bottom: 15px;
            letter-spacing: .5px;
        }

        p {
            color: rgba(255, 255, 255, .8);
            font-size: 1.05rem;
            margin-bottom: 30px;
        }

        .status {
            display: inline-flex;
            align-items: center;
            gap: 10px;

            padding: 12px 24px;
            border-radius: 999px;

            background: rgba(34, 197, 94, .15);
            border: 1px solid rgba(34, 197, 94, .4);

            color: #4ade80;
            font-weight: 600;
            font-size: 1rem;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #22c55e;
            animation: pulse 1.6s infinite;
        }

        @keyframes pulse {

            0%,
            100% {
                transform: scale(1);
                opacity: 1;
            }

            50% {
                transform: scale(1.8);
                opacity: .5;
            }
        }

        footer {
            margin-top: 40px;
            color: rgba(255, 255, 255, .55);
            font-size: .9rem;
        }
    </style>
</head>

<body>

    <div class="card">

        <h1>Portfolio Backend</h1>

        <p>REST API for the Dynamic Portfolio Management System</p>

        <div class="status">
            <span class="dot"></span>
            Server is Running
        </div>

        <footer>
            © ${new Date().getFullYear()} Portfolio Backend API
        </footer>

    </div>

</body>

</html>
`);
});
app.use("/api/auth", auth_routes_1.authRoutes);
app.use("/api/checkout", checkout_routes_1.checkoutRoutes);
app.use("/api/orders", order_routes_1.orderRoutes);
app.use("/api/properties", property_routes_1.propertyRoutes);
app.use(notfound_1.notFound);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map