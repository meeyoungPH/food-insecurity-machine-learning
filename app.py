# dependencies
import pandas as pd
import sqlalchemy
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, func
from config import protocol, username, password, port, database_name, host

# print(sqlalchemy.__version__)
##################################################################################
# connect to postgres database
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
# route for raw-data
@app.route('/api/raw-data')
def raw_data():
    
    # read data from s3 bucket
    raw_df = pd.read_csv("https://gtbootcamp20230221.s3.amazonaws.com/FoodAccessResearchAtlasData2019.csv", dtype={'CensusTract': str})
    print(raw_df.head())
    
    # send json data
    raw_data_json = raw_df.to_json(orient='records', index=True)
    return raw_data_json  
    
# route for food insecurity data
@app.route('/api/ml-data')
def ml_data():
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = "food_access_3"
    food_access_df = pd.read_sql(query, conn)
    
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

# route for data for visualizations
@app.route('/api/viz-data/')
def subset_data():
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = "viz_data"
    food_access_df = pd.read_sql(query, conn)
    
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

##################################################################################
# route for geojson data by state
@app.route('/api/census-tract-by-state/<fips>.geojson')
def tract(fips):            
    filepath = f'static/data/geojson/tl_2021_{fips}_tract.geojson'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = f.read()
    return data

##################################################################################
# to do - add state fips to summary table; use 00 for US
# to do - add row to state table for US
# route for info box
# @app.route('/api/summary/<fips>')
# def food_access_by_state(fips):
#     # create DB session
#     conn = engine.connect()
    
#     # import data from postgres
#     query = 'select * from summary where "StateFIPS" = ' + "'" + fips + "'"
#     # food_access_df = pd.read_sql_query(query, conn)
#     food_access_df = pd.DataFrame(conn.execute(query))
        
#     print(food_access_df.tail())
    
#     # send json data
#     food_access_json = food_access_df.to_json(orient='records', index=True)
#     return food_access_json

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