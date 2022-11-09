import pyorient
import json
import re
import numpy as np


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

#get several attributes needed by web client
def getattr(client, rid):
    attr = client.query("SELECT name, x_coord, y_coord, floor FROM " + rid.get_hash())
    return {"name": attr[0].name, "x_coord": attr[0].x_coord, "y_coord": attr[0].y_coord, "floor": attr[0].floor}

def getangle(client, ridout, ridin):
    angle = client.query("SELECT angle FROM Connection WHERE out = " + ridout.get_hash() + " AND in = " + ridin.get_hash())
    return angle[0].angle

def getEndpoints(client):
    endpoints = client.query("SELECT name FROM Location WHERE is_endpoint = TRUE")
    return [endpoint.__getattr__('name') for endpoint in endpoints]
    
def getStartpoints(client):
    startpoints = client.query("SELECT name FROM Location WHERE is_startpoint = TRUE")
    return [startpoint.__getattr__('name') for startpoint in startpoints]

#def getphoto(client, name):
#    photosphere = client.query("SELECT photosphere FROM Location WHERE name = '" + str(name) + "'")
#    return photosphere[0].__getattr__('photosphere')

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
    client.command("CREATE PROPERTY Location.is_startpoint Boolean")
    client.command("CREATE PROPERTY Location.is_endpoint Boolean")
    client.command("CREATE PROPERTY Location.x_coord Double")
    client.command("CREATE PROPERTY Location.y_coord Double")
    client.command("CREATE PROPERTY Location.building String")
    client.command("CREATE PROPERTY Location.map String")
    client.command("CREATE PROPERTY Location.floor String")
    #client.command("CREATE PROPERTY Location.metric Integer")

    client.command("CREATE CLASS Connection EXTENDS E")
    client.command("CREATE PROPERTY Connection.angle Double")

    #open and parse local json file
    with open(filepath) as f:
        data = json.load(f)

    #loop through each key in the json database and create a new vertex, V with the id in the database
    # for key in data:
    #     client.command("CREATE VERTEX Location SET name = '" + key
    #     + "', is_startpoint = '" + str(data.get(key).get("is_startpoint"))
    #     + "', is_endpoint = " + str(data.get(key).get("is_endpoint"))
    #     + ", x_coord = " + str(data.get(key).get("x_coord"))
    #     + ", y_coord = " + str(data.get(key).get("y_coord"))
    #     + ", building = " + data.get(key).get("building")
    #     + ", map = " + data.get(key).get("map"))
    
    for key in data:
        client.command("CREATE VERTEX Location SET name = '" + key
        + "', is_startpoint = '" + str(data[key]["is_startpoint"])
        + "', is_endpoint = " + str(data[key]["is_endpoint"])
        + ", x_coord = " + str(data[key]["x_coord"])
        + ", y_coord = " + str(data[key]["y_coord"])
        + ", building = " + data[key]["building"]
        + ", floor = " + data[key]["floor"]
        + ", map = " + data[key]["map"])

    #loop through each key creating edges from location to location
    for key in data:
        location1ID = str(getrid(client,key))
        for connection in data.get(key)["connectList"]:
            location2 = connection["name"]
            angle = connection["angle"]
            location2ID = str(getrid(client,location2))
            client.command("CREATE EDGE Connection FROM " + location1ID + " TO " + location2ID + "SET angle = " + str(angle))

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
    raw_path = pathlist[0].__getattr__('shortestPath')

    for i in range(distance-1):
        path.append(getattr(client, raw_path[i]))
        path[i]["angle"] = getangle(client, raw_path[i], raw_path[i+1])
    path.append(getattr(client, raw_path[-1]))
    path[-1]["angle"] = path[-2]["angle"]

    # for i in range(distance-1):
    #     attr = getattr(client, raw_path[i])
    #     print(attr)
    #     print(type(attr))
    #     path.append(attr)

    #pyorient.otypes.OrientRecord
    client.close()
#    return distance-1, path

    path_string = string_directions(path)

    return path_string

#this can be simplified way, way down now that I have the angles of all these things, but we don't need that for this demo build
def string_directions(path):
    curr_node = (path[0]['x_coord'], path[0]['y_coord'])
    for i in range(len(path)-1):
        last_node = curr_node
        curr_node = (path[i]['x_coord'], path[i]['y_coord'])
        next_floor = path[i+1]['floor']
        if(path[i]['floor'] != next_floor):
            path[i]['string_direction'] = f'Take the elevator to floor {next_floor}'
            #next iteration, first vector will be zero vector. will always display direction as straight, avoids unintended behavior with different coords on diff maps
            curr_node = (path[i+1]['x_coord'], path[i+1]['y_coord']) 
        else:
            next_node = (path[i+1]['x_coord'], path[i+1]['y_coord'])
            angle = angle_between((curr_node[0]-last_node[0], curr_node[1]-last_node[1]), (next_node[0]-curr_node[0], next_node[1]-curr_node[1]))
            if (angle > .7854 and angle < 2.3562):
                path[i]['string_direction'] = 'Turn left'
            elif (angle < 3.927):
                path[i]['string_direction'] = 'Head straight'
            elif (angle < 5.4978):
                path[i]['string_direction'] = 'Turn right'
            else:
                path[i]['string_direction'] = 'Turn backwards' #don't expect this outcome
    path[-1]['string_direction'] = 'You\'ve arrived!'
    return path

def angle_between(vec1, vec2):
    pi = 3.14159265359
    #in the case of a starting zero vector, assume we always consider the path taken as straight
    if all(components == 0 for components in vec1):
        return pi
    v1_norm = vec1 / np.linalg.norm(vec1)
    v2_norm = vec2 / np.linalg.norm(vec2)
    angle = np.arccos(np.clip(np.dot(v1_norm, v2_norm), -1.0, 1.0))
    #angle in 2D plane: angle measures from a left turn, with 0 being a reverse, pi/2 being 90 deg left, 3pi/2 90 deg right, etc.
    #arccos has range [0, pi]. Checking sign of cross product lets us adjust to full 2pi radius
    if (np.cross(v1_norm, v2_norm) > 0):
        angle = angle + pi
    return angle