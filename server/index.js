const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const orderRoutes = require('./routes/orderRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();

app.use(cors({
    origin: '*', // or specify your frontend domain
  }));

app.use(express.json())
dotenv.config()

connection();

app.use(express.static('uploads/'));

app.use('/api/user',userRoutes);
app.use('/api/brand',brandRoutes);
app.use('/api/car',carRoutes);
app.use('/api/order',orderRoutes);

app.listen(process.env.PORT,() => {
    console.log('Car Running on port 5000');
})
