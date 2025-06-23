import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors'; // ✅ import it
import { connect } from 'mongoose';
import licenseRoutes from './src/routes/licenseRoutes.js';

const app = express();

// ✅ Use it before routes
app.use(cors()); // <-- allows requests from other origins
app.use(json());

// Routes
app.use('/api', licenseRoutes);


// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
