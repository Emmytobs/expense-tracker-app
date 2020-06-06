const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/expense-tracker-api';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})
mongoose.connection.on('error', (error) => {
    console.log(error)
})
