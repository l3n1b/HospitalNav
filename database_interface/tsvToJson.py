import json
import csv
import os

filepath = './data/KYCTestValues.tsv'
savepath = './data/KYCTestValues.json'

keys = list()
dictionary = {}

with open(filepath) as file:

    tsv_file = csv.reader(file, delimiter='\t')
    
    for i, line in enumerate(tsv_file):
        if i == 0:
            keys = line
        else:
            name = ""
            for j, value in enumerate(line):
                if j == 0:
                    name = value
                    dictionary[name] = {}
                else:
                    dictionary[name][keys[j]] = value
                    
with open(savepath, "w") as outfile:
    json.dump(dictionary, outfile)
