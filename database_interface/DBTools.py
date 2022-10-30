import pyorient
import json
import re


def reset_db(client, name):

   # Remove Old Database
   if client.db_exists(name):
    client.db_drop(name)

   # Create New Database
   client.db_create(name,
      pyorient.DB_TYPE_GRAPH,
      pyorient.STORAGE_TYPE_PLOCAL)

def getrid(client,name):
    nodeId = client.query("SELECT FROM Location WHERE name = '" + str(name) + "'")
    return str(nodeId[0]._rid)
    
def getname(client, rid):
    name = client.query("SELECT name FROM " + rid.get_hash())
    return name[0].__getattr__('name')

def getEndpoints(client):
    endpoints = client.query("SELECT name FROM Location WHERE is_endpoint = TRUE")
    return [endpoint.__getattr__('name') for endpoint in endpoints]

def getphoto(client, name):
    photosphere = client.query("SELECT photosphere FROM Location WHERE name = '" + str(name) + "'")
    return photosphere[0].__getattr__('photosphere')

def loadDB(filepath):

    #database name
    dbname = "locations"
    #database login is root by default
    login = "root"
    #database password, set by docker param
    password = "rootpwd"

    #create client to connect to local orientdb docker container
    client = pyorient.OrientDB("localhost", 2424)
    session_id = client.connect(login, password)

    #remove old database and create new one
    reset_db(client,dbname)

    #open the database we are interested in
    client.db_open(dbname, login, password)

    client.command("CREATE CLASS Location EXTENDS V")
    client.command("CREATE PROPERTY Location.name String")
    client.command("CREATE PROPERTY Location.photosphere String")
    client.command("CREATE PROPERTY Location.is_endpoint Boolean")
    client.command("CREATE PROPERTY Location.x_coord Double")
    client.command("CREATE PROPERTY Location.y_coord Double")
    client.command("CREATE PROPERTY Location.map String")
    client.command("CREATE PROPERTY Location.metric Integer")

    #open and parse local json file
    with open(filepath) as f:
        data = json.load(f)

    #loop through each key in the json database and create a new vertex, V with the id in the database
    for key in data:
        client.command("CREATE VERTEX Location SET name = '" + key
        + "', photosphere = '" + data.get(key).get("photosphere")
        + "', is_endpoint = " + str(data.get(key).get("is_endpoint"))
        + ", x_coord = " + str(data.get(key).get("x_coord"))
        + ", y_coord = " + str(data.get(key).get("y_coord"))
        + ", map = " + str(data.get(key).get("map")))

    #loop through each key creating edges from location to location
    for key in data:
        location1ID = str(getrid(client,key))
        connections = data.get(key)["connectList"].split(', ')
        for location2 in connections:
            location2ID = str(getrid(client,location2))
            client.command("CREATE EDGE FROM " + location1ID + " TO " + location2ID)

    client.close()

def shortestPath(locationA, locationB):
    dbname = "locations"
    login = "root"
    password = "rootpwd"
    path = list()

    client = pyorient.OrientDB("localhost", 2424)
    session_id = client.connect(login, password)

    client.db_open(dbname, login, password)

    #get the RID of the two people
    locationAID = getrid(client,locationA)
    locationBID = getrid(client,locationB)

    #determine the shortest path
    pathlist = client.command("SELECT shortestPath(" + locationAID + ", " + locationBID +")")
    #print(pathlist[0].__getattr__('shortestPath'))

    #get distance
    distance = len(pathlist[0].__getattr__('shortestPath'))

    for node in pathlist[0].__getattr__('shortestPath'):
#        print(node)
        path.append(getname(client, node))

    #pyorient.otypes.OrientRecord
    client.close()
#    return distance-1, path

    return path
