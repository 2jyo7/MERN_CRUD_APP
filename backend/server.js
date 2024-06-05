const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())


app.use('/api/v1/users', userRoutes);

const PORT = 5000;

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


app.use((err, req, res, next) => {
    res.locals.error = err;
    //------------------------vvvvvvv added
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

mongoose.connect(process.env.MONGO_URI).
then(() => {
    console.log("Database connection established...!")
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}).
catch((err) => console.log(err));

