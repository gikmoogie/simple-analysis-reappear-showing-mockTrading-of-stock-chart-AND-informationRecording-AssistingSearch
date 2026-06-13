# author: moogiegik

from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
import logging
import time

from explore import exploreData
import manager
from info import infoDataManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.secret_key = 'trade'  # 密钥用于会话加密
socketio = SocketIO(app)
# connections = 0
app.config['connections'] = 0

# 配置日志
logging.basicConfig(level=logging.DEBUG)
app.logger.addHandler(logging.StreamHandler())

# AK 升级
# pip install akshare --upgrade


# explore________________________________________________________
@app.route("/explore")
def explore():
    return render_template("explore.html")
@app.route('/explore/exploreReqest', methods=['POST'])
def exploreReqest():
    json = request.get_json()
    # offset = json.get("offset")
    try:
        return jsonify({"data":exploreData.Start(json)})
        # return jsonify({"data":[324,56]})
        # return jsonify({exploreData.ARank})
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400
@app.route('/explore/exploreSimpleReqest', methods=['POST'])
def exploreSimpleReqest():
    json = request.get_json()
    try:
        if(json.get("type")=="open"):
            # return jsonify({'data': ["successfully!"]})
            return jsonify({'data': send_message_to_client(json.get("data"),1)})
        elif(json.get("type")=="IP"):
            return manager.Get_Local_IP()
        return jsonify({"data":exploreData.simpleStart(json)})
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400


# chart________________________________________________________
@app.route("/chart")
def chart():
    return render_template("chart.html")
@app.route('/getStockData', methods=['POST'])
def getStockKData():
    json = request.get_json()
    try:
        app.logger.info(json)
        # return [json.get("code"),json.get("fromDate"),json.get("type")]
    # AND NOW WE CHOSE -----LOCAL-DB-SAVED data only------Entry port 1
    # Entry port 1
    # THE CODES BELOW FOR ----LOCAL-DB-SAVED data only----
        return jsonify(manager.Get_Data_derectly(json.get("code"),json.get("fromDate"),json.get("type"),"true"))
    # THE CODES BELOW FOR ----NETWORK-UPDATE and LOCAL-DB-SAVED data----
    # Entry port 2
        # return jsonify(manager.download_And_Get_Data(json.get("code"),json.get("fromDate"),json.get("type")))
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400
@app.route('/getStockTempIV', methods=['POST'])
def getStockTempIV():
    json = request.get_json()
    try:
        app.logger.info(json)
        return jsonify(manager.Get_Data_Temp_IV(json.get("data"),json.get("type")))
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400


# author: moogiegik

# socketio________________________________________________________
@socketio.on('connect')
def test_connect():
    app.logger.info('Client connected')
    # connections+=1
    app.config['connections'] += 1
    emit('server_response', {'data': 'Connected'})
@socketio.on('disconnect')
def test_disconnect():
    app.logger.info('Client disconnected')
    app.config['connections'] -= 1
    # connections-=1
def send_message_to_client(data,connection):
        # message = f'Hello from Flask at {time.ctime()}'+data
        message = ["open",data]
        socketio.emit('server_response', {'data': message})
        return ["successfully!"]



# zero________________________________________________________
@app.route("/")
def home():
    return render_template("home.html")



# info________________________________________________________
@app.route("/info")
def info():
    return render_template("info.html")
@app.route('/info/infoSimpleReqest', methods=['POST'])
def infoSimpleReqest():
    json = request.get_json()
    try:
        # return jsonify(json)
        # app.logger.debug("This is a debug messageadd1111") # not work
        # app.logger.info("This is an info message2222")
        # app.logger.warning("This is a warning message")
        # app.logger.info("info request on flask:json:",json,"json,s data:",json.get("data"))
        return jsonify(infoDataManager.Start(json))

        # if(json.get("type")=="add"):
        #     return jsonify({'data': infoDataManager.Start(json)})
        
        # elif(json.get("type")=="IP"):
        #     return manager.Get_Local_IP()
        # return jsonify({"data":exploreData.simpleStart(json)})
    except ValueError:
        return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400


# @app.route("/chart")
# def chart():
#     return render_template("GIK No1.html")

# @app.route('/getStockKData', methods=['POST'])
# def getStockKData():
#     json = request.get_json()
#     try:
#         app.logger.info(json)
#         return jsonify(RequestManager.start(json))
#         # return jsonify()
#     except ValueError:
#         return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400

# @app.route('/getStockK5Data', methods=['POST'])
# def getStockK5Data():
#     json = request.get_json()
#     try:
#         app.logger.info(json)
#         return jsonify(RequestManager.startQueryK5data(json))
#         # return jsonify()
#     except ValueError:
#         return jsonify({'error': 'Invalid input. Please provide a valid number.'}), 400 

