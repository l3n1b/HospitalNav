import pyorient
import json
import re
import numpy as np
import path_tools
import os
from PIL import Image
 
# ip = "172.17.0.2"
ip = "localhost"

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

def getMetric(client, name):
    metric = client.query("SELECT metric FROM Location WHERE name = '" + str(name) + "'")
    return metric[0].__getattr__('metric')

def getMetrics(client):
    metrics = client.query("SELECT name, metric FROM Location ORDER BY metric DESC")
    dictionary = {}
    for metric in metrics:
        dictionary[metric.__getattr__('name')] = metric.__getattr__('metric')
    return dictionary

def incrementMetric(client, name):
    client.command("UPDATE Location INCREMENT metric = 1 WHERE name = '" + str(name) + "'")

#def getphoto(client, name):
#    photosphere = client.query("SELECT photosphere FROM Location WHERE name = '" + str(name) + "'")
#    return photosphere[0].__getattr__('photosphere')

def simpleShortestPath(locationA, locationB):

    dbname = "locations"
    login = "root"
    password = "rootpwd"
    path = list()

    client = pyorient.OrientDB(ip, 2424)
    session_id = client.connect(login, password)

    client.db_open(dbname, login, password)

    #get the RID of the two locations
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

    client.close()

    return path

def simpleLoadDB(filepath):
        #database name
    dbname = "locations"
    #database login is root by default
    login = "root"
    #database password, set by docker param
    password = "rootpwd"

    #create client to connect to local orientdb docker container
    client = pyorient.OrientDB(ip, 2424)
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
    # client.command("CREATE PROPERTY Location.metric Integer")

    #open and parse local json file
    with open(filepath) as f:
        data = json.load(f)

    #loop through each key in the json database and create a new vertex, V with the id in the database
    for key in data:
        client.command("CREATE VERTEX Location SET name = '" + key
        + "', is_startpoint = '" + str(data[key]["is_startpoint"])
        + "', is_endpoint = " + str(data[key]["is_endpoint"])
        + ", x_coord = " + str(data[key]["x_coord"])
        + ", y_coord = " + str(data[key]["y_coord"])
        + ", building = " + data[key]["building"]
        + ", map = " + data[key]["map"])

    #loop through each key creating edges from location to location
    for key in data:
        location1ID = str(getrid(client,key))
        connections = data.get(key)["connectList"].split(', ')
        for location2 in connections:
            location2ID = str(getrid(client,location2))
            client.command("CREATE EDGE FROM " + location1ID + " TO " + location2ID)

    client.close()

def loadDB(filepath):

    #database name
    dbname = "locations"
    #database login is root by default
    login = "root"
    #database password, set by docker param
    password = "rootpwd"

    #create client to connect to local orientdb docker container
    client = pyorient.OrientDB(ip, 2424)
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
    client.command("CREATE PROPERTY Location.metric Integer")

    client.command("CREATE CLASS Connection EXTENDS E")
    client.command("CREATE PROPERTY Connection.angle Double")

    #open and parse local json file
    with open(filepath) as f:
        data = json.load(f)

    #loop through each key in the json database and create a new vertex, V with the id in the database
    for key in data:
        client.command("CREATE VERTEX Location SET name = '" + key
        + "', is_startpoint = '" + str(data[key]["is_startpoint"])
        + "', is_endpoint = " + str(data[key]["is_endpoint"])
        + ", x_coord = " + str(data[key]["x_coord"])
        + ", y_coord = " + str(data[key]["y_coord"])
        + ", building = " + str(data[key]["building"])
        + ", floor = " + str(data[key]["floor"])
        + ", map = " + str(data[key]["map"])
        + ", metric = 0")

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

    client = pyorient.OrientDB(ip, 2424)
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

    for i in range(distance):
        path.append(getattr(client, raw_path[i]))
    path = path_angles(path, raw_path, client, distance)

    #pyorient.otypes.OrientRecord
    client.close()

    path_string = string_directions(path)
    path_string = next_nodes(path_string, 3, 'data/images/lines/', 1, 5)

    return path_string

