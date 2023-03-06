PROJECT OVERVIEW

For the Food Insecurity Machine-Learning project, we conducted an analysis of food insecurity across US Census Tracts to identify potential sociodemographic risk factors. To accomplish this, we applied machine learning algorithms to analyze data and used various visualization tools to chart findings.
We used Flask API to connect to our Postgres database, and HTML to create a  website that showcases findings. Most of the ETL was done using Jupyter Notebook/Pandas. We used Leaflet and Tableau for visualizations via maps and charts. For this 'big data' project we cut over to using data from the cloud using  AWS.

MACHINE LEARNING

We had to clean and organize the data to prepare it for machine learning. Using various tools like slice, drop, reset, aggregating, groupby, etc. we got the data into usable format. The dataset is has two class labels (0 and 1) to signify whether subjects have food access or not. We created several dataframes to run our supervised machine learning models. We found that one of the dataframes had plenty of usable rows (over 70,000), but the maximum accuracy we got with it was 75%. A second dataframe had high accuracy at 90%, but the number of usable rows was less than 8,000. We ultimately decided on a third dataframe  where we felt good about the fitting as well as accuracy.
We used various binary classification models to get the best results. The Random Forest Classifier gave the highest accuracy  at 84%, but there was an overfitting issue (training score of 1.0). Manipulating features did not help this issue, yielding a training score of 0.99 and a lower accuracy of 0.83. We next tried hyperparameter modeling with different depth and estimators. The optimized model we found has a high recall (93%) for label '1' (or low access population with food insecurity). This means the model is highly efficient in predicting true positives, which is very important for people trying to qualify for food assistance benefits, for example.

VISUALIZATIONS

There are 2 types of visualized data presentations in this project and both can be found on the webpage. we used GeoJason to create a heatmap that shows food access in the US by state. Tableau is used to show bar charts comparing food access by different demographics. We compared food access by race, age and income. We also compare the number of people who have SNAP (a form of government assistance) to those that are food insecure.

NEURONETWORKING

...............
