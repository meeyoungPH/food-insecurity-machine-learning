# dependencies
import pandas as pd
import sqlalchemy
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, func
from config import username, password, port, database_name, host

print(sqlalchemy.__version__)
##################################################################################
# connect to postgres database
rds_connection_string = f'postgresql://{username}:{password}@{host}:{port}/{database_name}'

# prior to running, run 'python -m pip install sqlalchemy-jdbcapi'
# rds_connection_string = 'jdbcapi+pgjdbc://{}:{}@{}/{}'.format(username, password, <ip:host>', <database name>))
config = {'user': 'postgres',
          'password': password,
          'driver':'org.postgresql.Driver'}
# engine = create_engine(rds_connection_string)

##################################################################################
# create app
app = Flask(__name__, template_folder='templates')

##################################################################################
# web route
@app.route('/')
def home():
    return render_template('index.html')

##################################################################################
# route for food insecurity data
@app.route('/api/food-access')
def food_access():
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = "food_access"
    food_access_df = pd.read_sql(query, conn)
    
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

# @app.route('/api/food-access/<fips>')
# def food_access_by_state(fips):
#     # create DB session
#     conn = engine.connect()
    
#     # import data from postgres
#     query = "food_access"
#     food_access_df = pd.read_sql(query, conn)
    
#     print(food_access_df.tail())
    
#     # send json data
#     food_access_json = food_access_df.to_json(orient='records', index=True)
#     return food_access_json

##################################################################################
# route for geojson data by state
@app.route('/api/census-tract-by-state/<fips>.geojson')
def tract(fips):            
    filepath = f'static/data/geojson/tl_2021_{fips}_tract.geojson'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = f.read()
    return data

##################################################################################
# route for info box
@app.route('/api/food-access/<fips>')
def food_access_by_state(fips):
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = 'select * from food_access where "StateFIPS" = ' + "'" + fips + "'"
    # food_access_df = pd.read_sql_query(query, conn)
    food_access_df = pd.DataFrame(conn.execute(query))
        
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

#     # retrieve data from postgres
#     query = "select * from food_access where StateFIPS = '" + fips + "'"
#     state_df = pd.read_sql(query, conn)
    
#     # derive state stats
    
#     dict = {
#         # Population
#         # Number of counties
#         # Number of tracts
#         # Number of urban tracts
#         # Number of rural tracts
#         # Number of urban tracts with flag
#         # Number of rural tracts with flag
#     }
    
#     return jsonify(dict)

##################################################################################
# run app
if __name__ == '__main__':
    app.run(debug=True)