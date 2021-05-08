import sqlite3

# define connection and cursor

connection = sqlite3.connect('running_activities.db')

cursor = connection.cursor()

# create activities table

command1 = """CREATE TABLE IF NOT EXISTS
activities(id INTEGER PRIMARY KEY, timestamp INTEGER, 
datetime TEXT, duration REAL, distance REAL)"""

cursor.execute(command1)

# add 3 activities to activities table

cursor.execute("INSERT INTO activities VALUES (1, 1609542000, '2021-01-02', 30.00, 4.75)")
cursor.execute("INSERT INTO activities VALUES (2, 1609628400, '2021-01-03', 30.00, 4.80)")
cursor.execute("INSERT INTO activities VALUES (3, 1609714800, '2021-01-04', 30.00, 5.43)")

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