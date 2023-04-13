/*
some reference material: https://gist.github.com/prof3ssorSt3v3/2a196fb1c0f97216516b3a47f51e8c51
We shouldn't need the routes page in this case, we should just be able to add new locations here
To test if a route works, go http://localhost:3000/???? Ex: http://localhost:3000/helloworld
*/
const express = require('express')
const cors = require("cors"); // Allows cross origin requests to go through and prevent fetches to API from erroring out
const app = express()
const router = new express.Router();
const dataJson = require('./KYCTestValues.json');
const os = require('os');

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

var networkInterfaces = os.networkInterfaces();
const serverAddress = (networkInterfaces['Wi-Fi'][1].address);
// Prevent client requests getting blocked
app.use((req, res, next) => {
    const corsWhitelist = [
        'http://localhost:3000',
        'http://' + serverAddress + ':3000'
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
});

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

router.route('/data/:startID')
.get((req, res) => {
    let input = req.params.startID;
    x_coord = (dataJson[input]['x_coord']*2.75846)+309.9
    y_coord = (dataJson[input]['y_coord']*2.94737)+462.8
    image_path = "/images/"+input+".JPG";
    // res.send(`The x coordinate is: ${x_coord} and the y coordinate is: ${y_coord} The image path is ${image_path}`);
    res.send({x: x_coord, y: y_coord, imagePath: image_path})
})

router.route('/data/:startID/:endID')
.get((req, res) => {
    let start = req.params.startID;
    let end = req.params.endID;
    x_coord = (dataJson[start]['x_coord']*2.75846)+309.9
    y_coord = (dataJson[start]['y_coord']*2.94737)+462.8
    image_path = "/images/"+start+".JPG";

    navigation_route = getRoute(start, end)

    res.send({x: x_coord, y: y_coord, imagePath: image_path, route: navigation_route})
})

function getRoute(start, end) {
    return [{'name': '1st Floor Main Entrance', 'x_coord': 250.0, 'y_coord': 98.0, 'floor': '1', 'angle': -0.8746, 'angle_back': 2.266992653589793, 'string_direction': 'Head straight for 15 feet', 'line_name': 'line_1st Floor Main Entrance_Hall4_Vascular Interventional Radiology.png'},
    {'name': 'Hall4', 'x_coord': 264.0, 'y_coord': 88.0, 'floor': '1', 'angle_back': 0.063, 'angle': 3.0, 'string_direction': 'Head straight for 25 feet', 'line_name': 'line_Hall4_Vascular Interventional Radiology.png'},
    {'name': 'Vascular Interventional Radiology', 'x_coord': 289.0, 'y_coord': 86.0, 'floor': '1', 'angle_back': -0.8155, 'angle': 2.326092653589793, 'string_direction': "You've arrived!", 'line_name': 'line_Vascular Interventional Radiology.png'}]
}


// router
//     .route("/cars/:carid")
//     .get((req, res) => {
//       res.send("hi get /things/cars/" + req.params.carid);
//     })
//     .put((req, res) => {
//       res.send("hi put /things/cars/" + req.params.carid);
//     });
