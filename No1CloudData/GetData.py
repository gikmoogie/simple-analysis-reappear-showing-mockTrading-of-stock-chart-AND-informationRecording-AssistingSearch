# author: moogiegik

def AkData(code,dateFrom,dateTo,period):
    import akshare as ak
    if period == "5":
        d = AkGet5MinDataFun(ak,code,dateFrom,dateTo)
    elif period == "d":
        d = AkGetDayDataFun(ak,code,dateFrom,dateTo)
    elif period == "w":
        d = AkGetWeekDataFun(ak,code,dateFrom,dateTo)
    else:
        d = "error"
    return d

def BaoData(code,dateFrom,dateTo,period):
    import baostock as bs
    response = bs.login()
    if period == "5":
        d = BaoGet5MinDataFun(bs,code,dateFrom,dateTo)
    elif period == "d":
        d = BaoGetDayDataFun(bs,code,dateFrom,dateTo)
    elif period == "w":
        d = BaoGetWeekDataFun(bs,code,dateFrom,dateTo)
    else:
        d = "error"
    bs.logout()
    return d





def AkGet5MinDataFun(ak,code,dateFrom,dateTo):
    stock_zh_a_hist_min_em_df = ak.stock_zh_a_hist_min_em(symbol=code[3:], start_date=dateFrom+" 09:30:00", end_date=dateTo+" 15:00:00", period="5", adjust="")
    RawFiveMinsKData = stock_zh_a_hist_min_em_df.to_numpy()
    # 时间	开盘	收盘	最高	最低	涨跌幅	涨跌额	成交量	成交额	振幅	换手率
    #   0    1       2       3     4        5       6      7        8      9    10
    FiveMinsKData = []
    for i in range(0,len(RawFiveMinsKData),48):
        # date = 
        data = [RawFiveMinsKData[i][0][:10]]
        for j in range(i,i+48):
            d = []
            try:
                # print(RawFiveMinsKData[j][0])
                d.extend(RawFiveMinsKData[j][1:5])
                d.append(RawFiveMinsKData[j][7]*100)
            except:
                break
            data.append(d)
        FiveMinsKData.append(data)

    return FiveMinsKData

def AkGetDayDataFun(ak,code,dateFrom,dateTo):
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=code[3:], period="daily", start_date=dateFrom.replace("-", ""), end_date=dateTo.replace("-", ""), adjust="")
    RawDayKData = stock_zh_a_hist_df.to_numpy()
    # 日期	股票代码	开盘	收盘	最高	最低	成交量	成交额	振幅	涨跌幅	涨跌额	换手率
    #   0    1          2       3      4        5       6      7      8      9       10      11
    DayKData = []
    for i in range(0,len(RawDayKData)):
        data = []
        data.append(RawDayKData[i][0].strftime('%Y-%m-%d'))
        data.extend(RawDayKData[i][2:6])
        data.append(RawDayKData[i][6]*100)
        data.append(RawDayKData[i][11])
        data.append(RawDayKData[i][9])
        data.extend([0,0,0,0,0,0])
        DayKData.append(data)
    return DayKData

def AkGetWeekDataFun(ak,code,dateFrom,dateTo):
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=code[3:], period="weekly", start_date=dateFrom.replace("-", ""), end_date=dateTo.replace("-", ""), adjust="")
    RawWeekKData = stock_zh_a_hist_df.to_numpy()
    # 时间	 代码	开盘	收盘	最高	最低	成交量	成交额	  振幅    涨跌幅    涨跌额	换手率
    #   0    1       2       3     4        5       6      7        8       9         10     11
    WeekKData = []
    # print(RawWeekKData)
    for i in range(0,len(RawWeekKData)):
        data = []
        data.append(RawWeekKData[i][0].strftime('%Y-%m-%d'))
        data.extend(RawWeekKData[i][2:6])
        data.append(RawWeekKData[i][6]*100)
        data.append(RawWeekKData[i][11])
        data.append(RawWeekKData[i][9])
        WeekKData.append(data)
    return WeekKData


def BaoGet5MinDataFun(baostock,code,dateFrom,dateTo):
    # print("get5MinData!",dateFrom,"to",dateTo)
    FiveMinsKData = [[""]]
    response = baostock.query_history_k_data_plus(
        code,
        "date,open,close,high,low,volume",
        start_date = dateFrom,
        end_date = dateTo,
        frequency = "5",
        adjustflag = "3")
    index = 0
    while (response.error_code == '0') & response.next():
        tempData = response.get_row_data()
        if(FiveMinsKData[index][0]==tempData[0]):
            FiveMinsKData[index].extend([tempData[1:]])
        else:
            FiveMinsKData.append([tempData[0],tempData[1:]])
            index+=1
    for i in range(0,len(FiveMinsKData)):
        for j in range(1,len(FiveMinsKData[i])):
            for n in range(0,5):
                FiveMinsKData[i][j][n] = round(float(FiveMinsKData[i][j][n]), 3)
    return FiveMinsKData[1:]

def BaoGetDayDataFun(baostock,code,dateFrom,dateTo):
    # print("getDayData!",dateFrom,"to",dateTo)
    DayKData = []
    response = baostock.query_history_k_data_plus(
        code,
        "date,open,close,high,low,volume,turn,pctChg,peTTM,pbMRQ,psTTM,pcfNcfTTM,isST,preclose",
        start_date = dateFrom,
        end_date = dateTo,
        frequency = "d",
        adjustflag = "3")
    while (response.error_code == '0') & response.next():
        DayKData.append(response.get_row_data())
    for i in range(0,len(DayKData)):
        # print(DayKData[i])
        for j in range(1,len(DayKData[i])):
            # print(DayKData[i][j])
            try:
                DayKData[i][j] = round(float(DayKData[i][j]), 3)
            except:
                if(DayKData[i][j] == ""):
                    DayKData[i][j] = 0              
    return DayKData

def BaoGetWeekDataFun(baostock,code,dateFrom,dateTo):
    # print("getDayData!",dateFrom,"to",dateTo)
    WeekData = []
    response = baostock.query_history_k_data_plus(
        code,
        "date,open,high,low,close,volume,turn,pctChg",
        start_date = dateFrom,
        end_date = dateTo,
        frequency = "w",
        adjustflag = "3")
    while (response.error_code == '0') & response.next():
        WeekData.append(response.get_row_data())
    for i in range(0,len(WeekData)):
        # print(WeekData[i])
        for j in range(1,len(WeekData[i])):
            # print(WeekData[i][j])
            try:
                WeekData[i][j] = round(float(WeekData[i][j]), 3)
            except:
                if(WeekData[i][j] == ""):
                    WeekData[i][j] = 0              
    return WeekData