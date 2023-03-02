import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/indexRouter';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api", routes);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoDB = process.env.MONGO_URI;
mongoose.connect(`${mongoDB}`)
        .then(() => {
         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
        .catch(err => console.log(`MongoDB connection error: ${err}`));