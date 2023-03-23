/*
some reference material: https://gist.github.com/prof3ssorSt3v3/2a196fb1c0f97216516b3a47f51e8c51
We shouldn't need the routes page in this case, we should just be able to add new locations here
To test if a route works, go http://localhost:3000/???? Ex: http://localhost:3000/helloworld
*/
const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.get("/", (req, res) => {
    res.send("This is the root!")
})

app.get("/helloworld", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, err => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
});