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

def printJSONDB(filepath):

    with open(filepath) as f:
        data = json.load(f)

    for key in data:
        name = data.get(key).get("name")
        is_endpoint = data.get(key).get("is_endpoint")
        photosphere = data.get(key).get("photosphere")
        connectList = data.get(key).get("connectList")

        print("json key:\t\t" + key)
        print("name:\t\t\t" + name)

        #Most people are on Wikipedia, but not everyone
        if photosphere is not None:
            print("photosphere:\t\t" + wikiUrl)

        print("connectList:\t", end=" ")
        print(connectList)
        print("")

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
    client.command("CREATE PROPERTY Location.is_startpoint Boolean")
    client.command("CREATE PROPERTY Location.x_coord Double")
    client.command("CREATE PROPERTY Location.y_coord Double")
    client.command("CREATE PROPERTY Location.map String")

    #open and parse local json file
    with open(filepath) as f:
        data = json.load(f)

    #loop through each key in the json database and create a new vertex, V with the id in the database
    for key in data:
        #print("CREATE VERTEX Person SET id = '" + key + "', name = '" + name + "'")
        client.command("CREATE VERTEX Location SET name = '" + key + "', photosphere = '" + data.get(key).get("photosphere") + "', is_endpoint = " + str(data.get(key).get("is_endpoint")))

    #loop through each key creating edges from location to location
    for key in data:
        location1ID = str(getrid(client,key))
        for location2 in data.get(key)["connectList"]:
            location2ID = str(getrid(client,location2))
            client.command("CREATE EDGE FROM " + location1ID + " TO " + location2ID)

    client.close()

def shortestPath(locationA, locationB):
    dbname = "locations"
    login = "root"
    password = "rootpwd"

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
        print(node)

    #pyorient.otypes.OrientRecord
    client.close()
    return distance
