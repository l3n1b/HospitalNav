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
const fs = require('fs')

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

// this makes network things easier
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

// catches errors
app.listen(port, err => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
});

// root route
router.route('/')
    .get((req, res)=>{
        res.send(`This is the root!`);
    })
    .post((req, res)=>{
        res.send("I'm on post for /");
    })

// routes for getting resources
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

// Return image if it exists with the right name and .png or .jpg extension
router.route('/card/:imgId')
    .get((req, res) => {
        let input = req.params.imgId;
        let file = __dirname + "/backendData/cardImages/" + input

        if (fs.existsSync(file + ".png")) { // check for png file
            res.sendFile(file + ".png");
        } else if (fs.existsSync(file + ".jpg")) { // check for jpg file
            res.sendFile(file + ".jpg");
        } else { // send placeholder image
            res.sendFile(__dirname + "/backendData/cardImages/imgPlaceholder.jpg");
        }
    })


// return all entrances
router.route('/data/entrances')
    .get((req, res) => {
        let entrances = [];
        for(let key in dataJson){
            if(dataJson[key].is_startpoint == "TRUE") {
                entrances.push({name: key, details: dataJson[key].entranceDetails})
            }
        }
        res.send(entrances);
    })

// return all destinations
router.route('/data/destinations')
    .get((req, res) => {
        let destinations = [];
        for(let key in dataJson){
            if(dataJson[key].is_endpoint == "TRUE") {
                destinations.push({name: key, details: dataJson[key].destinationDetails})
            }
        }
        res.send(destinations);
    })

// Return coordinates, image path, and navigation path from start to end
router.route('/data/:startID/:currentID/:endID')
.get((req, res) => {
    let start = req.params.startID;
    let end = req.params.endID;
    let current = req.params.currentID;
    x_coord = (dataJson[current]['x_coord']*2.75846)+309.9;
    y_coord = (dataJson[current]['y_coord']*2.94737)+462.8;
    image_path = "/images/"+current+".JPG";

    navigation_route = getRoute(start, end);

    res.send({x: x_coord, y: y_coord, imagePath: image_path, route: navigation_route});
})

// Diskstra's algorithm for finding the shortest path
// Applied to KYCTestValues.json looking at the connectionsList of each location
function getRoute(startNode, endNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = [];

    // Initialize all distances to infinity, and the startNode's distance to 0
    for (let node in dataJson) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;

    // Add the startNode to the queue
    queue.push(startNode);

    // Loop until the queue is empty
    while (queue.length > 0) {
      // Get the node with the shortest distance from the startNode
      let currentNode = queue.shift();

      // If this is the endNode, we're done!
      if (currentNode === endNode) {
        // Build the path by traversing the previous object
        const path = [];
        while (currentNode) {
          path.push(currentNode);
          currentNode = previous[currentNode];
        }
        path.reverse();
        return path;
      }

      // Skip this node if we've already visited it
      if (visited[currentNode]) {
        continue;
      }
      visited[currentNode] = true;

      // Update the distances of this node's neighbors
      for (let neighbor of getConnections(currentNode)) {
        let distance = 1;
        let totalDistance = distance + distances[currentNode];
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentNode;
          queue.push(neighbor);
        }
      }
    }

    // If we get here, there's no path from startNode to endNode
    return null;
  }

function getConnections(location) {
    let connections = [];
    for(let connection of dataJson[location]['connectList']){
        connections.push(connection.name);
    }
    return connections
}

// router
//     .route("/cars/:carid")
//     .get((req, res) => {
//       res.send("hi get /things/cars/" + req.params.carid);
//     })
//     .put((req, res) => {
//       res.send("hi put /things/cars/" + req.params.carid);
//     });
