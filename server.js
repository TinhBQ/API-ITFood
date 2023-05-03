const express = require('express');
const dotenv = require('dotenv');
const connect = require('./database/database.js')
const { OutputType, print } = require('./helpers/print.js');
const { userRoutes, addressRoutes, categoryRoutes, productRoutes, cartItemRoutes } = require('./routes/index.js')
const { notFound, errorHandler } = require("./routes/errorMiddleware.js");

const app = express();
app.use(express.json())
dotenv.config();

app.use('/users', userRoutes);
app.use('/users', addressRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/cart-items', cartItemRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3002;
app.listen(port, async() => {
    await connect();
    print(`Listening on port ${port}`, OutputType.INFORMATION);
});
