const express = require('express');
const connection  = require('./database/database');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const brandRoutes = require('./routes/brandRoutes')
const orderRoutes = require('./routes/orderRoutes')
const carRoutes = require('./routes/carRoutes')
const cors = require('cors')
const app = express();
const path = require('path');
const fs   = require('fs');

app.use(cors({
  origin: '*',   // or '*' for any origin
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(express.json({ limit: '10mb' }));  // need bigger limit for base64 payloads
app.use(express.urlencoded({ extended: true }));
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
