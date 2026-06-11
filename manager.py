from No1CloudData import GetData
from No2HandleData import GenarateIV
from No3SQLiteData import SQLite
from datetime import datetime,timedelta

import socket

date_format = "%Y-%m-%d"

def get_fullCode(code):
    # if code.startswith('60') or code.startswith('688') or code.startswith('900'):
    #     return 'sh.'+code  # 上海证券交易所
    # elif code.startswith('00') or code.startswith('300') or code.startswith('002') or code.startswith('200'):
    #     return 'sz.'+code  # 深圳证券交易所
    # elif code.startswith('83') or code.startswith('87') or code.startswith('88'):
    #     return 'bj.'+code  # 全国中小企业股份转让系统（新三板）北京
    # else:
    #     return ""
    if code.startswith('6') or code.startswith('900'):
        return 'sh.'+code  # 上海证券交易所
    elif code.startswith('0') or code.startswith('3') or code.startswith('200'):
        return 'sz.'+code  # 深圳证券交易所
    elif code.startswith('83'):
        return 'bj.'+code  # 全国中小企业股份转让系统（新三板）北京
    else:
        return ""
# author: moogiegik

def Download(flag,code,BaodateFrom,BaodateTo,AkdateFrom,AKdateTo):
    print("On Download: ",flag,code,BaodateFrom,BaodateTo,AkdateFrom,AKdateTo)
    Fcode = get_fullCode(code)
    data5 = []
    dataD = []
    # dataW = []
    # 网络数据
    print("get data start")
    if(flag == 3 or flag == 1 ):
        print("get from Bao",Fcode,BaodateFrom,BaodateTo)
        data5.extend(GetData.BaoData(Fcode,BaodateFrom,BaodateTo,"5"))
        dataD.extend(GetData.BaoData(Fcode,BaodateFrom,BaodateTo,"d"))
        print("Bao result")
        print(len(data5))
        if(len(data5)):
            print(len(data5),data5[0][0],dataD[len(dataD)-1][0])
            print(len(dataD),dataD[0][0],dataD[len(dataD)-1][0],"\n")
        # dataW.extend(GetData.BaoData(Fcode,BaodateFrom,BaodateTo,"w"))
    if(flag == 3 or flag == 2 ):
        print("get from AK5",Fcode,AkdateFrom,AKdateTo)
        temp = []
        temp.extend(GetData.AkData(Fcode,AkdateFrom,AKdateTo,"5"))
        if(temp != []):
            print("get from d")
            data5.extend(temp)
            dataD.extend(GetData.AkData(Fcode,AkdateFrom,AKdateTo,"d"))
        # else:print("get from AK5 is [empty]")
            # dataW.extend(GetData.AkData(Fcode,AkdateFrom,AKdateTo,"w"))
    print("get data end")

    # print(data5,dataD)
    if(data5 == []):print("got from AK5 empty");return ["got empty"]
    print("check data")
    for i in range(len(dataD)-1,-1,-1):
        if (dataD[i][5] == 0):
            del dataD[i]
            if (data5[i][1][0] == 0):
                print("del",i,dataD[i])
                print("del",i,data5[i])
                del data5[i]
                del dataD[i]
    print("end result")
    print(len(data5))
    if(len(data5)):
        print(len(data5),data5[0][0],dataD[len(dataD)-1][0])
        print(len(dataD),dataD[0][0],dataD[len(dataD)-1][0],"\n")
    for i in range(0,len(dataD)):
        d_ = dataD[i][0]
        f_ = data5[i][0]
        # print(f_,d_)
        if(f_!=d_):
            print(f_,d_)
            print("diffrent date",data5[i],"\n",dataD[i])   
            break             

    if(len(data5)!=len(dataD)):print("diffrent lengthes of data5,dataD");return ["diffrent lengthes"]
    # print("----->data5",data5)
    # print("----->dataD",dataD)
    print("get correct data end")
    print("genarateIV And save data start")
    ivD = GenarateIV.genarateDayIV_And_IV_V(data5)
    # print("----->ivD",ivD)

    print("save ","f"+code)
    incontinuity = SQLite.save("5","f"+code,data5)
    print(incontinuity)
    if(incontinuity != "f"+code+"_successful"):return "get "+incontinuity
    print("save ","d"+code)
    print(SQLite.save("d","d"+code,dataD))
    # print(SQLite.save("w","w"+code,dataW))
    # print("sinal",SQLite.QueryDatasAll("w"+code))
    print("save ","ivD"+code)
    print(SQLite.save("iv","ivD"+code,ivD))
    print("genarateIV And save data end")

    return [dataD[0][0],dataD[len(dataD)-1][0]]

