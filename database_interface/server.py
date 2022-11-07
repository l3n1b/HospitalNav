import asyncio
import websockets
import websockets.exceptions
import DBTools
import json
import numpy as np

url = 'localhost'
port = 8001

# async def handler(websocket):
#     connection_clients = dict()
#     connection_id = 0
#     connection_clients[str(connection_id)] = websocket
#     #First send the current list of endpoints so they can be displayed to the user
#     await connection_clients[str(connection_id)].send(json.dumps(endpoints))
#     connection_id += 1

#     async for data in websocket:
#         json_packet: dict = json.loads(data)

#         message = json_packet['message']
#         response = query_parser(message)
#         await websocket.send(response)


# def query_parser(message):
#     data = dict()

#     split_msg = message.split(' ')
#     if split_msg.len() == 0:
#         return ""

#     if split_msg[0] == "path": #get the shortest path from split_msg[1] to split_msg[2]
#         if split_msg.len() != 3:
#             data['error'] = True
#             data['message'] = 'Expected exactly 2 location arguments'
#             return json.dumps(data)
#         else:
#             path_json = DBTools.shortestPath(split_msg[1], split_msg[2])
#             path = json.loads(path_json)
#             return json.dumps(string_directions(path))

#     elif split_msg[0] == "image": #return image corresponding to string node name
#         if split_msg.len != 2:
#             data['error'] = True
#             data['message'] = 'Expected exactly 1 image argument'
#             return json.dumps(data)
#         else:
#             image: bytes = DBTools.getImage(split_msg[1])
#             return image

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
    print(angle)
    return angle



# async def main():
#     async with websockets.serve(handler, url, port):
#         await asyncio.Future()


# endpoints = DBTools.getEndpoints()
# if __name__ == "__main__":
#     try:
#         print(f'Listening on w://{url}:{port}/')
#         asyncio.run(main())
#     except KeyboardInterrupt:
#         print('\nServer shutdown from keyboard interrupt')


with open('../test_cases/test_path.json', 'r') as json_file:
    path = json.load(json_file)
    path2 = string_directions(path)

with open('../test_cases/test_path_string.json', 'w') as writefile:
    writefile.write(json.dumps(path2))