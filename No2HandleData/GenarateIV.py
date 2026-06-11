import numpy as np

# 日期 V1 V2 V3 ILimL ILimH OLimL OLimH min max
#  0   1  2  3    4     5     6     7    8   9
# ... V1_V V2_V V3_V ILimL_V ILimH_V OLimL_V OLimH_V min_V max_V
# ...  10   11   12    13      14      15      16     17    18

# 返回统一格式：
# 日期 V1 V2 V3 ILimL ILimH OLimL OLimH min max
#  0   1  2  3    4     5     6     7    8   9

# 日IV 日IV_V
def genarateDayIV_And_IV_V(fiveData):
    numbers = singleScratch(fiveData,4)
    weights = []
    # numbersWeifhted = []
    for i in range(0,len(fiveData)):
        # print("getWeight(): fiveData date",fiveData[i][0],"numbers",numbers[i])
        # check the stop days or data is all zero
        # numbersWeifhted = getWeight(numbers[i])
        weights.append(getWeight(numbers[i]))
    # IV # IV_V
    DayIV = []
    for i in range(0,len(fiveData)):
        d = []
        dv = []
        for j in range(1,len(fiveData[i])):
            d.extend(fiveData[i][j][:4])
            for n in range(0,weights[i][j-1]):
                dv.extend(fiveData[i][j][:4])
        DayIV.append([fiveData[i][0]])        
        DayIV[i].extend(genarateData(d))
        DayIV[i].extend(genarateData(dv))
    return DayIV

# 周IV_V 开始日期必须相同
def genarateWeekIV_And_IV_V(fiveData,weeks):
    from datetime import datetime
    date_format = "%Y-%m-%d"
    fiveDate = datetime.strptime(fiveData[0][0], date_format)
    weekDate = datetime.strptime(weeks[0], date_format)
    if fiveDate != weekDate:
        return "error dates wrong"

    weekFiveData = []
    w = 0
    for i in range(1,len(fiveData)):
        fiveDate = datetime.strptime(fiveData[i][0], date_format)
        # print(fiveDate,weekDate)
        if(fiveDate > weekDate):#晚于
            w = w+1
            weekDate = datetime.strptime(weeks[w], date_format)
            weekFiveData.append([weeks[w]])
            weekFiveData[w-1].extend(fiveData[i][1:])
        else:
            # print(fiveDate,weekDate)
            weekFiveData[w-1].extend(fiveData[i][1:])
    # for i in range(0,len(weekFiveData)):
        # print(len(weekFiveData[i]))
        # print(weekFiveData[i])
    return genarateDayIV_And_IV_V(weekFiveData)

# base function
#  V1  V2  V3 ILimL ILimH OLimL OLimH min max
#  0   1   2    3     4     5     6    7   8 
def genarateData(data):
    IvDataI = []
    # IvDataI.append(head)
    IvDataI.append(float(round(np.percentile(data, 25), 2)))
    IvDataI.append(float(round(np.percentile(data, 50), 2)))
    IvDataI.append(float(round(np.percentile(data, 75), 2)))

    IQR = IvDataI[2]-IvDataI[0]
    IQR = round(IQR, 2)
    IvDataI.append(float(round(IvDataI[0] - 1.5*IQR,2)))
    IvDataI.append(float(round(IvDataI[0] - 3*IQR,2)))

    IvDataI.append(round(IvDataI[2] + 1.5*IQR,2))
    IvDataI.append(round(IvDataI[2] + 3*IQR,2))

    maxN = max(data)
    minN = min(data)

    if(minN<IvDataI[3]):
        IvDataI.append(IvDataI[3])
    else:
        IvDataI.append(minN)

    if(maxN>IvDataI[6]):
        IvDataI.append(IvDataI[5])
    else:
        IvDataI.append(maxN)
    return IvDataI
# 获取权重数组
def getWeight(numbers):
    # 找出列表中的最小值
    min_value = min(numbers)
    # print("numbers",numbers)
    if(min_value==0):
        # print("fix min_value is 0")
        min_value = max(numbers)
        for i in range(1,len(numbers)):
            if(numbers[i]<min_value and numbers[i]!=0):min_value = numbers[i]
        # print("after fix min_value is ",min_value)

    # print(numbers)
    # print(min_value)
    # print("one turn")

    #四舍五入
    # print("min_value:",min_value)
    weight_numbers = [round(num / min_value) for num in numbers]
    return weight_numbers

# 提取指定位置数据
def singleScratch(arry,index):
    numbers = []
    for i in range(0,len(arry)):
        d = []
        for j in range(1,len(arry[i])):
            d.append(arry[i][j][index])
        numbers.append(d)
    return numbers

# 作废
def genarateDIV(fiveData):
    DIV = []
    for i in range(0,len(fiveData)):
        d = []
        for j in range(1,len(fiveData[i])):
            d.extend(fiveData[i][j][:4])
        DIV.append(genarateData(fiveData[i][0],d))
    return DIV


# da = [2295600.0, 934300.0, 530200.0, 533100.0, 633600.0, 508000.0, 581300.0, 276700.0, 68200.0, 26300.0, 12500.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 141100.0, 1510600.0, 783200.0, 230700.0, 214500.0, 67700.0, 75200.0, 88900.0, 107300.0, 72300.0, 81700.0, 98200.0, 53100.0, 87700.0, 68500.0, 92000.0, 83700.0, 71300.0, 64100.0, 70100.0, 770900.0, 803000.0, 192300.0, 237100.0, 422000.0, 826400.0, 427700.0, 247700.0]
# print(getWeight(da))