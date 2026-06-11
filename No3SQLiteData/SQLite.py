# author: moogiegik

import sqlite3

# 5min
fiveTypes = ["TEXT","REAL"]
fiveFields = ["date",
'T935O','T935C','T935H','T935L','T935V','T940O','T940C','T940H','T940L','T940V',
'T945O','T945C','T945H','T945L','T945V','T950O','T950C','T950H','T950L','T950V',
'T955O','T955C','T955H','T955L','T955V','T1000O','T1000C','T1000H','T1000L','T1000V',
'T1005O','T1005C','T1005H','T1005L','T1005V','T1010O','T1010C','T1010H','T1010L','T1010V',
'T1015O','T1015C','T1015H','T1015L','T1015V','T1020O','T1020C','T1020H','T1020L','T1020V',
'T1025O','T1025C','T1025H','T1025L','T1025V','T1030O','T1030C','T1030H','T1030L','T1030V',
'T1035O','T1035C','T1035H','T1035L','T1035V','T1040O','T1040C','T1040H','T1040L','T1040V',
'T1045O','T1045C','T1045H','T1045L','T1045V','T1050O','T1050C','T1050H','T1050L','T1050V',
'T1055O','T1055C','T1055H','T1055L','T1055V','T1100O','T1100C','T1100H','T1100L','T1100V',
'T1105O','T1105C','T1105H','T1105L','T1105V','T1110O','T1110C','T1110H','T1110L','T1110V',
'T1115O','T1115C','T1115H','T1115L','T1115V','T1120O','T1120C','T1120H','T1120L','T1120V',
'T1125O','T1125C','T1125H','T1125L','T1125V','T1130O','T1130C','T1130H','T1130L','T1130V',
'T1305O','T1305C','T1305H','T1305L','T1305V','T1310O','T1310C','T1310H','T1310L','T1310V',
'T1315O','T1315C','T1315H','T1315L','T1315V','T1320O','T1320C','T1320H','T1320L','T1320V',
'T1325O','T1325C','T1325H','T1325L','T1325V','T1330O','T1330C','T1330H','T1330L','T1330V',
'T1335O','T1335C','T1335H','T1335L','T1335V','T1340O','T1340C','T1340H','T1340L','T1340V',
'T1345O','T1345C','T1345H','T1345L','T1345V','T1350O','T1350C','T1350H','T1350L','T1350V',
'T1355O','T1355C','T1355H','T1355L','T1355V','T1400O','T1400C','T1400H','T1400L','T1400V',
'T1405O','T1405C','T1405H','T1405L','T1405V','T1410O','T1410C','T1410H','T1410L','T1410V',
'T1415O','T1415C','T1415H','T1415L','T1415V','T1420O','T1420C','T1420H','T1420L','T1420V',
'T1425O','T1425C','T1425H','T1425L','T1425V','T1430O','T1430C','T1430H','T1430L','T1430V',
'T1435O','T1435C','T1435H','T1435L','T1435V','T1440O','T1440C','T1440H','T1440L','T1440V',
'T1445O','T1445C','T1445H','T1445L','T1445V','T1450O','T1450C','T1450H','T1450L','T1450V',
'T1455O','T1455C','T1455H','T1455L','T1455V','T1500O','T1500C','T1500H','T1500L','T1500V']
# daily
dTypes = ["TEXT","REAL"]
dFields = ['date', 'open', 'close', 'high', 'low', 'volume', 'turn', 'pctChg', 'peTTM', 'pbMRQ', 'psTTM', 'pcfNcfTTM', 'isST', 'preclose']
# print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,  6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM, 11,pcfNcfTTM, 12,isST, 13,preclose")
# weekly
wTypes = ["TEXT","REAL"]
wFields = ['date', 'open', 'high', 'low', 'close', 'volume', 'turn', 'pctChg']
# print("0,date,  1,open,  2,high,   3,low,   4,close,  5,volume,  6,turn,  7,pctChg")
# print("日期 V1 V2 V3 ILimL ILimH OLimL OLimH min max")
# print( "0   1  2  3    4     5     6     7    8   9")
# Iv
ivTypes = ["TEXT","REAL"]
ivFields = ['date', 'V1', 'V2', 'V3', 'ILimL', 'ILimH', 'OLimL', 'OLimH', 'min', 'max', 'V1_V', 'V2_V', 'V3_V', 'ILimL_V', 'ILimH_V', 'OLimL_V', 'OLimH_V', 'min_V', 'max_V']
# RC
rcTypes = ["TEXT","TEXT","TEXT"]
rcFields = ["code","dateFrom","dateTo"]

def save(period,table,datas):
    if(datas == []):return table+"_empty"
    fields=[]
    types=[]
    if(period == "5"):
        fields = fiveFields
        types = fiveTypes
        for i in range(0,len(datas)):
            temp = []
            temp.append(datas[i][0])
            for j in range(1,len(datas[i])):
                temp.extend(datas[i][j])
            datas[i]=temp
    elif(period == "d"):
        fields = dFields
        types = dTypes
    elif(period == "w"):
        fields = wFields
        types = wTypes
    elif(period == "iv"):
        fields = ivFields
        types = ivTypes
    elif(period == "rc"):
        table = "records"
        fields = rcFields
        types = rcTypes
    else:return table+"_wrong period"
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
# author: moogiegik

    sqlS = SetUp(table,fields[0]+" "+types[0],fields[1:],types[1])
    cursor.execute(sqlS)
    if(table!="records" and table[0]!="w"):
        if((Query(cursor,table,fields[0],datas[len(datas)-1][0]))==None):
            if((Query(cursor,table,fields[0],datas[0][0]))==None):
                cursor.execute(f"SELECT COUNT(*) FROM {table}")
                count = cursor.fetchone()[0]
                if count != 0:
                    return table+"_incontinuity"

    sqlI = SqlInsert(table,len(fields))
    sqlU = SqlUpdate(table,fields)
    # print(sqlI)
    # print(sqlU)
    for i in range(0,len(datas)):
        while(len(datas[i])<len(fields)):
            datas[i].append(0)        
        if(Query(cursor,table,fields[0],datas[i][0])):
            # print(sqlU)
            # print(temp)
            temp = datas[i][1:]
            temp.append(datas[i][0])
            # print(temp)
            cursor.execute(sqlU,temp)
        else:
            # print(sqlI)
            cursor.execute(sqlI,datas[i])
    conn.commit()
    conn.close()
    return table+"_successful"