if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, host='0.0.0.0',port=5005,debug=True,allow_unsafe_werkzeug=True)
    # socketio.run(app, host='0.0.0.0',port=5005,debug=True,allow_unsafe_werkzeug=True)

# app.logger.info(json)

# def change():
#     dataDays =  [[[140.0, 98.0, 74.0, 194.0], [188.0, 134.0, 116.0, 98.0, 74.0]], [[260.0, 146.0, 134.0, 284.0], [260.7, 213.5, 206.0, 182.0, 134.8]], [[320.0, 272.0, 224.0, 332.0], [314.0, 278.0, 266.0, 254.0, 224.0]], [[380.0, 368.0, 368.0, 410.0], [410.0, 398.0, 380.0, 374.0, 368.0]], [[410.0, 392.0, 362.0, 416.0], [395.0, 386.0, 383.0, 380.0, 371.0]], [[392.0, 398.0, 380.0, 422.0], [407.0, 398.0, 398.0, 392.0, 383.0]], [[458.0, 410.0, 404.0, 458.0], [428.7, 417.5, 416.0, 410.0, 404.0]], [[440.0, 458.0, 428.0, 488.0], [488.0, 470.0, 470.0, 458.0, 440.0]], [[433.3, 428.0, 422.7, 449.4], [449.4, 440.0, 433.3, 428.0, 422.7]], [[438.7, 438.7, 428.0, 454.7], [452.0, 444.0, 444.0, 438.7, 430.7]], [[422.7, 444.0, 422.7, 449.4], [446.7, 438.7, 438.7, 433.3, 425.3]], [[444.0, 422.7, 422.7, 454.7], [454.7, 444.0, 438.7, 433.3, 422.7]], [[465.4, 454.7, 433.3, 476.1], [462.7, 454.7, 454.7, 449.4, 441.4]], [[428.0, 454.7, 422.7, 465.4], [465.4, 454.7, 449.4, 444.0, 428.0]], [[428.0, 422.7, 422.7, 444.0], [444.0, 438.7, 433.3, 428.0, 422.7]], [[428.0, 428.0, 406.6, 444.0], [444.0, 433.3, 428.0, 422.7, 406.6]], [[454.7, 417.3, 401.3, 460.1], [430.7, 422.7, 417.3, 417.3, 409.3]], [[476.1, 460.1, 438.7, 486.8], [462.7, 454.7, 449.4, 449.4, 441.4]], [[476.1, 476.1, 460.1, 492.1], [484.1, 476.1, 476.1, 470.7, 462.7]], [[492.1, 476.1, 465.4, 508.1], [502.8, 486.8, 481.4, 476.1, 465.4]], [[529.5, 492.1, 486.8, 529.5], [505.5, 497.5, 497.5, 492.1, 486.8]], [[529.5, 529.5, 502.8, 540.2], [540.2, 524.2, 521.5, 513.5, 502.8]], [[534.8, 513.5, 502.8, 540.2], [526.8, 518.8, 513.5, 513.5, 505.5]], [[545.5, 545.5, 524.2, 572.2], [555.6, 545.5, 545.5, 538.9, 528.8]], [[492.1, 540.2, 481.4, 545.5], [545.5, 534.8, 529.5, 524.2, 508.1]], [[476.1, 449.4, 395.9, 529.5], [529.5, 514.8, 497.5, 444.0, 395.9]], [[513.5, 513.5, 513.5, 513.5], [513.5, 513.5, 513.5, 513.5, 513.5]], [[647.0, 647.0, 636.4, 657.7], [655.1, 647.0, 641.7, 641.7, 636.4]], [[636.4, 641.7, 631.0, 647.0], [647.0, 641.7, 641.7, 636.4, 631.0]], [[652.4, 641.7, 631.0, 663.1], [663.1, 647.0, 641.7, 636.4, 631.0]], [[631.0, 647.0, 625.7, 652.4], [652.4, 647.0, 641.7, 641.7, 633.7]], [[641.7, 625.7, 625.7, 657.7], [652.4, 636.4, 631.0, 625.7, 625.7]], [[631.0, 641.7, 620.3, 652.4], [652.4, 641.7, 631.0, 631.0, 620.3]], [[625.7, 636.4, 615.0, 641.7], [641.7, 631.0, 625.7, 620.3, 615.0]], [[641.7, 631.0, 620.3, 652.4], [652.4, 636.4, 631.0, 625.7, 620.3]]]
#     return dataDays

# def checkNetInfo():
#     # return [3.24,"sz.002303","美盈森"]
#     # return ['平安银行', 'sz.000001', '12.21', ['2.34', '543.03万手', '2.80%', '5.05']]
#     return ['美盈森', 'sz.002303', '3.41', '1.93', '66.36万手', '8.36%', '21.35']