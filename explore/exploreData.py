# author: moogiegik

import akshare as ak
import pandas as pd
from dataclasses import make_dataclass
from sqlalchemy import create_engine
import sqlite3
import logging

def Start(json):
    # print(json)
    attr1 = json.get("attr1")
    attr2 = json.get("attr2")
    attr3 = json.get("attr3")
    attr4 = json.get("attr4")
    attr5 = json.get("attr5")
    # print(attr1,attr2,attr3,attr4)

    if(attr1==1):
        return ARank(attr2,attr3,attr4)
    elif(attr1==10):
        return PickUp()
    elif(attr1==11):
        return ToFind("代码",attr2)
    elif(attr1==0):
        return ToFinds("代码",attr2)
    return ["wrong order",json]
# author: moogiegik

def simpleStart(json):
    # data = json.get("data")
    if(json.get("type")=="pickup"):
        conn = sqlite3.connect('MData.db')
        cursor = conn.cursor()
        cursor.execute('SELECT code FROM pickUp where code = ?', (json.get("data"),))
        # rows = cursor.fetchall()
        rows = cursor.fetchone()
        if(rows is None):
            cursor.execute("INSERT INTO pickUp('code') VALUES(?)",(json.get("data"),))
        else:
            cursor.execute('delete FROM pickUp where code = ?', (json.get("data"),))
        conn.commit()
        conn.close()
        return ["successfully!",rows is None,rows]
        
    elif(json.get("type")=="open"):
        code = ToFind("名称",json.get("data"))      
        return ["successfully!",code,json.get("data")]
    return ["error!"]


  
def ARank(new_flag,offset,limit):
    if(new_flag==1):
        stock_zh_a_spot_em_df = ak.stock_zh_a_spot_em()
        # print(stock_zh_a_spot_em_df)
        if(len(stock_zh_a_spot_em_df)>5):
            engine = create_engine('sqlite:///MData.db')
            stock_zh_a_spot_em_df.to_sql('ARank', con=engine, index=False, if_exists='replace')
            engine.dispose() 
        else:return []
    
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ARank LIMIT ? OFFSET ?', (limit,offset))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows
# 序号	代码	名称	最新价	涨跌幅	涨跌额	成交量	成交额	振幅	最高	最低	今开	
# 0	    1   	2	    3	    4	    5	    6	    7	8	    9	    10	    11
# 昨收	量比	换手率	市盈率-动态	市净率	总市值	流通市值	涨速	5分钟涨跌	60日涨跌幅	年初至今涨跌幅
# 12    13	    14	    15	       16	   17	   18	    19	    20	        21	        22

def PickUp():
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    cursor.execute('SELECT code FROM pickUp')
    rows = cursor.fetchall()
    rows2 = []
    for i in range(0,len(rows)):
        rows2.append(rows[i][0])
    conn.commit()
    conn.close()
    return rows2

def ToFind(column,valu):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ARank where '+column+' = ?', (valu,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return [row]

def ToFinds(column,valus):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    rows = []
    for i in range(0,len(valus)):
        cursor.execute('SELECT * FROM ARank where '+column+' = ?', (valus[i],))
        data = cursor.fetchone()
        # if(data == None):rows.append([0,valus[i],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        if(data == None):rows.append([None,valus[i]])
        else:rows.append(data)
        # rows.append(cursor.fetchone())

    cursor.close()
    conn.close()
    return rows
# print(ARank(0,0,10))
# print(PickUp())
# print(ToFind("834407"))

# ARank(1,1,100)