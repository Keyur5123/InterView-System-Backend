const express = require('express');
const app = express();
const cors = require('cors');
const conn = require('./api/services/common-services/dbConnection');
const authRoutes = require('./config/routes');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}))

app.use(express.json());

app.use('/interview-system/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server listening on http://localhost:${process.env.PORT}`);
})
