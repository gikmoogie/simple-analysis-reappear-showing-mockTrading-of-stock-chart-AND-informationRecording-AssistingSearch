@echo off
echo Starting Flask application...

REM 切换到项目根目录
@REM cd到你的项目更目录全局路径，比如   cd /d C:\Users\Administrator\Github\A simple analysis of the browser stock chart
@REM 未正确更改是不能运行本文件的
cd /d 

REM 激活虚拟环境（如果有）
call venv\Scripts\activate
echo Virtual environment activated.

REM 设置FLASK_APP环境变量
set FLASK_APP=appNew.py

REM 设置FLASK_ENV环境变量（可选，用于开发环境）
set FLASK_ENV=development

REM 运行Flask应用
flask run

echo Flask application stopped.
pause