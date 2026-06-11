import SQLite
# d = []
# d = SQLite.QueryDatasByDateRange("testIv","2025-01-01","2025-01-30")
# for i in range(0,len(d)):
#     print(d[i])

# datas = [
#     ['2025-01-04', 3.37, 3.57, 3.62, 3.0, 2.62, 4.0, 4.37, 3.21, 3.66, 3.34, 3.52, 3.6, 2.95, 2.56, 3.99, 4.38, 3.21, 3.66],
#     ['2025-01-06', 3.27, 3.31, 3.36, 3.13, 3.0, 3.5, 3.63, 3.21, 3.55, 3.26, 3.31, 3.37, 3.09, 2.93, 3.54, 3.7, 3.21, 3.55],
#     ['2025-01-07', 33.55, 3.26, 3.31, 3.37, 3.09, 2.93, 3.54, 3.7, 3.21, 3.55],
#     ['2025-01-066']]
# SQLite.save("iv","ivW00455",datas)
# print(SQLite.QueryHead_End("records","code",1))

# print(SQLite.CreateIvWIfNotExsist("56647"))

# print(SQLite.Get_name("002303"))
print(SQLite.Get_name("0023"))
print(SQLite.Get_name("0023")[0]==None)
