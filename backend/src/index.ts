import express from 'express';
import dotenv from 'dotenv';
import connectdb from './lib/database';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/user.routes').default);

app.listen(PORT,async()=>{
    await connectdb()
    console.log(`Server is running on http://localhost:${PORT}`);
})