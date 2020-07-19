const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,  
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateJWT = async function() {
    // Create a token for each the user
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    // Add the token to the beginning of the tokens array
    this.tokens.unshift({ token });
    // Save the user with the new token.
    await this.save();
    return token;
}

userSchema.statics.findByLoginCredentials = async ({ username = '', email = '', password }) => {
    // We want to give the user a bit more flexibility
    // So that they can proovide either username or email with a password to login
    let user;

    if(username === '') {
        // If the username is not provided, the default value (the empty string) is used
        // The user most likely used an email, so we'll find the user by email instead
        user = await User.findOne({ email })
    }
    else if(email === '') {
        // If the email is not provided, the default value (the empty string) is used
        // The user most likely used a username, so we'll find the user by username instead
        user = await User.findOne({ username })
    }
    if(!user) throw new Error('Your login credentials don\'t match our records');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Your login credentials don\'t match our records');

    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;