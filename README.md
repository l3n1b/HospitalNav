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

4. Run database launcher
   ```sh
   python database_interface/Launcher.py
   ```
