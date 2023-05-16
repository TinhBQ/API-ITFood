const express = require('express');
const dotenv = require('dotenv');
const connect = require('./database/database.js')
const { OutputType, print } = require('./helpers/print.js');
const { notFound, errorHandler } = require("./routes/errorMiddleware.js");
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');
const {
    userRoutes,
    addressRoutes,
    categoryRoutes,
    productRoutes,
    cartItemRoutes,
    orderRoutes,
    deliveryRoutes,
    commentRoutes
} = require('./routes/index.js')

const app = express();
app.use(express.json())
dotenv.config();

app.use('/users', userRoutes);
app.use('/users', addressRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/cart-items', cartItemRoutes);
app.use('/orders', orderRoutes);
app.use('/deliveries', deliveryRoutes);
app.use('/comments', commentRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3002;
app.listen(port, async () => {
    await connect();
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "itfood-e43fe.appspot.com",
    });
    print(`Listening on port ${port}`, OutputType.INFORMATION);
});
