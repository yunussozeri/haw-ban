# this file reads from haw website and dumps a json file into the directory
import requests as r
import json
import pprint as pp
from ics import Calendar
from bs4 import BeautifulSoup
from datetime import datetime


# Function to serialize datetime object
def datetime_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()


url =  "https://userdoc.informatik.haw-hamburg.de/doku.php?id=stundenplan:ics_public"

# Read Userdoc
response = r.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# Find all <a> tags with class "mediafile"
mediafiles = soup.find_all("a", class_="mediafile")

# Define a list to store the response objects
response_list = []

# Iterate through each <a> tag
for tag in mediafiles:
    # Extract the href attribute
    link = tag["href"]
    # Extract the displayed text
    label = tag.text.strip()
    # Create a response object and append it to the list
    response_obj = {
        "link": str(link)[str(link).index(":")+1:],
        "label": label
    }
    # Filter on Bachelor courses
    if response_obj["label"].startswith('b'):
        print(response_obj["label"])
        response_list.append(response_obj)

# URL of the initial files
url = "https://userdoc.informatik.haw-hamburg.de/lib/exe/fetch.php?media=stundenplan:"

# Stores files in JSON format
json_obj = []
for obj in response_list:
    # Read File
    response = r.get(url+obj["label"])
    #Extract Content
    data = response.text
    # Turn into Calendar file
    calevents = Calendar(data)
    #Extract relevant information
    for event in calevents.events:
        infos = {
            "name" : event.name,
            "where" : event.location,
            "begin" : event.begin.datetime,
            "end" : event.end.datetime,
            "description" : event.description,
        }
        # Turn Data Structure into JSON
        #https://stackoverflow.com/questions/11875770/how-can-i-overcome-datetime-datetime-not-json-serializable
        obj = json.dumps(infos, indent=4,default=datetime_serializer)
        json_obj.append(obj)

#Define output file name
file_path = "b_courses.json"

# Write the JSON objects to a file
with open(file_path, "w") as json_file:
    #write JSON Object into .json file
    json.dump(json_obj, json_file, indent=4)
    