# Iv数据
# use in updateIvw
def updateIvwIFun(code,From,To,newFlag):
    if(newFlag == "new"):
        print("IV new")
        data5 = SQLite.QueryDatasAll("f"+code)
        dataW = SQLite.QueryDatasAll("w"+code)
    else:
        print("IV add")
        data5 = SQLite.QueryDatasByDateRange("f"+code,From.strftime(date_format),To.strftime(date_format))
        dataW = SQLite.QueryDatasByDateRange("w"+code,From.strftime(date_format),To.strftime(date_format))
    weeks = []
    for i in range(0,len(dataW)):
        weeks.append(dataW[i][0])
    weekStartIdx = 0
    for i in range(0,len(data5)):
        if(weeks[0]==data5[i][0]):
            print(weeks[0][0],data5[i][0])
            weekStartIdx = i
            break
    print("weekStartIdx",weekStartIdx)
    if(weekStartIdx == len(data5)-1):return
    # print(weeks)
    # print(data5)
    # print(dataW)
    print(weekStartIdx)
    # print(data5[weekStartIdx:])

    for i in range(0,len(data5)):
        temp = []
        temp.append(data5[i][0])
        for j in range(1,len(data5[i]),5):
            temp.append(data5[i][j:j+5])
        data5[i] =  temp

    ivW = GenarateIV.genarateWeekIV_And_IV_V(data5[weekStartIdx:],weeks)
    print("save ","ivW"+code)
    print(SQLite.save("iv","ivW"+code,ivW) )

def updateIvw(code):
    SQLite.CreateIvWIfNotExsist(code)
    ivWheadend = SQLite.QueryHead_End("ivW"+code,"date",1)
    if(ivWheadend == []):
        print("new updateIvw")
        updateIvwIFun(code,"","","new")
    else:
        print("add updateIvw")
        wheadend = SQLite.QueryHead_End("w"+code,"date",1)
        wFrom = datetime.strptime(wheadend[0][0],date_format)
        wTo = datetime.strptime(wheadend[1][0],date_format)
        ivWFrom = datetime.strptime(ivWheadend[0][0],date_format)
        ivWTo = datetime.strptime(ivWheadend[1][0],date_format)#晚
        # 前延
        if(wFrom<ivWFrom):
            print("foward add updateIvw")   
            updateIvwIFun(code,wFrom,ivWFrom,"")
        updateIvwIFun(code,ivWTo,wTo,"new")
  
def download_And_Get_Data(code,fromLevel,dayWeekFlag):
    recd = SQLite.QueryDataByWhere("records","code",code)
    # print(rec)
    today = (datetime.today()).date()
    todayS = today.strftime(date_format)
    todayD1 = today + timedelta(days=-1)
    todayD1S = todayD1.strftime(date_format)
    fromLevel = (datetime.strptime(fromLevel,date_format)).date()
    fromLevelS = fromLevel.strftime(date_format)
    downDate = []
# 新
    if(recd == []):
        print("download_And_Get_Data-------->>>  new")
        downDate = Download(3,code,fromLevelS,todayD1S,todayS,todayS)
        if(downDate[0]=='empty'):print("empty return");return
        print("save ","records"+code)
        SQLite.save("rc","records",[[code,fromLevelS,downDate[1]]])
        # updateIvw(code)
# 已有 更新
# author: moogiegik
    else:
        recdFrom = (datetime.strptime(recd[0][1],date_format)).date()
        recdFromS = recdFrom.strftime(date_format)
        print(recd)
        recdTo = (datetime.strptime(recd[0][2],date_format)).date()
        recdToS = recdTo.strftime(date_format)
        # 前延更新
        if(fromLevel<recdFrom):
            print("download_And_Get_Data-------->>>  foward")
            realFrom = (SQLite.QueryHead_End("f"+code,"date",1))[0][0]
            print("realFrom",realFrom)
            downDate = Download(1,code,fromLevelS,realFrom,"","")
        # 最近更新  后延更新
        print("latest to delete",recdToS)
        # SQLite.DeleteDataByWhere("w"+code,"date",recdToS)#删除
        # SQLite.CreateIvWIfNotExsist(code)
        # SQLite.DeleteDataByWhere("ivW"+code,"date",recdToS)#删除
        if(today>recdTo):
            print("more latest",today,recdTo)
            downDate = SQLite.QueryDataByWhere("d"+code,"date",todayD1S)
            # print(downDate)
            if(downDate != [] and (downDate[0][-1]>0)):
                print("yesterday d is full download")
                downDate = SQLite.QueryDataByWhere("f"+code,"date",todayD1S)
                # print(downDate)
                if(downDate != [] and (downDate[0][-4]>0)):
                    print("yesterday f is full download")
                    downDate = Download(2,code,"","",todayS,todayS)
                else:downDate = Download(3,code,recdToS,todayD1S,todayS,todayS)
            else:downDate = Download(3,code,recdToS,todayD1S,todayS,todayS)
            print("more latest change on:",downDate)
        if(today==recdTo):
            print("one latest",today,recdTo)
            print("today",today)
            # check nesessary find last one is full download
            downDate = SQLite.QueryDatasByDateRange("f"+code,(today - timedelta(days=17)).strftime(date_format),todayS)
            # print(downDate[len(downDate)-1])
            # print(downDate[len(downDate)-1][-4])
            # downDate = Download(2,code,"","",todayS,todayS)
            if(downDate != [] and (downDate[len(downDate)-1][-4]>0)):
                downDate = [todayS,todayS]
                print("latest f one is full download")
            else:downDate = Download(2,code,"","",todayS,todayS)
            print("one latest change on:",downDate)
        if(downDate[0]=='got empty'):
            print("empty return")
        else:
            print("change records with:",[[code,fromLevelS,downDate[1]]])
            print("save ","records"+code)
            print(SQLite.save("rc","records",[[code,fromLevelS,downDate[1]]]))
        # updateIvw(code)

