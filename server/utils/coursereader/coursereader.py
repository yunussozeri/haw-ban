# this file reads from haw website and dumps a json file into the directory
import requests as r
import json
import pprint as pp
from ics import Calendar
from bs4 import BeautifulSoup
from datetime import datetime


USERDOC_URL = "https://userdoc.informatik.haw-hamburg.de/doku.php?id=stundenplan:ics_public"

FETCH_URL = "https://userdoc.informatik.haw-hamburg.de/lib/exe/fetch.php?media=stundenplan:"

FILE_PATH = "./server/utils/coursereader/b_courses.json"

def scrape_userdoc(userdoc_url:str) -> bytes:
    try:
        return r.get(userdoc_url).content
    except:
        print(f"Error while scraping: {userdoc_url} ")
    
def parse_ics_links(content:bytes)->list:
    
    soup = BeautifulSoup(content, "html.parser",from_encoding="utf-8")

    # Find all <a> tags with class "mediafile"
    mediafiles = soup.find_all("a", class_="mediafile",)

    # Define a list to store the response objects
    response_list = []

    # Iterate through each <a> tag
    for tag in mediafiles:
    # Extract the href attribute
        link = tag["href"]
    # Extract the displayed text
        label = tag.text.strip()
    # Create a response object and append it to the list
     # Filter on Bachelor courses
        if label.startswith('b'):
            
            response_obj = {
                "link": str(link)[str(link).index(":")+1:],
                "label": label
            }
            #print(response_obj["label"])
            response_list.append(response_obj)
   
        #if response_obj["label"].startswith('b'):
            
    return response_list

def fetch_ics_objects_from_URL_list(response_list:list,fetch_url:str) -> list:
    ics_objects = []
    for obj in response_list:
        #pp.pprint(response_list)
        
    # Read File
        if obj["label"].rfind('p') > 6 or obj["label"].find('ue') != -1:
            response = r.get(fetch_url+obj["label"])
            #Extract Content
            data = response.text
             # Turn into Calendar file
            calevent = Calendar(data)
            ics_objects.append(calevent)

    return ics_objects
    
    
def extract_relevant_info_from_ics(ics_objects:list)-> list:
    to_json_objects = []
    
    for calevent in ics_objects:
        
        for event in calevent.events:
            studigang_und_kuerzel = parse_studigang_und_kuerzel(event.name)
            infos = {
                "studiengang" : studigang_und_kuerzel[0],
                "kuerzel" : studigang_und_kuerzel[1],
                "deadline" : parse_date(event.begin.datetime),
            #"end" : parse_date(event.end.datetime),
            }
        #pp.pprint(infos)
        # Turn Data Structure into JSON
        #https://stackoverflow.com/questions/11875770/how-can-i-overcome-datetime-datetime-not-json-serializable
        #obj = json.dumps(infos, indent=4,)
            to_json_objects.append(infos)
            
    return to_json_objects

def write_json(json_list:list):
    # Write the JSON objects to a file
    with open(FILE_PATH, "w+",  encoding='utf-8') as json_file:
    #write JSON Object into .json file
        data = json.dumps(json_list,ensure_ascii=False,sort_keys=False)
    # json.dump(json_objects, json_file,sort_keys=False,ensure_ascii=False)
        json_file.write(data)
    
def parse_studigang_und_kuerzel(eventname:str) -> tuple:
    splitted = eventname.split('-')
    studigang = splitted[0]
    kuerzel = splitted[1]
    # Replace unknown character
    if kuerzel.find('�') != -1:
        kuerzel = kuerzel.replace('�','Ü')
    return (studigang,kuerzel)

def parse_date(date:datetime) -> str:
    date_part = date.isoformat().split("T")[0]
    return date_part
    
def script():
    html_bytes = scrape_userdoc(USERDOC_URL)
    ics_links = parse_ics_links(html_bytes)
    ics_objects = fetch_ics_objects_from_URL_list(ics_links,FETCH_URL)
    to_json = extract_relevant_info_from_ics(ics_objects)
    write_json(to_json)
    print("success")
    



'''
url =  "https://userdoc.informatik.haw-hamburg.de/doku.php?id=stundenplan:ics_public"

# Read Userdoc
response = r.get(url)

# Parse the HTML content

soup = BeautifulSoup(response.content, "html.parser",from_encoding="utf-8")


# Find all <a> tags with class "mediafile"
mediafiles = soup.find_all("a", class_="mediafile",)

# Define a list to store the response objects
response_list = []

# Iterate through each <a> tag
for tag in mediafiles:
    # Extract the href attribute
    link = tag["href"]
    # Extract the displayed text
    label = tag.text.strip()
    # Create a response object and append it to the list
    if label.startswith('b'):
            
        response_obj = {
            "link": str(link)[str(link).index(":")+1:],
            "label": label
        }
        print(response_obj["label"])
        response_list.append(response_obj)
   
   # response_obj = {
    #    "link": str(link)[str(link).index(":")+1:],
     #   "label": label
    #}
    # Filter on Bachelor courses
    #if response_obj["label"].startswith('b'):
       # print(response_obj["label"])
     #   response_list.append(response_obj)

# URL of the initial files
url = "https://userdoc.informatik.haw-hamburg.de/lib/exe/fetch.php?media=stundenplan:"

# Stores files in JSON format
json_objects = []
for obj in response_list:
    # Read File
    response = r.get(url+obj["label"])
    
    #Extract Content
    data = response.text
    
    # Turn into Calendar file
    calevents = Calendar(data)
    #Extract relevant information
    for event in calevents.events:
        studigang_und_kuerzel = parse_studigang_und_kuerzel(event.name)
        infos = {
            "studigang" : studigang_und_kuerzel[0],
            "kuerzel" : studigang_und_kuerzel[1],
            "deadline" : parse_date(event.begin.datetime),
            #"end" : parse_date(event.end.datetime),
        }
        pp.pprint(infos)
        # Turn Data Structure into JSON
        #https://stackoverflow.com/questions/11875770/how-can-i-overcome-datetime-datetime-not-json-serializable
        #obj = json.dumps(infos, indent=4,)
        json_objects.append(infos)

#Define output file name
file_path = "b_courses.json"

# Write the JSON objects to a file
with open(file_path, "w",  encoding='utf-8') as json_file:
    #write JSON Object into .json file
    data = json.dumps(json_objects,ensure_ascii=False,sort_keys=False)
    # json.dump(json_objects, json_file,sort_keys=False,ensure_ascii=False)
    json_file.write(data)
    #for obj in json_objects:
    #   
'''

script()