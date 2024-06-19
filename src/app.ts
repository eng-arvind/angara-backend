import express from 'express';
import productRoutes from './routes/productRoutes';
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(productRoutes);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
