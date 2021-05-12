from random import seed
from random import randint
from datetime import datetime
import time
import sqlite3

# define connection and cursor

connection = sqlite3.connect('db/running_activities.db')

cursor = connection.cursor()

# create activities table

command1 = """CREATE TABLE IF NOT EXISTS
activities(id INTEGER PRIMARY KEY, timestamp INTEGER, 
datetime TEXT, duration REAL, distance REAL)"""

cursor.execute(command1)

# generate some random activities

activities = [(int(time.time()), datetime.today().strftime('%Y-%m-%d-%H:%M:%S'), randint(25, 35), randint(0, 10)),
              (int(time.time() + 1), datetime.today().strftime('%Y-%m-%d-%H:%M:%S'), randint(25, 35), randint(0, 10)),
              (int(time.time() + 2), datetime.today().strftime('%Y-%m-%d-%H:%M:%S'), randint(25, 35), randint(0, 10))]

# add 3 activities to activities table

cursor.executemany('INSERT INTO activities VALUES (null, ?, ?, ?, ?)', activities)

# commit changes

connection.commit()

# get activities

cursor.execute("SELECT * FROM activities")

# display data

results = cursor.fetchall()
print(results)

# close connection

cursor.close()
connection.close()
