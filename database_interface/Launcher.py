import json
import random
from DBTools import printJSONDB
from DBTools import loadDB
from DBTools import shortestPath
import os

#Make sure orientDB version 2.2 is running, version 3.x does not work with these drivers

#-d run in background login:root password:rootpwd
#docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=rootpwd orientdb:2.2

#-it run in foreground login:root password:rootpwd
#docker run -it --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=rootpwd orientdb:2.2

#path to json file
filepath = './data/master.json'
print(os.getcwd())

#example of how to parse elements from JSON file
#printJSONDB(filepath)

#loadDB with JSON data, removing existing database if it exist
#comment the load command after the database is loaded
loadDB(filepath)

print(shortestPath("Chandler Main Entrance", "Chandler Pharmacy")-1)

'''
SELECT $path as path
FROM (
    TRAVERSE outE(), inV() FROM #19:58
) 
WHERE @rid == '17:56'
'''
