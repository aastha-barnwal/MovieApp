import express from 'express';
import movieRoutes from './routes/movieRoutes';
import reviewRoutes from './routes/reviewRoutes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './config/db';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware to parse JSON
app.use(bodyParser.json());
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
