# Python script to convert a tsv file containing map data created by a developer
# to a json file that be read by the search algorithm.

# Import libraries
import json
import csv
import os

# Variables to store filepaths and names of input tsv file and output json file.
filepath = './data/KYCTestValues.tsv'
savepath = './data/KYCTestValues.json'

keys = list()
dictionary = {}

with open(filepath) as file:
    
    # Using tab as delimiter
    tsv_file = csv.reader(file, delimiter='\t')
    
    # First line of tsv contains keys/titles
    for i, line in enumerate(tsv_file):
        if i == 0:
            keys = line
        else:
            # Convert each row into dictionary with keys as titles
            name = ""
            for j, value in enumerate(line):
                if j == 0:
                    name = value
                    dictionary[name] = {}
                else:
                    dictionary[name][keys[j]] = value

# Dump dictionary into json file.                    
with open(savepath, "w") as outfile:
    json.dump(dictionary, outfile)
