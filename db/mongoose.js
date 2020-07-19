const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;

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
