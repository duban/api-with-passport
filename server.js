const express = require("express");
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require("cors");
// const HttpException = require('./utils/HttpException.utils');
// const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./app/routes/user.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(passport.initialize());
app.use(cors());
// Enable pre-flight
app.options("*", cors());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hi there, welcome!" });
});

const port = Number(process.env.PORT || 3331);

app.use('/api', userRouter);
// app.use(userRouter);

// 404 error
// app.all('*', (req, res, next) => {
//     const err = new HttpException(404, 'Endpoint Not Found');
//     next(err);
// });

// Error middleware
// app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`Server running on port ${port}!`));


module.exports = app;
