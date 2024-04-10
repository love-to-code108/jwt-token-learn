const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');


const posts = [{
    username: 'kyle',
    title: 'post 1',
},
{
    username: 'biswanath',
    title: 'post 2',
}];


app.use(express.json());



app.get('/posts' , (req,res) => {

    res.json(posts);
})


app.post('/login' , (req,res) => {
    // AUTHENTICATE THE USER

    const username = req.body.username ;

    // fits parameter PAYLOAD , 
    jwt.sign()

})


app.listen(3000, () => {
    console.log("Server is running");
})