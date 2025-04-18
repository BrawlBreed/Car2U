const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const orderRoutes = require('./routes/orderRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();

app.use(cors());

app.use(express.json())
dotenv.config()

connection();

app.use(express.static('uploads/'));

app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/car',carRoutes);
app.use('/api/order',orderRoutes);

app.use((req, res, next) => {
    const allowedOrigins = ['https://car2-u.vercel.app', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Source, Referer, Countrycode');
  
    next();
});

app.listen(process.env.PORT,() => {
    console.log('Car Running on port 5000');
})
