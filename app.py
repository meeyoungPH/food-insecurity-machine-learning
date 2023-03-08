# dependencies
import pandas as pd
from flask import Flask, render_template
from sqlalchemy import create_engine, func
from config import protocol, username, password, port, database_name, host

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
# route for list of jurisdictions
@app.route('/api/jurisdictions')
def jurisdictions():
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = "state"
    jurisdiction_df = pd.read_sql(query, conn)
    
    print(jurisdiction_df.tail())
    
    # send json data
    jurisdiction_json = jurisdiction_df.to_json(orient='records', index=True)
    return jurisdiction_json

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
@app.route('/api/food-access/')
def all_data():
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = "viz_data"
    food_access_df = pd.read_sql(query, conn)
    
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

# route for data for visualizations by state
@app.route('/api/food-access/<fips>')
def state_data(fips):
    # create DB session
    conn = engine.connect()
    
    # import data from postgres
    query = 'select * from viz_data where "StateFIPS" = ' + "'" + fips + "'"
    food_access_df = pd.read_sql(query, conn)
    
    print(food_access_df.tail())
    
    # send json data
    food_access_json = food_access_df.to_json(orient='records', index=True)
    return food_access_json

##################################################################################
# route for food access geojson data by state
@app.route('/api/food-access/<fips>.geojson')
def access_map(fips):            
    filepath = f'static/data/geojson/tl_2021_{fips}_tract_food_access.geojson'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = f.read()
    return data

# route for food market geojsons by state
@app.route('/api/food-markets/<fips>.geojson')
def market_map(fips):
    filepath = f'static/data/geojson/overpass_food_markets_{fips}.geojson'
    with open(filepath, 'r', encoding='utf-8') as f:
        data = f.read()
    return data

##################################################################################
# run app
if __name__ == '__main__':
    app.run(debug=True)