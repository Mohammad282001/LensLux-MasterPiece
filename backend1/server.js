const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routers/userRoutes');
// const productRoutes = require('./routes/productRoutes');
const app = express();
app.get('/', (req, res) => {
    res.send('Server is running...');
});

const testDBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


app.use('/users', userRoutes);

testDBConnection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});