import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";

import { notFound } from "./middleware/notfound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import config from "./config";
import { authRoutes } from "./models/auth/auth.routes";
import { orderRoutes } from "./models/order/order.routes";
import { checkoutRoutes } from "./models/checkout/checkout.routes";
import { webhookRoutes } from "./models/checkout/webhook.routes";

// -----------routes import---------

const app: Application = express();

app.use(
    cors({
        origin: config.client_url,
        credentials: true,
    }),
);

app.use("/api/webhook", webhookRoutes); // must come before express.json()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
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

app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
