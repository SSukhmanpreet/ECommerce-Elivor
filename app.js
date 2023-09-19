const dotenv = require("dotenv");
dotenv.config();
require("./db/conn");
const path = require("path");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminUserRouter = require('./routes/adminUserRoutes');
const authRouter = require('./routes/authorizationRoutes');
const cartRouter = require('./routes/cartRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const testRouter = require('./routes/testRoutes');
const userRouter = require('./routes/userRoutes');

//creating server
const app = express();
// const port = 8003;
const port = process.env.PORT || 8003;

//middleware
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(cors({ credentials: true, allowedHeaders: "*", }));
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/admin', adminUserRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/test', testRouter);
app.use('/user', userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`server is started at port number: ${port}`);
});
