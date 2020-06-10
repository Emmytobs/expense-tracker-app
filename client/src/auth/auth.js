import axios from 'axios'

class Auth {

    user;
    authenticated;
    constructor() {
        this.user = '';
    }

    async loginUser(user) {
        // Fire off a post request to /user/signup
        this.user = user;
        return user
    }

    isAuthenticated() {
        return !!this.user;
    }
}

const auth = new Auth();

export default auth;

// const axios = require('axios');
// const express = require('express');


// const getBooks = async () => {
//     const books = await axios.get('/books');
//     return books;
// }

// (async function showBooks(){
//     const books = await getBooks();
//     console.log(books)
// }())

// console.log(getBooks())