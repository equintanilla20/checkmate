import express from 'express';
import healthcheckRoute from './routes/healthcheck.routes.js';

const port = 3001;
const hostname = 'localhost';

const app = express();
app.use(express.json());

/* Routes */
app.use('/api/healthCheck', healthcheckRoute);

// Start the server and listen for incoming requests
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}. . .`);
});