const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
require('dotenv').config();






const posts = [{
    username: 'kyle',
    title: 'post 1',
},
{
    username: 'biswanath',
    title: 'post 2',
}];


app.use(express.json());








const authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {return res.sendStatus(401);}



    jwt.verify(token, process.env.JWT_TOKEN_SECRET , (err , user) => {
        if(err) 
        {return res.sendStatus(403);}
        req.user = user
        next()
    })
    

}




app.get('/posts' ,authenticateToken, (req,res) => {

    res.json(posts.filter( post => post.username === req.user.name));
})







app.post('/login' , (req,res) => {
    // AUTHENTICATE THE USER

    const username = req.body.username ;
    const user = { name : username };

    // fits parameter PAYLOAD , SECRET_KEY 
    const acessToken = jwt.sign(user , process.env.JWT_TOKEN_SECRET);
    res.json({ accessToken : acessToken });

})






app.get('/', (req, res) => {

    // console.log('GET request received',req.url);
    console.log(req.ip);
    res.send("Hello world")
  });


// app.use((req,res) => {
//     console.log("sex")
// })





app.listen(3000, () => {
    console.log("Server is running");
})