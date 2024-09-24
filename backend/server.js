const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});



app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});