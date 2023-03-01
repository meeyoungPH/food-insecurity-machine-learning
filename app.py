# dependencies
from flask import Flask, render_template, jsonify
import pandas as pd
from sqlalchemy import create_engine
from config import username, password, protocol, port, database_name, host

##################################################################################
# connect to postgres database
database_name = 'food_insecurity'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)

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

##################################################################################
# route for geojson data by state
# @app.route('api/census-tract-by-state/<fips>.geojson')
# def tract(fips):            
#     filepath = 'static/data/geojson/tl_2021_{fips}_tract.geojson'
#     with open(filepath, 'r', encoding='utf-8') as f:
#         data = f.read()
#     return data

##################################################################################
# route for info box
# @app.route('api/state-data/<fips>')
# def state_data(fips):
    
#     conn = engine.connect()
    
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