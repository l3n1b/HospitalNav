/*
some reference material: https://gist.github.com/prof3ssorSt3v3/2a196fb1c0f97216516b3a47f51e8c51
We shouldn't need the routes page in this case, we should just be able to add new locations here
To test if a route works, go http://localhost:3000/???? Ex: http://localhost:3000/helloworld
*/
const express = require('express')
const app = express()
const router = new express.Router();
const dataJson = require('./KYCTestValues.json');



/* for session things  */
const uuid = require('uuid')
const session = require('express-session');

app.use(session({
    genid: uuid.v4,
    name: 'refreshy',
    secret: 'supersecret',
    proxy: false,
    resave: false,
    rolling: true, //don't know if this needs to be true or false
    saveUninitialized: false,
    cookie:{
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}))

app.use(router)

/*                     */

const hostname = '127.0.0.1';
const port = 3001;

// app.get("/", (req, res) => {
//     res.send("This is the root!")
// })

app.get("/helloworld", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, err => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
});

router.route('/')
    .get((req, res)=>{
        res.send(`This is the root!`);
    })
    .post((req, res)=>{
        res.send("I'm on post for /");
    })

router.route('/start/:startID')
    .get((req, res)=>{
        res.send(`GET: Requesting Resource "${req.params.startID}" from /start`);
    })
    .put((req, res)=>{
        res.send(`PUT: Requesting Resource "${req.params.startID}" from /start`);
    })

router.route('/route/:startID/:destID')
    .get((req, res)=>{
        res.send(`GET: Requesting Resource start:"${req.params.startID}" and dest: "${req.params.destID}" from /route`);
    })
    .put((req, res)=>{
        res.send(`PUT: Requesting Resource start:"${req.params.startID}" and dest: "${req.params.destID}" from /route`);
    })

router.route('/destination/:destID')
    .get((req, res)=>{
        res.send(`GET: Requesting Resource "${req.params.destID}" from /destination`);
    })
    .put((req, res)=>{
        res.send(`PUT: Requesting Resource "${req.params.destID}" from /destination`);
    })

//send image to frontend 
router.route('/test')
    .get((req, res) => {
        res.sendFile("C:\\Users\\jlindemuth\\Documents\\CS 499 Project Local\\HospitalNav\\backend\\shrek.jpg");
    })

//JOSEPH LINDEMUTH
router.route('/data/:startID')
.get((req, res) => {
    let input = req.params.startID;
    x_coord = (dataJson[input]['x_coord']*2.75846)+309.9
    y_coord = (dataJson[input]['y_coord']*2.94737)+462.8
    image_path = "data\\images\\"+input+".JPG";
    // res.send(`The x coordinate is: ${x_coord} and the y coordinate is: ${y_coord} The image path is ${image_path}`);
    res.send({x: x_coord, y: y_coord, path: image_path})
})




// router
//     .route("/cars/:carid")
//     .get((req, res) => {
//       res.send("hi get /things/cars/" + req.params.carid);
//     })
//     .put((req, res) => {
//       res.send("hi put /things/cars/" + req.params.carid);
//     });