#assign angles to each node along the path
def path_angles(path, raw_path, client, distance):
    for i in range(distance-1):
        path[i]["angle"] = getangle(client, raw_path[i], raw_path[i+1])
        path[i+1]["angle_back"] = getangle(client, raw_path[i+1], raw_path[i]) #angle back to path[i]
    
    if len(path) >= 2:
        path[-1]["angle"] = opposite_angle(path[-1]["angle_back"])
        path[0]["angle_back"] = opposite_angle(path[0]["angle"])
    else: #1 node path edge case
        path[-1]["angle"] = 0.0 
        path[0]["angle_back"] = 0.0

#get the angle opposite of current angle within range -pi, pi
def opposite_angle(angle):
    if angle < 0:
        return angle + np.pi
    else:
        return angle - np.pi

#take back angle and out angle to find left/right/straight turns
#angles are in range -pi, pi
#trevor roussel
def string_directions(path, units_to_feet=1):
    for i in range(len(path)-1):
        next_floor = path[i+1]['floor']
        if(path[i]['floor'] != next_floor):
            path[i]['string_direction'] = f'Take the elevator to floor {next_floor}'
            #next iteration, first vector will be zero vector. will always display direction as straight, avoids unintended behavior with different coords on diff maps
        else:
            #get length of path to next node
            distance = path_tools.vec_dist((path[i+1]["x_coord"]-path[i]["x_coord"],
                path[i+1]["y_coord"]-path[i]["y_coord"]))
            #get 5 foot approximation
            distance = int(distance*units_to_feet/5) * 5

            #find angle of out angle from perspective of back angle
            angle = path[i]["angle"] - path[i]["angle_back"] + np.pi
            angle = path_tools.reg_angle(angle) #set to range -pi, pi
            #3pi/4 and pi/4 constants are precomputed because python is iffy about folding constants
            if (angle > -2.3562 and angle < -0.7854):
                path[i]['string_direction'] = 'Turn left then continue for ' + str(distance) + ' feet'
            elif (angle < 0.7854):
                path[i]['string_direction'] = 'Head straight for ' + str(distance) + ' feet'
            elif (angle < 2.3562):
                path[i]['string_direction'] = 'Turn right then continue for ' + str(distance) + ' feet'
            else:
                path[i]['string_direction'] = 'Turn backwards' #probably an error case but maybe there are weird directions
    path[-1]['string_direction'] = 'You\'ve arrived!'
    return path

def next_nodes(path, segments=3, line_path='data/images/lines/', unit_to_ft=1, cam_height=5):
    connections = []
    for i in range(len(path)):
        connections.append(path_tools.get_next_n(path, i, segments))
        name = 'line'
        for j in range(len(connections[i])):
            name += '_' + connections[i][j]['name']
        name += '.png'
        if not os.path.exists(line_path+name):        
            with Image.open('data/images/' + path[i]['name'] + '.JPG') as img:
                w = img.width
                h = img.height
            path_tools.draw_line(connections[i], line_path, w, h, cam_height/unit_to_ft)
        path[i]['line_name'] = name
    return path

# def angle_between(vec1, vec2):
#     pi = 3.14159265359
#     #in the case of a starting zero vector, assume we always consider the path taken as straight
#     if all(components == 0 for components in vec1):
#         return pi
#     v1_norm = vec1 / np.linalg.norm(vec1)
#     v2_norm = vec2 / np.linalg.norm(vec2)
#     angle = np.arccos(np.clip(np.dot(v1_norm, v2_norm), -1.0, 1.0))
#     #angle in 2D plane: angle measures from a left turn, with 0 being a reverse, pi/2 being 90 deg left, 3pi/2 90 deg right, etc.
#     #arccos has range [0, pi]. Checking sign of cross product lets us adjust to full 2pi radius
#     if (np.cross(v1_norm, v2_norm) > 0):
#         angle = angle + pi
#     return angle