# need fix
        return Get_Data_derectly(code,fromLevelS,dayWeekFlag,"false")
        # return [SQLite.QueryDatasByDateRange("d"+code,fromLevelS,downDate[1]),SQLite.QueryDatasByDateRange("ivD"+code,fromLevelS,downDate[1])]
        # return [SQLite.QueryDatasByDateRange("f"+code,fromLevelS,downDate[1]),SQLite.QueryDatasByDateRange("d"+code,fromLevelS,downDate[1]),SQLite.QueryDatasByDateRange("ivD"+code,fromLevelS,downDate[1]),Get_name(code)]

    # if(dayWeekFlag == "周K"):
    #     return [SQLite.QueryDatasByDateRange("w"+code,fromLevelS,downDate[1]),SQLite.QueryDatasByDateRange("ivW"+code,fromLevelS,downDate[1])]

def Get_name(code):
    name = SQLite.Get_name(code)
    # print(name)
    if(name[0]==None):
        name = "unkonw"
    else:
        name = name[0][2]
    # print("name:",name)
    return name
# author: moogiegik

def Get_Data_derectly(code,fromLevel,dayWeekFlag,flag):
    headEnd = SQLite.QueryHead_End("f"+code,"date",1)
    if(dayWeekFlag == "日K"):
        if(flag == "true"):
            return [SQLite.QueryDatasByDateRange("f"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("d"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("ivD"+code,fromLevel,headEnd[1][0]),"T"+Get_name(code)]
        else:
            return [SQLite.QueryDatasByDateRange("f"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("d"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("ivD"+code,fromLevel,headEnd[1][0]),Get_name(code)]

    # if(dayWeekFlag == "周K"):
    #     return [SQLite.QueryDatasByDateRange("d"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("w"+code,fromLevel,headEnd[1][0]),SQLite.QueryDatasByDateRange("ivW"+code,fromLevel,headEnd[1][0]),"没音僧僧w"]

def Get_Data_Temp_IV(date,dayWeekFlag):
    # for i in range(0,len(date)):
    #     temp = []
    #     temp.append(date[i][0])
    #     for j in range(1,len(date[i]),5):
    #         temp.append(date[i][j:j+5])
    #     date[i] =  temp

    if(dayWeekFlag == "日K"):
        ivD = GenarateIV.genarateDayIV_And_IV_V(date)
        print(ivD)
    # if(dayWeekFlag == "周K"):
    #     ivD = GenarateIV.genarateDayIV_And_IV_V(date)
    #     print(ivD)
    return ivD

def Get_Local_IP():
    try:
        # 创建一个 UDP 套接字
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 连接到一个公共的 IP 地址（不会真正发送数据）
        s.connect(("8.8.8.8", 80))
        # 获取本机 IP 地址
        ip = s.getsockname()[0]
        s.close()
        return ["successfully!",ip]

    except Exception as e:
        # print(f"获取本地 IP 地址失败: {e}")
        return ["error!"]




# print(len(Get_Data_derectly("002168",'2024-06-01','日K',"true")))
# print(download_And_Get_Data("002168",'2024-06-01','日K'))
# print(Get_Data_derectly("002168",'2024-06-01','日K',"true"))

# download_And_Get_Data("000935",'2024-06-01','日K')


# download_And_Get_Data("600505",'2024-06-01','日K')

# downDate = SQLite.QueryDataByWhere("f600505","date","2025-01-10")
# downDate = SQLite.QueryDataByWhere("d"+"600505","date","2025-02-26")
# print(downDate)
# print(downDate[0][-1])

# print(downDate[len(downDate)-1][-1])


# today = (datetime.today()).date()

# print((today - timedelta(days=17)).strftime(date_format))
# downDate = SQLite.QueryDatasByDateRange("f"+"600505",(today - timedelta(days=17)).strftime(date_format),"2025-02-25")
# downDate = SQLite.QueryDatasByDateRange("f"+"600505","2025-02-26","2025-02-27")

# print(downDate != [])

# print(downDate[len(downDate)-1][-1])

# for
# if(){downDate = SQLite.DeleteDataByWhere("f"+code,"dateTo","2025-01-10")}


# downDate = SQLite.QueryDatasByDateRange("f"+"002303",(today - timedelta(days=17)).strftime(date_format),"2025-02-25")
# downDate = SQLite.QueryDatasByDateRange("f"+"002303","2025-02-20","2025-02-25")
# downDate = SQLite.QueryDatasByDateRange("f"+"600505","2025-02-09","2025-02-25")

# print(downDate)
