import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors(
    {
        origin: 'https://mern-notes-app-frontend-rvow.onrender.com/', //frontend url
    }
));

app.use(express.json()); //this middleware will help us to parse json bodies

app.use(rateLimiter)

// our simple custom middleware to log request method and url=
// app.use((req, res, next) => {
//     console.log(`Req methos is: ${req.method} and the req url is: ${req.url}`);
//     next()
// }) 

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})




// app.use('/api/products', productRoutes)
// app.use('/api/posts', postsRoutes)
// app.use('/api/payments', paymentsRoutes)
// app.use('/api/emails', emailsRoutes)

//this way we dont pollute and keep the files seperated















//what is an end Ponint?
//an endpoint is a combinantion of a specific URL + HTTP method that lets the client interact with a specific resource.

// app.get('/api/notes', (req, res) => {
//     res.status(200).send('You got 20 notes');
// })

// app.post('/api/notes', (req, res) => {
//     res.status(201).json({mesage: 'Note created successfully'});
// })

// app.put('/api/notes/:id', (req, res) => {
//     res.status(200).json({mesage: 'Note updated successfully'});
// })

// app.delete('/api/notes/:id', (req, res) => {
//     res.status(200).json({mesage: 'Note deleted successfully'});
// })



