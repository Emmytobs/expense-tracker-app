const path = require('path');
const express = require('express');
const app = express();
require('./db/mongoose');
app.use(express.json())

// const publicDirectoryPath = path.join(__dirname, 'client/build');
const PORT = process.env.PORT || 5000;

// app.use(express.static(publicDirectoryPath));
const userRoute = require('./routes/userRoutes');
const transactionRoute = require('./routes/transactionRoutes');
app.use('/user', userRoute);
app.use(transactionRoute);

app.get('/books', (req, res) => {
    res.json([
        {
            title: 'Book_1',
            author: 'author_1'
        }
    ])
})

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
    
// Install multer at 1.4.1
// Install links.mead.io/files