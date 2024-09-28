const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const brandRoute = require('./routes/brandsRoutes');
const lensesRoute = require('./routes/lensesRouter');
const glassesRouter = require("./routes/glassesRouter");
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/brand', brandRoute);
app.use('/api/lenses', lensesRoute);
app.use('/api/glasses', glassesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});