def QueryDatasByDateRange(table,dataFrom,dateTo):
    from datetime import datetime,timedelta
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    Datas = []
    date_format = "%Y-%m-%d"
    dataFrom = datetime.strptime(dataFrom,date_format)
    dateTo = datetime.strptime(dateTo,date_format)
    # print(dataFrom,dateTo)
    sql = "SELECT * from "+table+" where date = ?"
    while (dataFrom <= dateTo):
        cursor.execute(sql, (dataFrom.strftime(date_format),))
        # print(dataFrom,dateTo,sql,dataFrom.strftime(date_format),str(dataFrom.strftime(date_format)))
        # cursor.execute(sql, (str(dataFrom.strftime(date_format)),))
        temp = cursor.fetchone()
        if(temp != None):
            Datas.append(temp)
        dataFrom = dataFrom + timedelta(days=+1)
    conn.close()
    return Datas

def QueryDatasAll(table):
    from datetime import datetime,timedelta
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    sql = "SELECT * from "+table
    cursor.execute(sql)
    Datas = cursor.fetchall()
    conn.close()
    return Datas

def QueryDataByWhere(table,field,where):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()

    sql = "SELECT * from "+table+" where "+field+" = ?"
    cursor.execute(sql, (where,))
    temp = cursor.fetchall()

    conn.close()
    return temp
# author: moogiegik

def QueryHead_End(table,orderByField,eachNum):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    eachNum = str(eachNum)
    cursor.execute("SELECT * FROM "+table+" ORDER BY "+orderByField+" ASC LIMIT "+eachNum)
    rows_start = cursor.fetchall()
    cursor.execute("SELECT * FROM (SELECT * FROM "+table+" ORDER BY "+orderByField+" ASC) ORDER BY "+orderByField+" DESC LIMIT "+eachNum)
    rows_end = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows_start + rows_end

def Get_name(code):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ARank where 代码 = ?', (code,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return [row]

def DeleteDataByWhere(table,field,where):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()

    sql = "DELETE from "+table+" where "+field+" = ?"
    cursor.execute(sql, (where,))
    temp = cursor.fetchall()

    conn.commit()
    conn.close()


def CreateIvWIfNotExsist(code):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    fields = ivFields
    types = ivTypes
    sqlS = SetUp("ivW"+code,fields[0]+" "+types[0],fields[1:],types[1])
    cursor.execute(sqlS)
    conn.commit()
    conn.close()

# 未验证
def queryTableExsist_And_SetUp(table,tableType ="null"):
    conn = sqlite3.connect('MData.db')
    cursor = conn.cursor()
    rt = []
    fields=[]
    types=[]
    if(tableType == "null"):
        sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='{}'".format(table)
        cursor.execute(sql)
        rt = cursor.fetchone()
        conn.close()
        return rt
    else:
        if(tableType == "5"):
            fields = fiveFields
            types = fiveTypes
        elif(tableType == "d"):
            fields = dFields
            types = dTypes
        elif(tableType == "w"):
            fields = wFields
            types = wTypes
        elif(tableType == "iv"):
            fields = ivFields
            types = ivTypes
        elif(tableType == "rc"):
            table = "records"
            fields = rcFields
            types = rcTypes
        else:conn.close();return table+"_wrong tableType"
        sqlS = SetUp(table,fields[0]+" "+types[0],fields[1:],types[1])
        cursor.execute(sql)
        conn.commit()
        conn.close()
        return table

# SQLiteOperateFuns  ____________________________________________________________
# 增 多位
def SqlInsert(table,fieldsN):
    # if(fieldsN<len(data)):return "error"
    sql = "INSERT INTO "+ table + " VALUES(?"
    for i in range(0,fieldsN-1):
        sql+=",?"
    sql += ")"
    # print(sql)
    return sql

# 删 单位
def SqlDelete(table,filed):
    sql = "DELETE FROM "+table+" WHERE "+filed+" =?"
    # print(sql)
    return sql

# 改 多位
def SqlUpdate(table,fileds):
    # if(len(fileds)<len(data)):return "error"
    sql = "UPDATE "+table+" SET "
    for i in range(1,len(fileds)):
        sql += (fileds[i]+" = ?,")
    sql = sql[:-1] + " WHERE "+fileds[0]+"=?"
    # print(sql)
    return sql

# 查 单位
def Query(cursor,table,filed,data):
    # print(data)
    sql = "SELECT * from "+table+" WHERE "+filed+" =?"
    # print(sql)
    # return sql
    cursor.execute(sql,(data,))
    temp = cursor.fetchone()
    if(temp != None):
        return temp
    else:
        return None
# author: moogiegik

# 建
def SetUp(table,keyAndType,fields,fieldsType):
    sql = "CREATE TABLE IF NOT EXISTS "+ table +" ("+keyAndType+" PRIMARY KEY,  "+(" "+fieldsType+",").join(fields)+" "+fieldsType+")"
    return sql

