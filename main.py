from random import seed
from random import randint
import sqlite3

# define connection and cursor

connection = sqlite3.connect('running_activities.db')

cursor = connection.cursor()

# create activities table

command1 = """CREATE TABLE IF NOT EXISTS
activities(id INTEGER PRIMARY KEY, timestamp INTEGER, 
datetime TEXT, duration REAL, distance REAL)"""

cursor.execute(command1)

last_id = """SELECT MAX(id) FROM activities"""

# seed random number generator and generate some integers

seed(1)
rnd = []

for i in range(3):
	rnd.append(randint(0, 10))

activities = [(1609542000, '2021-01-02', 30.00, rnd[0]),
              (1609628400, '2021-01-03', 30.00, rnd[1]),
              (1609714800, '2021-01-04', 30.00, rnd[2])]

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