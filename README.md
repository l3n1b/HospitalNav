# HospitalNav

HospitalNav is a web application that gives directions to all relevant locations within the UK Healthcare hospital system.

## Getting Started

Below is what you need to get HospitalNav running.


### Installation


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

4. Edit the code to run on your machine:

   In ```database_interface/DBTools.py```, replace the IP in ```ip = "172.17.0.2"``` with the IP address of your OrientDB container.
   
	This can be found by running:

		docker inspect orientdb

	and looking for "IPAddress"
      
   Next, replace instances of the URL in ```database_interface/templates/main-page.html``` with your machine's IP address or localhost:
   
		Find and replace ukhealthgps.servehttp.com with <ip-address> or localhost.
      
   If you use ```localhost```, in ```database_interface/httpcontrollers.py```, change 
   
		app.run(host='0.0.0.0', port=36824, debug=True)
	to
	
		app.run(host='localhost', port=36824, debug=True)

5. Build Flask app docker image
   ```sh
   docker image build -t flask_docker .
   ```
   
6. Run Flask app docker image
   ```sh
   docker run -p 36824:36824 -d flask_docker
   ```
   
7. Go to website
   ```sh
   http://localhost:36824/
   ```
   
   or to your machine's IP address after port forwarding port 36824
   
   ```sh
   http://<ip-address>:36824/
   ```
