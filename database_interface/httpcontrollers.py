#!/usr/bin/env python
# encoding: utf-8
import json
import random
from DBTools import loadDB
from DBTools import shortestPath
from DBTools import getEndpoints
import os
import pyorient
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    dbname = "locations"
    login = "root"
    password = "rootpwd"

    client = pyorient.OrientDB("localhost", 2424)
    session_id = client.connect(login, password)

    client.db_open(dbname, login, password)
    return render_template('main-page.html', endpoints=getEndpoints(client))

@app.route('/get_endpoints', methods=['GET'])
def get_endpoints():
    dbname = "locations"
    login = "root"
    password = "rootpwd"

    client = pyorient.OrientDB("localhost", 2424)
    session_id = client.connect(login, password)

    client.db_open(dbname, login, password)
    return jsonify(getEndpoints(client))

@app.route('/reset', methods=['GET'])
def reset():
    filepath = './data/testValues.json'
    loadDB(filepath)
    return jsonify("reset")

@app.route('/shortest_path/<string:start>&<string:end>', methods = ['GET'])
def shortest_path(start, end):
  
    return jsonify(shortestPath(start, end))

app.run(debug=True)
