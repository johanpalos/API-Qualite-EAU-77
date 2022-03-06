# -*- coding: utf-8 -*-
"""
Created on Wed Feb  2 14:06:51 2022

@author: Formation
"""


import pandas
from sqlalchemy import create_engine
import sqlalchemy
import numpy


url = r"C:\Users\Formation\Desktop\couches projet\mesures_stations_V1.csv"

dataframe = pandas.read_csv(url, encoding=None, skipinitialspace=False, skiprows=None, dtype={'code_station': numpy.object}, skipfooter=0, sep=',')

print(dataframe.info())
print(dataframe.head(5))
print(dataframe.tail(5))
print(f"Nb lignes : {len(dataframe)}")

engine = create_engine('postgresql://postgres:postgres@localhost:5432/stations_mesures')
dataframe.to_sql('mesures_stations_V1', engine, index=False, index_label=None, chunksize=None, method=None, if_exists = "replace")

