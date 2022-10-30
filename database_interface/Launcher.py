#!/usr/bin/env python
# encoding: utf-8
import json
import random
from DBTools import loadDB
from DBTools import shortestPath
from DBTools import getEndpoints
import os
import pyorient

#Make sure orientDB version 2.2 is running, version 3.x does not work with these drivers

#-d run in background login:root password:rootpwd
#docker run -d --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=rootpwd orientdb:2.2

#-it run in foreground login:root password:rootpwd
#docker run -it --name orientdb -p 2424:2424 -p 2480:2480 -e ORIENTDB_ROOT_PASSWORD=rootpwd orientdb:2.2

#path to json file
#filepath = './data/master.json'
filepath = './data/testValues.json'
print(os.getcwd())

#loadDB with JSON data, removing existing database if it exist
#comment the load command after the database is loaded
loadDB(filepath)

distance, path = shortestPath("Student Center Front Entrance", "Subway")
print(distance, path)

dbname = "locations"
login = "root"
password = "rootpwd"

client = pyorient.OrientDB("localhost", 2424)
session_id = client.connect(login, password)

client.db_open(dbname, login, password)

print(getEndpoints(client))


'''
SELECT $path as path
FROM (
    TRAVERSE outE(), inV() FROM #19:58
) 
WHERE @rid == '17:56'
'''
