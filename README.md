pip freeze > requirements.txt

pip install -r requirements.txt


* PROJECT OVERVIEW *

For the Food Insecurity Machine-Learning project, we conducted an analysis of food insecurity across US Census Tracts to identify potential sociodemographic risk factors. To accomplish this, we applied machine learning algorithms to analyze data pulled from the usda.gov website and used various visualization tools to chart findings.
We used Flask API to connect to our Postgres database, and HTML to create a  website that showcases findings. Most of the ETL was done using Jupyter Notebook/Pandas. We used Leaflet and Tableau for visualizations via maps and charts. For this 'big data' project we cut over to using data from the cloud using  AWS.


						** MACHINE LEARNING **
![ml_tree](https://user-images.githubusercontent.com/112736433/223291719-05c108ae-0914-4687-83ca-2d6049371e71.png)

We had to clean and organize the data to prepare it for machine learning. Using various tools like slice, drop, reset, aggregating, groupby, etc. we got the data into usable format. The dataset is has two class labels (0 and 1) to signify whether subjects have food access or not. We created several dataframes to run our supervised machine learning models. We found that one of the dataframes had plenty of usable rows (over 70,000), but the maximum accuracy we got with it was 75%. A second dataframe had high accuracy at 90%, but the number of usable rows was less than 8,000. We ultimately decided on a third dataframe  where we felt good about the fitting as well as accuracy.
We used various binary classification models to get the best results. The Random Forest Classifier gave the highest accuracy  at 84%, but there was an overfitting issue (training score of 1.0). 


Manipulating features did not help this issue, yielding a training score of 0.99 and a lower accuracy of 0.83. We next tried hyperparameter modeling with different depth and estimators. 

<img width="386" alt="ml_feature_selection_plot" src="https://user-images.githubusercontent.com/112736433/223291367-f322eb0c-7bf6-4898-9e3a-ddf893cec804.png">  <img width="178" alt="ml_diff_models_score" src="https://user-images.githubusercontent.com/112736433/223290708-d463f686-6a1b-4e13-9a31-f2de4953b858.png">



The optimized model we found has a high recall (93%) for label '1' (or low access population with food insecurity). This means the model is highly efficient in predicting true positives, which is very important for people trying to qualify for food assistance benefits, for example.

<img width="253" alt="ml_best_parameter_score" src="https://user-images.githubusercontent.com/112736433/223290496-a85e0345-a4c2-443e-8c59-1b318dba16b6.png">



						** VISUALIZATIONS **

There are 2 types of visualized data presentations in this project and both can be found on the webpage. we used GeoJason to create a heatmap that shows food access in the US by state. Tableau is used to show bar charts comparing food access by different demographics. We compared food access by race, age and income. We also compare the number of people who have SNAP (a form of government assistance) to those that are food insecure. Some of the key findings shown in visuals is that there is a higher percentage of food insecure kids than secure, but for seniors there is a higher percentage of food secure people. A surprising outcome we came across is the fact that there is a higher percentage of food secure people using SNAP government assistance than non-secure people. We also found that distance from a grocery store does not have a significant impact on food security within a 1/2 mile range. Within this range, there isn't a significant difference in food security based on income either.
![viz](https://user-images.githubusercontent.com/112736433/223290202-49aa334c-c8cb-401c-872e-77c9a18960cc.png)



						** NEURONETWORKING **

...............

<img width="194" alt="ml_supervised_ml_score_card  (1)" src="https://user-images.githubusercontent.com/112736433/223292931-0ee957db-9318-4ec8-af01-be51f435d1d7.png">

