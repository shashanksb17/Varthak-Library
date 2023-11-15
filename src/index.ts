import express from 'express';
import './config/dbConnection'; 
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.get("/",(req,res)=>{
    res.send("Home Page of Varthak-Library")
})
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

