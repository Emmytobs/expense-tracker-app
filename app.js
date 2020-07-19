const path = require('path');
const express = require('express');
const app = express();

require('dotenv').config();
require('./db/mongoose');

app.use(express.json())

const PORT = process.env.PORT;

const userRoute = require('./routes/userRoutes');
const transactionRoute = require('./routes/transactionRoutes');
app.use('/user', userRoute);
app.use(transactionRoute);

// if(process.env.NODE_ENV === 'production') {
    const publicDirectoryPath = path.join(__dirname, 'client/build');
    app.use(express.static(publicDirectoryPath));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'))
    })
// }

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
    
// Install multer at 1.4.1
// Install links.mead.io/files