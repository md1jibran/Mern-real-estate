import express from 'express';
import mongoose from 'mongoose';


import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to Mongodb');
})
.catch((err) =>{
    console.log(err);
});

const app = express();
// allow json input of the server
app.use(express.json());


app.listen(3000,()=>{
    console.log('server is running on port 3000!');
}
);

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

// middleware for handling error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});