import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import tax from './router/tax.js';

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
    "https://tax-calculator-murex.vercel.app",
    "https://tax-calculator-git-main-taruns-projects-93c37392.vercel.app",
    "https://tax-calculator-cubtc7d4c-taruns-projects-93c37392.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected.'))
    .catch((err) => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

app.use('/api/tax', tax);

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Welcome to the Tax Calculator backend server.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running at: http://localhost:${PORT}`));
