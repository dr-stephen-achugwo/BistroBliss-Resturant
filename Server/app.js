const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/db');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const mealRouter = require('./routers/mealRouter');
const bookingRouter = require('./routers/bookingRouter');
const { error } = require('jsend');
const { NotFound } = require('./errors/CustomErrors');

const app = express();

// ? Connect to Database
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// ? Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/meals', mealRouter);
app.use('/api/bookings', bookingRouter);

app.all('*', (req, res, next) => {
    const err = new NotFound("Resource not found.");
    next(err);
});

// ? Error Handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    err.status = err.status || 'error';
    res.status(err.statusCode).json({ 
        status: err.status, 
        message: err.message
    });
});

// ? Start Server
const port = config.port || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});