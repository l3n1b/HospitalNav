# HospitalNav

HospitalNav is a web application that gives directions to all relevant locations within the UK Healthcare hospital system.

## Updated New Project
### Getting Started
#### **Installation**
1. Clone the repo
   ```sh
   https://github.com/l3n1b/HospitalNav.git
   ```
2. Install Node
   
   Download Link (Windows & macOS):
   https://nodejs.org/en/download
   
   OR

   Brew (macOS):
   ```
   brew install node
   ```

3. Install yarn
   ```
   npm install --global yarn
   ```

4. Install dependencies
   
   In two seperate terminal windows, run the following:
   
   terminal 1:
   ```
   cd frontend
   yarn install
   ```
   terminal 2:
   ```
   cd backend
   yarn install
   ```
5. Run the project
   
   In both terminal windows, run:
   ```
   yarn start
   ```
#### **Running Tests**
For frontend tests, run:
```sh
cd frontend
yarn cypress
```
Note: the frontend must be running!

For backend tests, run:
```sh
cd backend
...
```
### Development
As of fall 2023, we have updated this project to use ReactJS (frontend) and NodeJS w/Express (backend). This change was made to stay more in line with the curriculum (CS 316 Web Programming) here at the University of Kentucky and also to streamline the development process.

We currently are not utilizing a database like the previous group was, instead the intention was to parse door, hallway, and endpoint information out of a JSON file. Whether this is a good strategy or not was up for some debate.

#### **Adding new dependencies**
Adding new dependencies (packages) for the front or backend is done through yarn. To add a new dependency, run:
```sh
yarn add [name of npm package]
```
This will update the package.json to include the new dependancy.

Once this change is pushed, all other developers will need to run:
```sh
yarn install
```
This will download the new dependancy to node_modules.

#### **Next steps**


FOR THEN END OF THE PROJECT

## Old Project
### Getting Started

Below is what you need to get HospitalNav running.


#### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/KolibreKrit/HospitalNav.git
   ```
   
2. Install Docker
   ```sh
   https://www.docker.com/products/docker-desktop/
   ```

3. Open an OrientDB graph database
   ```sh
   docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=rootpwd orientdb:2.2
   ``` 

4. Edit the code to run on your machine with docker:

   In ```database_interface/DBTools.py```, replace the IP in ```ip = "172.17.0.2"``` with the IP address of your OrientDB container.
   
	This can be found by running:

		docker inspect orientdb

	and looking for "IPAddress"
      
   Next, replace instances of the URL in ```database_interface/templates/main-page.html``` with localhost:
   
		Find and replace ukhealthgps.servehttp.com with localhost.
		
5. If you want to run the code without docker, 
	
	First, run ```pip3 install -r requirements.txt``` (you might have to change some of the versions in requirements.txt)
	
	Next, make a folder ```lines``` in data/images
	
	Next, in ```database_interface/DBTools.py```, replace the IP in ```ip = "172.17.0.2"``` with localhost
	
	Next, in ```database_interface/templates/main-page.html```, find and replace ```ukhealthgps.servehttp.com``` with localhost
	
	Next, run ```python3 database_interface/httpcontrollers.py```


6. Build Flask app docker image
   ```sh
   docker image build -t flask_docker .
   ```
   
7. Run Flask app docker image
   ```sh
   docker run -p 36824:36824 -d flask_docker
   ```
   
8. Go to website
   ```sh
   http://localhost:36824/
   ```
