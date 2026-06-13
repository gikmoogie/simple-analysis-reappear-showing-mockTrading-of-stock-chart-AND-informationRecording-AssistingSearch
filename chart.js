// author: moogiegik
// update akshare
// pip install --upgrade akshare
// Get elements
// ______元素变量 elements variables____________________________________________________________________________
// 代码输入口对象 code input port obj
const codeShort = document.getElementById('codeShort');
const refreshBtn = document.getElementById('refreshBtn');
// main chart window
const MAINcanvas = document.getElementById('Mainchart');
const MAINctx = MAINcanvas.getContext('2d');
// sub chart window
const SUBcanvas = document.getElementById('SUBchart');
const SUBctx = SUBcanvas.getContext('2d');
// mask chart window
const MASKcanvas = document.getElementById('MASKchart');
const MASKctx = MASKcanvas.getContext('2d');
// const MASKctx  = MASKcanvas.getContext('webgl') || MASKcanvas.getContext('experimental-webgl');
// Date window
const DateChart = document.getElementById('DateChart');

// mins chart window
const MinsLinecanvas = document.getElementById('Minschart');
const MinsLinectx = MinsLinecanvas.getContext('2d');
// focus item info window
const CrossInfo = document.getElementById("CrossInfo")
// point date
const pointDate = document.getElementById("pointDate")
// point price
const pointPrice = document.getElementById("pointPrice")
// point price change rate
const pointPriceChange = document.getElementById("pointPriceChange")
// select show five chart
const fiveChartCheckbox = document.getElementById("fiveChartCheckbox")
// select review modle
const reviewModleCheckbox = document.getElementById("reviewModleCheckbox")
// local_ip
const local_ip = document.getElementById("local_ip")

// ______指令变量 older variables____________________________________________________________________________
var dayWeekChoice = "日K";//周日K switch
// var dateFromChoice = "2024-06-01";//from when to start
var dateFromChoice = "2024-06-01";//from when to start
// IV V or W
const IVbase = 1;//IV w or not [1,10]

// ______限位变量 limit position variables____________________________________________________________________________
// basic variable1_________
// start draw honriztal position "left right gap"
var drawGap = 10;
// author: moogiegik
// one chart items size
var chartItemWidth = 20;
var SimChartItemWidth = chartItemWidth/2;
// Mainchart size info
var MainchartWidth;
var MainchartHeight;
// Subchart size info
var SubchartWidth;
var SubchartHeight;
var MaskchartHeight;
// basic variable2_________
// chart window length
var windowLength = 0;
// basic data length
var basicDataLength = 0;
// sub data length
var subDataLength = 0;
// FinalSub data length
var FinalSubDataLength = 0;//作废处理
// max start index limit
var maxStartIndex = 0;//indexable
// move limit variable__________
// start index for drag and ..
var startIndex = 0;//indexable//[-1,availableStartIndex]
// sub data index
var subEndIndex = 0;//indexable//[0,subDataLength]+1
// point index for show point info and visible vriable part
var pointIndex = 0;//indexable[-1,basicDataLength-1]
// available start index limit
var availableStartIndex = 0;//indexable//[-1,maxStartIndex]
// temp storagy variable__________
// use to show temp data carraier
let VisibleData;
// data from server temporarily staragy
let responseLocal =[];
// temporary IV data
let TempIv = [[]];
// other variable__________
let crossIdx = 0;
// 用于记录上次触摸的时间
let lastTouchTime = 0; 
// 双击时间阈值（毫秒）
const doubleTapThreshold = 300;
const longTapThreshold = 1100;
//current X of mouse and touch
// let currentX = 0;
//long press X of mouse and touch
let long_pressX = 0;

let offsetX = 0; // Horizontal offset for translation
let currentOffsetXFive = -1;//48*3+1=145

let currentOffsetXMaxForScroll = 0;
let offsetXMaxForScroll = 0;
let offsetXMaxForALL = 0;
let currentOffsetX = 0;
let VisibleMax = -1;

let UsedWidth = 0;

let isDragging = false; // Whether the user is dragging
let dragStartX = 0; // Where the drag started

let responseFiveCopy = {};
let responseFiveMinsLineCopy ={};
let KdataVisible;
let IVdataVisible;


//tredemechine
const EleToltalCapitalisation = document.getElementById("ToltalCapitalisation")
const EleMoneyNeed = document.getElementById("MoneyNeed")
const EleAveragePrice = document.getElementById("AveragePrice")
const EleToltalProfit = document.getElementById("ToltalProfit")
// const EleTodayProfit = document.getElementById("TodayProfit")
const EleTodayProfitMoney = document.getElementById("TodayProfitMoney")
const EleToltalProfitMoney = document.getElementById("ToltalProfitMoney")
const EleUseableMoney = document.getElementById("UseableMoney")
const EleToltalValue = document.getElementById("ToltalValue")
const EleUnlockedNum = document.getElementById("UnlockedNum")
const EleLockedNum = document.getElementById("LockedNum")
const EleWillBuy = document.getElementById("WillBuy")
const EleWillSale = document.getElementById("WillSale")
const EleChangeUseableMoney = document.getElementById("changeUseableMoney")
//
// author: moogiegik
const BT_nextDay = document.getElementById("btn_nextDay")
const BT_nextFive = document.getElementById("btn_nextFive")
const clcBuy = document.getElementById("clcBuy")
const clcSale = document.getElementById("clcSale")

var AveragePrice = 0;
var chatgedMoney = 0;
var CanBuy = 0;
var ToltalCapitalisation = 0;
var ToltalCost = 0;
var useableMoney = 0;
var ToltalValue = 0;
var UnlockedNum = 0;
var LockedNum = 0;
var UnlockedNum = 0;
var brokerage = 0.0005;
var RawMoney = 0;
var TodayStartMoney = 0;


// IVCD
var IVCD_data1 = [[],[],[],[],[]]
var IVCD_data2 = [[],[],[],[],[]]
var IVCD_data3 = [[],[],[],[],[]]
var IVCD_data4 = [[],[],[],[],[]]
var IVCD_data5 = [[],[],[],[],[]]
// BIAS_QL
var BIAS_QLs_S_MA = []
// RSI
var RSI_SMA = []
var Price_Average_Line = []
var BB_Index = []
var BB_Index2 = []
var NKD_RSV = []
var IVCD_data = []
var PRE_data = []
var TEST_data = []
var Price_Average_Line_H = []
var Volume_G_data = []
var XZC_data = []
var KDJ_data = []
var YYX_data = []


// var h_Average_Line = []
// var open_Average_Line = []
// var l_Average_Line = []


  // IVCD(priod1,priod2,priod3,IV_Normal,dataIndex,IVCD_data)
  // Volume(width,dataIndex,averangeDraw)
  // drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type)
  // BBI(sumPriod1,sumPriod2,sumPriod3,sumPriod4,dataPosition,dataIndex)
  // BTX(dataPosition,dataIndex,type)
  // BIAS_QL(dataPosition,dataIndex,MAn,color1,color2)
  // RSV(dataPosition,dataIndex,slice1,Tslice1,slice2,Tslice2,priod)
  // NKD(dataPosition,dataIndex,slice1,Tslice1,slice2,Tslice2,priod,priod2,color1,color2,color3,color4)
  // RSIS(dataPosition,dataIndex,priods,colors)

  //VOLUME,drawAverageLine,IVCD,BBI,BTX,BIAS_QL,NKD,RSIS,OPENVOL,PRE,TST
  //0         1             2     3   4   5       6   7，   8     9  10

  //                  0         1            2   3    4  5       6   7    8   9  10  11
  //                VOLUME,drawAverageLine,IVCD,BBI,BTX,BIAS_QL,NKD,RSIS,XZC,PRE,XYY,UN
  var IndexsSwitch = [0,        1,           0,  0,  0,  0,      0,  0,   0,  0,  0,  0,   0,  0,   0,  0,  0,    0]
  var select__  =    [0,        0,           0,  0,  0,  0,      0,  0,   0,  0,  1,  0,   0,  0,   0,  0,  0,    0]    
  var select__i =    [0,        1,           0,  0,  0,  0,      0,  0,   0,  0,  0,  0,   0,  0,   0,  0,  0,    0]
  var select__u =    [0,        0,           1,  0,  0,  0,      0,  0,   1,  0,  1,  0,   0,  0,   0,  0,  0,    0]
  var select__y =    [0,        0,           0,  0,  0,  0,      0,  0,   0,  0,  1,  0,   0,  0,   0,  0,  0,    0]
  var overlapRate = 0.01
  var overlapMinPrice = Math.floor(0.01/overlapRate*100)/100
  var YYXProiod = 30


  // var selectByNum = 0

// 日期 V1 V2 V3 ILimL ILimH OLimL OLimH min max
// 0    1  2  3    4     5     6     7    8   9
// V1_V V2_V V3_V ILimL_V*1.5 ILimH_V OLimL_V*1.5 OLimH_V min_V max_V
// 10   11    12    13          14         15       16     17    18   
// var Bx_On_Use = [1,2,3,4,6]
// var Bx_On_Use = [10,11,12,14,16]
// var Bx_On_Use = [10,11,12,13,15,14,16]
var Bx_On_Use = [10,11,12,13,15]
// var Bx_On_Use = [10,11,12,17,18]
// var Bx_On_Use2 = [1,2,3,8,9]
var Bx_colors = ["white","#fc9219","aqua","red","red","green","green"]

let startDate = document.getElementById("startDate")
let ontime = document.getElementById("ontime")
let endDate = document.getElementById("endDate")

const timeList = ['9:35','9:40', '9:45', '9:50', '9:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35',
    '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '13:05',
    '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05',
    '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00']


// ______鼠标事件处理 manager____________________________________________________________________________
{
//鼠标按下
// Mouse down event
MASKcanvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX; // Store where the drag started, taking into account current offset
  MAINcanvas.style.cursor = 'grabbing'; // Change cursor to grabbing when dragging starts on effect
});
//鼠标移动
// Mouse move event
MASKcanvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // console.log((dragStartX - e.clientX)/1000,Num_round((dragStartX - e.clientX)/1000),0)
    // console.log("ok",dragStartX - e.clientX)
    if((dragStartX - e.clientX) >= 5){
      dragStartX = e.clientX
      if(startIndex>=availableStartIndex){startIndex = availableStartIndex}
      else{
        startIndex += 1
        refreshDraw(IndexsSwitch); // Redraw the canvas with the updated offset
      }
    }
    else if((dragStartX - e.clientX) <= -5){
      dragStartX = e.clientX
      if(startIndex<=0){}
      else{
        startIndex -= 1
        refreshDraw(IndexsSwitch);; // Redraw the canvas with the updated offset
      }
    }
    // offsetX = offsetX - Num_round((dragStartX - e.clientX)/10,0); // Calculate new offset based on mouse movement
    // dragStartX = e.clientX
    // refreshDraw(responseLocal,offsetX); // Redraw the canvas with the updated offset
  }
  else{
    crossLines(2*(e.clientX-12),2*(e.clientY-12),20)
  }
});
//鼠标抬起
// Mouse up event
MASKcanvas.addEventListener('mouseup', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
});
//鼠标移出
// Mouse out event
MASKcanvas.addEventListener('mouseout', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
  CrossInfo.innerHTML = ""
  crossIdx = -1
});
//鼠标双击
// Mouse dblclick event
MASKcanvas.addEventListener('dblclick', function(event) {
  console.log("crossIdx",crossIdx)//,"index",startIndex+crossIdx)
  if(crossIdx!=-1 && VisibleData[0][crossIdx][0] == VisibleData[1][crossIdx][0]){
    MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)
    cut = false
    if(VisibleData[0][crossIdx][0] == responseLocal[1][pointIndex][0]){cut = true}
    fiveMinsLine(VisibleData[0][crossIdx],1,cutout = cut)
  }
});

// 触摸开始事件
MASKcanvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // 阻止默认行为
  // 启动定时器
  long_pressX = e.touches[0].clientX;
  crossLines(2*(e.touches[0].clientX-12),2*(e.touches[0].clientY-12),20)

  // console.log("Long 1press",long_pressX,e.touches[0].clientX);
  longPressTimer = setTimeout(() => {
    console.log("Long press");
    // 触发拖拽移动事件
    // console.log("Long 2press",long_pressX,e.touches[0].clientX);
    if ((long_pressX - e.touches[0].clientX) < 5 && (long_pressX - e.touches[0].clientX)> -5) {
      isDragging = true;
      long_pressX = 0
      dragStartX = e.touches[0].clientX; // 保存触摸按下的初始位置
      if ('vibrate' in navigator) {
        // 震动模式：震动 1 秒，停止 1 秒，再震动 1 秒
        // navigator.vibrate([1000, 1000, 1000]);
        navigator.vibrate([100, 0, 0]);
      }
    }else{
      isDragging = false;
    }
  }, longTapThreshold)

  const currentTime = new Date().getTime();
  console.log(currentTime,lastTouchTime,currentTime - lastTouchTime,doubleTapThreshold)
  if (currentTime - lastTouchTime < doubleTapThreshold) {
    // 触发双击事件
    crossIdx = Math.floor((2*(e.touches[0].clientX-12)-(1*drawGap))/(drawGap + chartItemWidth))

    console.log("crossIdx", crossIdx); //,"index",startIndex+crossIdx)
    if (crossIdx != -1 && VisibleData[0][crossIdx][0] == VisibleData[1][crossIdx][0]) {
      MinsLinectx.clearRect(0, 0, MinsLinecanvas.width, MinsLinecanvas.height);
      cut = false;
      if (VisibleData[0][crossIdx][0] == responseLocal[1][pointIndex][0]) {
        cut = true;
      }
      fiveMinsLine(VisibleData[0][crossIdx], 1, cutout = cut);
    }
  }
  lastTouchTime = currentTime 
});

// 触摸开始事件
// MASKcanvas.addEventListener('touchstart', (e) => {
//   e.preventDefault(); // 阻止默认行为
//   isDragging = true;
//   dragStartX = e.touches[0].clientX; // 保存触摸按下的初始位置
//   MAINcanvas.style.cursor = 'grabbing'; // 改变鼠标光标为 grabbing
// });

// 触摸移动事件
MASKcanvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // 阻止默认行为
  if (isDragging) {
    if ((dragStartX - e.touches[0].clientX) >= 5) {
      dragStartX = e.touches[0].clientX;
      if (startIndex >= availableStartIndex) {
        startIndex = availableStartIndex;
      } else {
        startIndex += 1;
        refreshDraw(IndexsSwitch);; // 重新绘制画布
      }
    } else if ((dragStartX - e.touches[0].clientX) <= -5) {
      dragStartX = e.touches[0].clientX;
      if (startIndex <= 0) {
        // 无操作
      } else {
        startIndex -= 1;
        refreshDraw(IndexsSwitch);; // 重新绘制画布
      }
    }
  } else{
    crossLines(2*(e.touches[0].clientX-12),2*(e.touches[0].clientY-12),20)
  }

});

// 触摸结束事件
MASKcanvas.addEventListener('touchend', (e) => {
  clearTimeout(longPressTimer);
  isDragging = false; // 停止拖拽
  MAINcanvas.style.cursor = 'grab'; // 重置鼠标光标为 grab 
});

// 触摸取消事件
MASKcanvas.addEventListener('touchcancel', () => {
  clearTimeout(longPressTimer);
  isDragging = false; // 停止拖拽
  MAINcanvas.style.cursor = 'grab'; // 重置鼠标光标为 grab
});

}
// ______键盘事件处理 manager____________________________________________________________________________
{
  document.addEventListener('keydown', function(event) {
    // console.log('event.keyCode:', event.keyCode);
    // console.log('event.key:', event.key);
    // 检查是否按下了 Enter 键
    if (event.key === 'm') {
      nextDay(60);
    }
    if (event.key === 'n') {
      nextDay(1);
    }
    if (event.key === 'k') {
      ToBuy();
    }
    if (event.key === 'l') {
      ToSale();
    }
    if (event.key === 'o') {
      if(reviewModleCheckbox.checked){
        reviewModleCheckbox.checked = false;
      }else{
        reviewModleCheckbox.checked = true;
      }
    }
    if (event.key === 'p') {
      SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height);
      MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height);
      getStockData()
    }
    if (event.key === 'y' || event.key === 'a') {
      select__ = select__y
      selectrefreshDraw(select__,1,"blue")
    }
    if (event.key === 'u' || event.key === 's') {
      select__ = select__u
      selectrefreshDraw(select__,1,"yellow")
    }
    if (event.key === 'i' || event.key === 'd') {
      select__ = select__i
      selectrefreshDraw(select__,1,"purple")
    }


    if (event.key === 'h') {
      selectrefreshDraw(select__,1,"green")
    }
    if (event.key === 'j') {
      selectrefreshDraw(select__,1,"green")
    }

    if (event.key === 'b') {
      limitPriceSale()
    }
  });
}
// refresh with select function
function selectrefreshDraw(needIndexs,id,color){
  {
    // for(var i = 0;i<IndexsSwitch.length;i++){
    //   if (IndexsSwitch[i] >0 || needIndexs[i] >0){
    //     IndexsSwitch[i] = 1
    //   }
    // }
    refreshDraw(needIndexs)
    refreshDraw(IndexsSwitch)
  
    var snl = []
    for(var i = 0;i<VisibleData[0].length;i++){
      snl.push(1)
    }
  }
    switch(id){
      case 1:selectNormal(needIndexs,snl);break
    }
    // console.log("snl",snl)
    // drawStickToCTX(snl,SUBctx,SubchartHeight,100,["green","red","blue"],1,8,0);
    SUBctx.fillStyle = color
    var width = 8
    for(var i = 0;i<snl.length;i++){
      if(snl[i]==1){
        SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,0, width,20);
      }
    }
}
function selectNormal(needIndexs,snl){
  var endTill = startIndex+VisibleData[0].length;
  var j = 0
  // console.log("startIndex",startIndex,"endTill",endTill)
  //VOLUME,drawAverageLine,IVCD,BBI,BTX,BIAS_QL,NKD,RSIS,OPENVOL,CAT
  //0         1             2     3   4   5       6   7，   8     9
  // VOLUME
  if(needIndexs[0]==1){
    for(var i = 0;i<Volume_G_data[0].length;i++){
      if(Volume_G_data[1][i]>Volume_G_data[2][i] && snl[i]==1){
        snl[i] = 1
      }else{
        snl[i] = 0
      }
    }
  }
  // anverage
  if(needIndexs[1]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(Price_Average_Line[0][1][i]>Price_Average_Line[1][1][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // I_V
  if(needIndexs[2]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(IVCD_data[0][4][i]>IVCD_data[0][5][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // BBI
  if(needIndexs[3]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(BB_Index[0][4][i]<BB_Index[1][4][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // // BTX
  // BIAS_QL
  if(needIndexs[5]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(BIAS_QLs_S_MA[0][2][i]>BIAS_QLs_S_MA[0][1][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // KDJ
  if(needIndexs[6]==1){
    for(var i = snl.length-KDJ_data[0].length;i<KDJ_data[0].length;i++){
      if(KDJ_data[3][i]>KDJ_data[1][i] && snl[i]==1){
        snl[i] = 1
      }else{
        snl[i] = 0
      }
    }
  }
  //RSI
  if(needIndexs[7]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(RSI_SMA[0][2][i]>RSI_SMA[2][2][i] && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  //XZC
  // console.log("XZC_data",XZC_data)
  if(needIndexs[8]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      if(XZC_data[0][2][i]>XZC_data[0][3][i] && XZC_data[0][4][i]>XZC_data[0][2][i] &&snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
  }
  // // PRE
  // // TST
  //YYX YYX_data[0][1][i]>YYX_data[0][0][i] && 
  if(needIndexs[10]==1){
    j = 0
    for(var i = startIndex;i<endTill;i++){
      // if(YYX_data[0][1][i]>YYX_data[0][0][i] && snl[j]==1 && YYX_data[0][4][i]>0){
      // if(YYX_data[0][1][i]>YYX_data[0][0][i] && snl[j]==1 ){
      // if(snl[j]==1 && responseLocal[1][i-1][7]<2  && responseLocal[1][i-1][7]>-2){
      if(YYX_data[0][5][i]>0 && snl[j]==1){
        snl[j] = 1
      }else{
        snl[j] = 0
      }
      j++
    }
    // var pos = 0
    // for(var i = 0;i<YYX_data[0][5].length;i++){
    //   if(YYX_data[0][5][i]>0){pos+=1}
    // }
    // for(var i = startIndex;i<=pointIndex;i++){
    //   if(YYX_data[0][5][i]>0){pos+=1}
    // }
    // console.log("start",startIndex,"end",pointIndex,"winN",pos,"within",pointIndex-startIndex+1,"WIN RATE:",pos/(pointIndex-startIndex+1));
    
    // var bs = [pointIndex/4,pointIndex/2,10,5]
    // var step = [[0,bs[0]],[bs[0],2*bs[0]],[2*bs[0],3*bs[0]],[3*bs[0],pointIndex],[0,pointIndex/2],[pointIndex/2,pointIndex],[0,pointIndex]]
    // var rst = []
    // for(var j = 0;j<step.length;j++){
  // 限价概率
  {
    var rst = {}
    // all 
    coutRateNO1(0,pointIndex,rst,"all")
    // half
    coutRateNO1(0,pointIndex/2,rst,"quarter")
    coutRateNO1(pointIndex/2,pointIndex,rst,"quarter")
    // quarter
    coutRateNO1(0,pointIndex/4,rst,"quarter")
    coutRateNO1(pointIndex/4,pointIndex/2,rst,"quarter")
    coutRateNO1(pointIndex/2,pointIndex/2*3,rst,"quarter")
    coutRateNO1(pointIndex/4*3,pointIndex,rst,"quarter")
    // ten
    coutRateNO1(0,10,rst,"ten")
    coutRateNO1(10,20,rst,"ten")
    coutRateNO1(100,110,rst,"ten")
    coutRateNO1(110,120,rst,"ten")
    coutRateNO1(pointIndex-10,pointIndex,rst,"ten")
    coutRateNO1(pointIndex-20,pointIndex-10,rst,"ten")
    // five
    coutRateNO1(0,5,rst,"five")
    coutRateNO1(5,10,rst,"five")
    coutRateNO1(100,105,rst,"five")
    coutRateNO1(105,110,rst,"five")
    coutRateNO1(pointIndex-5,pointIndex,rst,"five")
    coutRateNO1(pointIndex-10,pointIndex-5,rst,"five")
    
    console.log(responseLocal[3],responseLocal[3],responseLocal[3])
    console.log("overlapRate",overlapRate,"overlapMinPrice",overlapMinPrice)
    console.log("rst",rst)
  }
  // return
  // YYX限价概率
  {
    var redL = 0
    var greenL = 0
    var redA = 0
    var greenA = 0
    for(var i = 1;i<pointIndex+1;i++){
      // if(YYX_data[0][0][i]>YYXProiod/2){
      // if(Price_Average_Line[0][1][i]>Price_Average_Line[1][1][i]){
      if(responseLocal[1][i-1][7]<2){
        redA++
        if(YYX_data[0][5][i]>0){
          redL++
        }
      }
      // if(YYX_data[0][1][i]>YYXProiod/2){
      // if(Price_Average_Line[0][1][i]<Price_Average_Line[1][1][i]){
      if(responseLocal[1][i-1][7]>2){
        // console.log(responseLocal[1][i][0],responseLocal[1][i-1][7])
        greenA++
        if(YYX_data[0][5][i]>0){
          greenL++
        }
      }
    }
    console.log("redL",redL,"redA",redA,redL/redA,"greenL",greenL,"greenA",greenA,greenL/greenA) 
  }
  }
}
function coutRateNO1(start,end,reslut,info){
    end = Num_round(end,0)
    start = Num_round(start,0)
    leng = (end-start+1)
    var pos = 0
    var rt = 0
    for(var i = start;i<=end;i++){
      if(YYX_data[0][5][i]>0){pos+=1}
    }
    rt = pos/leng
    reslut[info+" "+(end-start+1)+" A "+start+"-"+end] = rt
    // console.log("start",start,"end",end,"winN",pos,"within",leng,"WIN RATE:",rt);
    return rt
}

// ______top manager____________________________________________________________________________
{
// ZOOMchange 作废
function zoomChange(value){
  chartItemWidth = chartItemWidth+value
  drawGap=chartItemWidth/3*2
  if(chartItemWidth<5){chartItemWidth=5;drawGap=chartItemWidth/3*2}
  else if(chartItemWidth>100){chartItemWidth=100;drawGap=chartItemWidth/3*2}
  else{refreshDraw(IndexsSwitch);}
}

// init limit position variables
function reinitVarialsForZoom(){
  // variations
  VWP = windowLength
  // change:windowLength,maxStartIndex,startIndex
  windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
  if(basicDataLength>windowLength){
    maxStartIndex = basicDataLength-windowLength;
  }
  else{
    maxStartIndex = 0;
  }
  // variations
  VWP = Math.abs(windowLength - VWP)
  D = pointIndex - startIndex
  console.log(VWP,D)
  // new startIndex
  if(D>windowLength-1){
    startIndex+=VWP
    availableStartIndex+=VWP
  }else{
    if(startIndex>0){
      startIndex-=VWP
      availableStartIndex-=VWP
      if(startIndex<0){startIndex=0;availableStartIndex=0;}
    }
  }
  PrintLimitPositionVariables("ZOOM")
}

// 生成要显示的数据generate the data of going to show
function generateVisablelData(){
  if(startIndex+windowLength>pointIndex){
    MINdata = deepCopyArray(responseLocal[0].slice(startIndex,pointIndex+1))
    Kdata = deepCopyArray(responseLocal[1].slice(startIndex,pointIndex+1))
    IVdata = deepCopyArray(responseLocal[2].slice(startIndex,pointIndex+1))
  }else{
    MINdata = deepCopyArray(responseLocal[0].slice(startIndex,startIndex+windowLength))
    Kdata = deepCopyArray(responseLocal[1].slice(startIndex,startIndex+windowLength))
    IVdata = deepCopyArray(responseLocal[2].slice(startIndex,startIndex+windowLength))
  }
  if(subEndIndex<48){
    console.log("TempIv",TempIv)
    IVdata.pop()
    IVdata.push(TempIv[0])
    // IVdata[IVdata.length-1] = TempIv[0]
    data = [0,[],[],0]
    for (i = 1; i < MINdata[MINdata.length-1].length; i+=5) {
      if(MINdata[MINdata.length-1][i+1]==0){break;}
      data[0] = (MINdata[MINdata.length-1][i+1])
      data[1].push(MINdata[MINdata.length-1][i+2])
      data[2].push(MINdata[MINdata.length-1][i+3])
      data[3] = parseInt(data[3]) + parseInt(MINdata[MINdata.length-1][i+4])
      if(data[1].length>=subEndIndex){break;}
    }
    // 2,close,  3,high,  4,low,  5,volume,
    Kdata[Kdata.length-1][2] = data[0]
    Kdata[Kdata.length-1][3] = Math.max(...data[1])
    Kdata[Kdata.length-1][4] = Math.min(...data[2])
    Kdata[Kdata.length-1][5] = data[3]
    // 6,turn,  7,pctChg, 
    // Kdata[Kdata.length-1][6] = data[3]
    if(Kdata.length>1){
      Kdata[Kdata.length-1][7] = (parseInt((data[0]-Kdata[Kdata.length-2][2])/Kdata[Kdata.length-2][2]*10000))/100
    }else if(Kdata[Kdata.length-1][13]>0) {
      Kdata[Kdata.length-1][7] = (parseInt((data[0]-Kdata[Kdata.length-1][13])/Kdata[Kdata.length-1][13]*10000))/100
    }
    // 8,peTTM, 9,pbMRQ, 10,psTTM, 11,pcfNcfTTM, 12,isST, 13,preclose")
    // console.log("fiveMinsLine data[1].length,data",data[1].length,data)
    console.log("getStockTempIV----------------------")
  }
  // console.log("MINdata",MINdata,"Kdata",Kdata,"IVdata",IVdata)
  // console.log("responseLocal[1][0]",responseLocal[1][0],"responseLocal[1][1]",responseLocal[1][1])
  // console.log("key IVdata",IVdata[IVdata.length-1])
  return [MINdata,Kdata,IVdata]
}
function genarateDataFromfive(){}
//总管理
// top manager function _____FUNCTION  fixed
function refreshDraw(IndexsSwitch){
  console.log("refreshDraw()");
  if(pointIndex==-1){pointDate.textContent = "--/--/--"}
  else{pointDate.textContent = responseLocal[1][pointIndex][0].slice(2,)}
  $('#name').text(responseLocal[3])
  MAINctx.clearRect(0,0,MAINcanvas.width,MAINcanvas.height)
  // MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)
  // use to show temp data carraier
  // cut out
  VisibleData = generateVisablelData()
  // console.log("visible",VisibleData);


  MAINcanvas.height = MainchartHeight
  MAINcanvas.width = MainchartWidth
{  
  // high and low
  maxPrice = 0
  minPrice = VisibleData[1][0][4]
  for (i = 0; i < VisibleData[1].length; i++) {
    if(VisibleData[1][i][3]>maxPrice){maxPrice = VisibleData[1][i][3]}
    if(VisibleData[1][i][4]<minPrice){minPrice = VisibleData[1][i][4]}
  }
  // // recent price
  
  // pointPrice.textContent = responseLocal[1][pointIndex][2]
  // pointPriceChange.textContent = responseLocal[1][pointIndex][7]+"%"
  if(startIndex==availableStartIndex){
    pointPrice.textContent = VisibleData[1][VisibleData[1].length-1][2]
    pointPriceChange.textContent = VisibleData[1][VisibleData[1].length-1][7]+"%"
  }

  if(responseLocal[1][pointIndex][7]>0){
    pointPrice.style.color="#FF0021"
    pointPriceChange.style.color="#FF0021"
  }else if(responseLocal[1][pointIndex][7]<0){
    pointPrice.style.color="#00FFFF"
    pointPriceChange.style.color="#00FFFF"
  }else{
    pointPrice.style.color="white"
    pointPriceChange.style.color="white"
  }
  // highted
  // drawK
  VisibleHeighted = [[],[],[]]
  MCaverage = Num_round(MainchartHeight / (maxPrice - minPrice),4)
  for(var i = 0;i<VisibleData[1].length;i++){
    temp = []
    for(var j = 1;j<5;j++){
      temp.push(Num_round(MainchartHeight - (VisibleData[1][i][j]-minPrice)*MCaverage,3))
    }
    // push date
    temp.push(VisibleData[1][i][0])
    VisibleHeighted[1].push(temp)
  }
  // author: moogiegik
  // drawBox
  for(var i = 0;i<VisibleData[2].length;i++){
    temp = []
    for(var j = 0;j<Bx_On_Use.length;j++){
      temp.push(Num_round(MainchartHeight - (VisibleData[2][i][Bx_On_Use[j]]-minPrice)*MCaverage,3))
      // temp.push(VisibleData[2][i][Bx_On_Use[j]])
    }
    // push date
    temp.push(VisibleData[2][i][0])
    VisibleHeighted[2].push(temp)
  }
}
{
  // drawK
  var day=0
  // console.log("VisibleHeighted",VisibleHeighted)
  for(var i = 0;i<VisibleHeighted[1].length;i++){
    day = (new Date(VisibleHeighted[1][i][4])).getDay()
    // console.log("['",VisibleHeighted[1][i][4],"',",drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,"],",);
    drawK(VisibleHeighted[1][i].slice(0,4),drawGap+i*(drawGap+chartItemWidth),day)
  }
  // drawBox
  for(var i = 0;i<VisibleHeighted[2].length;i++){
    drawBox(VisibleHeighted[2][i].slice(0,5),drawGap+5+i*(drawGap+chartItemWidth),Bx_colors)
  }
  // formulaRunner("Price_Average",1,2,Price_Average_Line,2,[1],[["white"],["yellow"],["purple"],["gray"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
  // formulaRunner("Price_Average",2,16,h_Average_Line,2,[10,20],[["yellow"],["green"],["purple"],["gray"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
  // formulaRunner("Price_Average",2,14,l_Average_Line,2,[1],[["purple"],["yellow"],["purple"],["gray"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
  // formulaRunner("Price_Average",1,1,open_Average_Line,2,[1],[["green"],["yellow"],["purple"],["gray"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)

}

  SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height)
  SUBcanvas.height = SubchartHeight
  SUBcanvas.width = MainchartWidth
{
  // console.log("refresh IndexsSwitch",IndexsSwitch)
  //VOLUME,drawAverageLine,IVCD,BBI,BTX,BIAS_QL,NKD,RSIS,OPENVOL,CAT
  //0         1             2     3   4   5       6   7，   8     9
// VOLUME
  if(IndexsSwitch[0]==1){
    Volume(chartItemWidth,5,"draw",saveTo=Volume_G_data)
    // Volume(chartItemWidth,5,"")
  }
// anverage
  if(IndexsSwitch[1]==1){
    // drawAverageLine(5,1,2,minPrice,MCaverage,"white",MAINctx,MainchartHeight,"draw","normal")
    // drawAverageLine(10,1,2,minPrice,MCaverage,"yellow",MAINctx,MainchartHeight,"draw","normal")
    // drawAverageLine(20,1,2,minPrice,MCaverage,"purple",MAINctx,MainchartHeight,"draw","normal")
    // drawAverageLine(60,1,2,minPrice,MCaverage,"gray",MAINctx,MainchartHeight,"draw","normal")
    // formulaRunner("Price_Average",1,2,Price_Average_Line,2,[5,10,20,60,30],[["white"],["yellow"],["purple"],["gray"],["blue"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)

    // open:太滞后 high：稍异化 v1-v3：越高越滞后 vl：提前但风险高 vL：超级提前 vh：滞后 VH：超级滞后
    // 初步建议：close V1 V2 vl VL
    // close：锯齿 V1：平滑  v1与v2相差不大v2稍前 vl：锯齿且失真，仅少部分稍前 VL：延后锯齿
// V1_V V2_V V3_V ILimL_V*1.5 ILimH_V OLimL_V*1.5 OLimH_V min_V max_V
// 10   11    12    13          14         15       16     17    18   
    // formulaRunner("Price_Average",2,11,Price_Average_Line,2,[5,10],[["blue"],["red"],["purple"],["gray"],["white"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
    // formulaRunner("Price_Average",2,11,Price_Average_Line,2,[3,6],[["blue"],["red"],["purple"],["gray"],["white"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
    formulaRunner("Price_Average",1,2,Price_Average_Line,2,[3,6],[["red"],["green"],["purple"],["gray"],["white"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
    // formulaRunner("Price_Average",2,15,Price_Average_Line_H,2,[30,60],[["purple"],["purple"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
    // formulaRunner("Price_Average",2,13,Price_Average_Line,2,[1,5,10,20],[["white"],["yellow"],["purple"],["gray"]],null,[1],[minPrice],MCaverage,MAINctx,MainchartHeight)
    formulaRunner("Price_Average",1,2,Price_Average_Line_H,2,[5,10],[["white"],["purple"]],[1],[1],null,null,SUBctx,SubchartHeight)
  }
// I_V
  if(IndexsSwitch[2]==1){
    // IVCD(12,26,9,"iv",1,IVCD_data1)
    // IVCD(12,26,9,"iv",2,IVCD_data2)
    // IVCD(12,26,9,"iv",3,IVCD_data3)
    // IVCD(12,26,9,"iv",4,IVCD_data4)
    // IVCD(12,26,9,"iv",5,IVCD_data5)
    // IV_V
    // IVCD(12,26,9,"iv",10,IVCD_data1)
    // IVCD(12,26,9,"iv",11,IVCD_data2)
    // IVCD(12,26,9,"iv",12,IVCD_data3)
    // IVCD(12,26,9,"iv",13,IVCD_data4)
    // IVCD(12,26,9,"iv",14,IVCD_data5)
    // IVCD(12,26,9,"normal",2,IVCD_data1)
    // formulaRunner("IVCD",1,2,IVCD_data,7,[[12,26,9]],[["white","yellow","red","white","gray"]],[4,5],[4,5],null,null,SUBctx,SubchartHeight)
    // v1：还行 v2：一样
    formulaRunner("IVCD",2,11,IVCD_data,7,[[11,25,8]],[["green","yellow","red","white","gray"]],[4,5],[4,5],null,null,SUBctx,SubchartHeight)
    // formulaRunner("IVCD",2,11,IVCD_data,7,[[6,13,6]],[["green","yellow","red","white","gray"]],[4,5],[4,5],null,null,SUBctx,SubchartHeight)
  }
// BBI || true
  if(IndexsSwitch[3]==1){
    // V1_V V2_V V3_V ILimL_V*1.5 ILimH_V OLimL_V*1.5 OLimH_V min_V max_V
    // 10   11    12    13          14         15       16     17    18   
    // drawAverageLine(null,1,2,minPrice,MCaverage,"white",MAINctx,MainchartHeight,"draw","bbi")
    // open：严重滞后1天 数小滞后 2:15，16，18优秀，18锯齿更少，但16可能灵敏
    // formulaRunner("BBI",2,16,BB_Index,5,[[3,6,12,24],[1,2,4,8]],[["yellow"],["#66fc3c"]],null,[4],[minPrice],MCaverage,MAINctx,MainchartHeight)
    formulaRunner("BBI",2,16,BB_Index,5,[[3,6,12,24],[1,2,4,8]],[["yellow"],["#66fc3c"]],null,[4],[minPrice],MCaverage,MAINctx,MainchartHeight)
    // formulaRunner("BBI",1,2,BB_Index,5,[[3,6,12,24],[1,2,4,8]],[["yellow"],["#66fc3c"]],null,[4],[minPrice],MCaverage,MAINctx,MainchartHeight)
    // formulaRunner("BBI",1,2,BB_Index,5,[[3,6,12,24]],[["yellow"],["#66fc3c"]],null,[4],[minPrice],MCaverage,MAINctx,MainchartHeight)

  }
// BTX
if(IndexsSwitch[4]==1){
  // BTX(1,2,"increace")
  // 高就滞后
  BTX(2,14,"btx")
  // BTX(2,9,"btx")
  // BTX(2,17,"btx")
  // BTX(2,18,"btx")
  // BTX(2,18,"increace")
}
// BIAS_QL
if(IndexsSwitch[5]==1){
  // BIAS_QL(2,18,6,"white","purple")
  // BIAS_QL(1,2,6,"white","purple")
  // BIAS_QL_old(1,2,6,"white","purple")
  // formulaRunner("BIAS_QL",1,2,BIAS_QLs_S_MA,3,[[6,6],[3,3]],[["white","purple"],["red","blue"]],[1,2],[1,2],null,null,SUBctx,SubchartHeight)
  //2：16和18旗鼓相当，但是18的锯齿更少
  formulaRunner("BIAS_QL",2,18,BIAS_QLs_S_MA,3,[[6,6]],[["white","purple"]],[1,2],[1,2],null,null,SUBctx,SubchartHeight)
}
// NKD / KDJ
if(IndexsSwitch[6]==1){
  // NKD(1,1,1,3,3,5,9,3,"white","blue"," || trueyellow","red")
  // NKD(2,1,1,3,3,5,9,3,"white","blue","yellow","red")
  // InnerDataIndex==0-3
  // NKD(2,2, 10,12,17,19 ,9,3,"white","blue","yellow","red")
  //2 is the best
  // NKD(1,2, 1,3,3,5 ,9,3,"white","blue","yellow","red")
  formulaRunner("KDJ",1,[2,3,4],KDJ_data,4,[[9,3,3]],[["white","purple","yellow"]],[1,2,3],[1,2,3],null,null,SUBctx,SubchartHeight)
}
//RSI
if(IndexsSwitch[7]==1){
  // RSIS(1,2,[14],["white"])
  // 10,11:late 12:similar to 2 13:badly misslate 2:the best
  RSIS(1,2,[6,24,12],["white","purple","yellow"])
  // RSIS(2,8,[6,24,12],["white","purple","yellow"])
}
//XZC
if(IndexsSwitch[8]==1){
  formulaRunner("XZC",1,[2,3,4],XZC_data,6,[[36,3,30,4,20,80]],[["white","purple","brown"]],[5],[2,3,4],null,null,SUBctx,SubchartHeight)
  // formulaRunner("XZC",2,[11,12,10],XZC_data,6,[[36,3,30,4,20,80]],[["white","purple","brown"]],[2,3,4,5],[2,3,4],null,null,SUBctx,SubchartHeight)

}
// PRE
if(IndexsSwitch[9]==1){
  // formulaRunner("PRE",2,null,PRE_data,2,[[1,1]],[["purple","green"]],[0,1],[],null,null,SUBctx,SubchartHeight)-
  formulaRunner("PRE",2,null,PRE_data,3,[[1,1]],[["green","red","blue"]],[0,1,2],[],null,null,SUBctx,SubchartHeight)
}
// YYX
if(IndexsSwitch[10]==1){
  formulaRunner("YYX",1,7,YYX_data,6,[[YYXProiod,overlapRate]],[["red","green","yellow","gray"]],[3],[0,1,2,4],null,null,SUBctx,SubchartHeight)
}
// UN
if(IndexsSwitch[11]==1 || true){
  // formulaRunner("TST",2,null,TEST_data,2,[[1,1]],[["purple","green"]],[0,1],[],null,null,SUBctx,SubchartHeight)
}
  //CYR
  // CYR(1,2,13,5,"white","blue")
  // CYR(1,2,18,5,"red","yellow")
}
// SELECT
{
  // console.log("Volume_G_data",Volume_G_data)
  // console.log("Price_Average_Line",Price_Average_Line)
  console.log("Price_Average_Line_H",Price_Average_Line_H)
  // console.log("IVCD_data",IVCD_data)
  // console.log("BB_Index",BB_Index)
  // console.log("BIAS_QLs_S_MA",BIAS_QLs_S_MA)
  // console.log("NKD_RSV",NKD_RSV)
  // console.log("RSI_SMA",RSI_SMA)
  // console.log("PRE_data",PRE_data)
  // console.log("TEST_data",TEST_data)
  // console.log("YYX_data",YYX_data)

}
//  PrintLimitPositionVariables("refreshDraw()")
 console.log("\n!############################################################################################\n")
}


//总管理_old
// top manager function _____FUNCTION  replacing
function refreshDrawOld(offsetX){
  $('#name').text(responseLocal[2])
  MAINctx.clearRect(0,0,MAINcanvas.width,MAINcanvas.height)
  SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height)
  MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)

  Kdata = responseLocal[0]
  // console.log("Kdata",Kdata)
  // console.log("Kdata[offsetX][4]",Kdata[offsetX][4])

  KdataVisible = []
  IVdataVisible = []
  maxP = 0
  minP = Kdata[offsetX][4]
  // console.log("offsetX",offsetX,"currentOffsetX",currentOffsetX,"currentOffsetXFive",currentOffsetXFive,"currentOffsetXMaxForScroll",currentOffsetXMaxForScroll)

  // InfoOfOffsetX("what?")

  index = 0
  for (index = offsetX; index < Kdata.length && index<currentOffsetX-1; index++) {
    if((MainchartWidth - (4.5+(index-offsetX)*20))<15+24.5){break;}
    if(maxP<Kdata[index][3]){maxP = Kdata[index][3]}
    if(minP>Kdata[index][4]){minP = Kdata[index][4]}
    KdataVisible.push(Kdata[index])
  }
  // if(currentOffsetXFive<0 && currentOffsetX>0){
  console.log(currentOffsetXFive,index,currentOffsetX,currentOffsetXMaxForScroll)
  fiveFlag = false
  if(currentOffsetXFive<0 && index<currentOffsetX){
    if(maxP<Kdata[index][3]){maxP = Kdata[index][3]}
    if(minP>Kdata[index][4]){minP = Kdata[index][4]}
    // console.log("receve",KdataVisible[index])
    KdataVisible.push(Kdata[index])
    // InfoOfOffsetX("FlagAAAAAA")
    if(fiveChartCheckbox.checked){
      fiveMinsLine(Kdata[index],48,0)
    }
    ontime.textContent = pointDate.textContent+"  "+timeList[timeList.length-1]
  }
  else if(currentOffsetX!=0){
    kdataItem = getKdataFromFive(currentOffsetXFive,responseFiveCopy.K5data)
    if(maxP<kdataItem[3]){maxP = kdataItem[3]}
    if(minP>kdataItem[4]){minP = kdataItem[4]}
    KdataVisible.push(kdataItem)
    // console.log("receve",KdataVisible[index])
    fiveMinsLine(kdataItem,currentOffsetXFive+1,1)
    fiveFlag = true
  }
  average = Num_round(MainchartHeight / (maxP - minP),4)
  //现价
  console.log("KdataVisible data for example",KdataVisible[KdataVisible.length-1]);
  if(KdataVisible[KdataVisible.length-1][7]>0){
    pointPrice.style.color = "red"
    pointPriceChange.style.color = "red"
  }else if(KdataVisible[KdataVisible.length-1][7]<0){
    pointPrice.style.color = "green"
    pointPriceChange.style.color = "green"
  }else{
    pointPrice.style.color = "#b5b5b5"
    pointPriceChange.style.color = "#b5b5b5"
  }
  pointPrice.textContent = KdataVisible[KdataVisible.length-1][2]
  pointPriceChange.textContent = KdataVisible[KdataVisible.length-1][7]+"%"

  if(fiveFlag){
    if(currentOffsetXFive == 0){
      UnlockTheNum(true)
    }else{
      UnlockTheNum(false)
    }
    // changeNoToltalCapitalisation()
  }else{
    console.log(currentOffsetXFive)
    if(currentOffsetXFive == -3){
      UnlockTheNum(false)
    }else{
      UnlockTheNum(true)
    }
  }

  // console.log(maxP,minP,average,MainchartHeight,KdataVisible.length,KdataVisible,KdataVisible[0])
  // console.log(KdataVisible[0])
  startDate.textContent = KdataVisible[0][0]
  endDate.textContent = KdataVisible[KdataVisible.length-1][0]
  // console.log(startDate,KdataVisible[KdataVisible.length-1][0])

  KdataVisibleHeighted = []
  for(var index = 0;index<KdataVisible.length;index++){
    temp = []
    for(var j = 1;j<10;j++){
      temp.push(2*Num_round(MainchartHeight - (KdataVisible[index][j]-minP)*average,1))
    }
    temp.push(KdataVisible[index][10])
    temp.push([KdataVisible[index][0],index])
    // KdataVisibleHeighted[index] = temp
    KdataVisibleHeighted.push(temp)
  }
  MAINcanvas.height = 2*MainchartHeight
  MAINcanvas.width = 2*MainchartWidth


  // 设置CSS样式来控制画布的显示大小
  // MAINcanvas.style.width = '200px';
  // MAINcanvas.style.height = MainchartHeight + 'px';
  //K chart
  var day=0
  for(var index = 0;index<KdataVisible.length;index++){
    day = (new Date(KdataVisible[index][0])).getDay()
    drawK(KdataVisibleHeighted[index].slice(0,4),2*(4.5+index*20),20,day)
    // drawBox(KdataVisibleHeighted[index].slice(4,9),2*(4.5+index*20),20)
  }
  //average line
  // Kdata[0] = ['2024-01-02', 3.52, 3.59, 3.61, 3.5, 3.58, 3.59, 3.6, 3.55, 3.61, 14999508, 1.576, 2.279, 29.55, 1.085, 1.475, 230.733, 0, 3.51]
  // drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=5,20,"#FF0000",fiveFlag)
  // drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=10,20,"#e62af7",fiveFlag)
  // drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=20,20,"#00FF00",fiveFlag)
  // drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=60,20,"#0000FF",fiveFlag)

  // drawAverageLine(Kdata,dataIndex=2,minP,offsetX,average,sumAverage=5,20,"#FF0000",fiveFlag,KdataVisible[KdataVisible.length-1])

  drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=5,20,"#FF0000",fiveFlag,KdataVisible[KdataVisible.length-1])
  drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=10,20,"#e62af7",fiveFlag,KdataVisible[KdataVisible.length-1])
  drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=20,20,"#00FF00",fiveFlag,KdataVisible[KdataVisible.length-1])
  drawAverageLine(Kdata,dataIndex=6,minP,offsetX,average,sumAverage=60,20,"#0000FF",fiveFlag,KdataVisible[KdataVisible.length-1])

  //volume
  SUBcanvas.height = 2*SubchartHeight
  SUBcanvas.width = 2*SubchartWidth
  // maxV = drawVolume(KdataVisible,20)
  //volume average line
  // drawAverageLineVolume(Kdata,dataIndex=10,maxV,offsetX,average,sumAverage=5,20,"#0000FF",fiveFlag)
  // drawAverageLineVolume(Kdata,dataIndex=10,maxV,offsetX,average,sumAverage=10,20,"#0000FF",fiveFlag)

  // MACD(Kdata,dataIndex=2,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20)
  // MACD(Kdata,dataIndex=9,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20)
  MACD(Kdata,dataIndex=2,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20,MACD_data1)
  MACD(Kdata,dataIndex=6,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20,MACD_data2)
  // MACD(Kdata,dataIndex=8,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20,MACD_data3)
  MACD(Kdata,dataIndex=9,offsetX,sumAverage1=12,sumAverage2=26,sumAverage3=9,fiveFlag,KdataVisible[KdataVisible.length-1],20,MACD_data4)

  //                                                                                       涨跌     市盈    市净  市销    市现      
  // '2023-03-27', 3.79, 3.71, 3.79, 3.68, 3.71, 3.71, 3.73, 3.68, 3.74, 10196000, 1.071, -1.591, 43.546, 1.161, 1.399, 19.37,    0,   3.77
  // date         open close   high  low  Q1    mid    Q3    min   max   volume   turn   pctChg  peTTM   pbMRQ  psTTM pcfNcfTTM isST preclose
  //   0             1     2    3     4     5     6      7     8    9       10     11       12      13     14      15      16     17   18        


  //turns
  // magic9turns(Kdata,KdataVisibleHeighted,dataIndex=2,maxPV=9,offsetX,reference=4,20)
  // Consecutive(Kdata,KdataVisibleHeighted,dataIndex=2,maxPV=4,offsetX,20)
}
}


// automaticly trade functtions
{
  function limitPriceSale(){
    var wave = 1
    var Owave = 1
    var rate = 0
    var a = 0
    var b = 0
    var Catch = 0
    var loss = 1
    var profit = 1
    // console.log("int+++","wave",wave,"rate",rate,overlapRate,overlapRate+1)
    for(var i = 1;i<YYX_data[0][5].length;i++){
      if(responseLocal[1][i-1][2]>=overlapMinPrice){
        rate = Math.floor(responseLocal[1][i][3]/responseLocal[1][i-1][2]*1000)/1000
        if(responseLocal[1][i-1][7]>9.5){
          rate = 1
          Catch = "UNCatch"
          console.log("yesterday raise top: ",responseLocal[1][i-1][0],responseLocal[1][i-1][7]," higher than: ",9.5)
        }else if(rate >= overlapRate+1){
        // if(YYX_data[0][5][i]>0){
          rate = overlapRate+1
          profit = Math.floor(profit*rate*1000)/1000
          // console.log(responseLocal[1][i][0],"PROFIT+++","rate",rate,"a",a)
          a++
          Catch = "Catch"
        }else{
          rate = Math.floor(responseLocal[1][i][2]/responseLocal[1][i-1][2]*1000)/1000
          // if(b>20){
          //   rate = 1            
          // }
          // rate = 1
          Catch = "UNCatch"
          loss = Math.floor(loss*rate*1000)/1000
          // console.log(responseLocal[1][i][0],"PROFIT+++","rate",rate,"b",b)
          b++
        }
      }else{
        rate = 1
        Catch = "UNCatch"
        console.log("Price: ",responseLocal[1][i-1][2]," lower than: ",overlapMinPrice)
      }
      Owave = wave
      wave = Math.floor(wave*rate*1000)/1000
      // console.log("",responseLocal[1][i][0],"--------------------")
      // if(i<1000){  
      if(i<0){  
        if(rate>1){
          console.log("\n",Catch,"PROFIT+++",responseLocal[1][i][0],"rate",rate,"Owave",Owave,"Nwave",wave)
        }else{
          console.log("\n",Catch,"LOSS-----",responseLocal[1][i][0],"rate",rate,"Owave",Owave,"Nwave",wave)
        }
        console.log(
          "        MAXrate",Math.floor(responseLocal[1][i][3]/responseLocal[1][i-1][2]*1000)/1000,
          "todayHIGH",responseLocal[1][i][3],
          "todayCLOSE",responseLocal[1][i][2],
          "yesterdayCLOSE",responseLocal[1][i-1][2])
      }
    }
    console.log("FINAL ","WAVE: ",wave,"PROFIT",a,profit,"LOSS",b,loss)
  }




}
// author: moogiegik


// ______five chart draw functions____________________________________________________________________________
{
// SUBctx.fillStyle = "red"
// SUBctx.fillRect(0,0,100,100);
// ______show next draw functions____________________________________________________________________________
// show next day data_____FUNCTION
function nextDay(increaseVal){
  // move three things inner surface limit
  // PLUS
  /// PLUS for availableStartIndex
  subEndIndex += increaseVal
  // IF(subEndIndex == 60)
  if(availableStartIndex==-1 && startIndex==-1 && basicDataLength>0){
    availableStartIndex=0;startIndex=0;}
  if(pointIndex==-1){pointIndex=0}
  // console.log("subEndIndex,increaseVal,subEndIndex + increaseVal",subEndIndex,increaseVal)  
  if(subEndIndex<50){
    if(subEndIndex!=-1 && responseLocal[0][pointIndex][0] == responseLocal[1][pointIndex][0]){
      MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)
      // included refreshDraw in fiveMinsLine
      fiveMinsLine(responseLocal[0][pointIndex],1,cutout=true)
    }
    PrintLimitPositionVariables("nextfive")
  }else{
    if(subEndIndex<60 || subEndIndex>107){
      // console.log("availableStartIndex PLUS",availableStartIndex,maxStartIndex,pointIndex,windowLength-1);
      if(availableStartIndex<maxStartIndex && pointIndex>windowLength-2){availableStartIndex++}
      // else if(availableStartIndex==-1 && startIndex==-1 && basicDataLength>0){
      //   availableStartIndex=0;startIndex=0;}
      /// PLUS for pointIndex
      if(pointIndex<basicDataLength-1){pointIndex++}
      /// PLUS for startIndex
      if(pointIndex-startIndex>windowLength-1){startIndex = pointIndex-windowLength+1}
    }
    MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)

    // console.log("subEndIndex == 50 , pointIndex != basicDataLength-1",subEndIndex,pointIndex,basicDataLength)//,"index",startIndex+crossIdx)
    // pointIndex != basicDataLength-1 ban last day five lines
    if(subEndIndex == 50 && pointIndex != basicDataLength-1){
      subEndIndex = 1
      fiveMinsLine(responseLocal[0][pointIndex],1,cutout=true)
    }else{
      // console.log("subEndIndex_________________",subEndIndex)//,"index",startIndex+crossIdx)
      if((subEndIndex>60 && subEndIndex<=107) || fiveChartCheckbox.checked){
        subEndIndex = 49
        fiveMinsLine(responseLocal[0][pointIndex],1,cutout=false)
      }
      subEndIndex = 49
    }
    // PrintLimitPositionVariables("nextday")
    // console.log(pointIndex,startIndex,windowLength,windowLength-1)  
    // draw
    // refreshDraw();
    selectrefreshDraw(select__,1,"green")
    // changeNoLockedNum(true,null)

  }

  UnlockTheNum(true)
  changeNoCanBuy()

}
// show next five menutes data_____FUNCTION 作废处理
function nextFive(){
  console.log("offsetX",offsetX,"offsetXMaxForScroll",offsetXMaxForScroll,currentOffsetXFive>47 && offsetX>=offsetXMaxForScroll)
  if(currentOffsetXFive>47 && offsetX>=offsetXMaxForScroll){
    if(currentOffsetXFive>48){return}
    currentOffsetXFive = -2
    refreshDraw(responseLocal,offsetX);
    currentOffsetXFive = 50
    return
  }
  // console.log(currentOffsetXFive,Object.keys(responseFiveCopy).length)
  console.log(currentOffsetXFive)
  if(currentOffsetXFive<0){
    // console.log(offsetX,offsetXMaxForScroll,"zhihuishu")
    if(offsetX>=offsetXMaxForScroll){return}
    if(currentOffsetX-1>=VisibleMax){
      offsetX+=1
      currentOffsetXMaxForScroll = offsetX
    }
    if(currentOffsetX<offsetXMaxForALL){
      currentOffsetX++;
      pointDate.textContent = responseLocal.Kdata[currentOffsetX-1][0]
    }
    getStockData_Five()
  }
  else{
    if(currentOffsetXFive>47){
      // if(currentOffsetXFive>48){
      //   console.log("bbuugg")
      //   currentOffsetXFive = -1
      //   document.getElementById("btn_nextFive").style.background = "#F0F0F0"
      //   // document.getElementById("btn_nextFive").style.border = "1px solid #F0F0F0"
      //   nextFive()
      // }else
      {

        currentOffsetXFive++
        console.log(document.getElementById("btn_nextFive").style.background)
        document.getElementById("btn_nextFive").style.background = "#FF0000"
        nextDay()
      }
    }else{
      console.log("datago",currentOffsetXFive)
      ontime.textContent = pointDate.textContent+"  "+timeList[currentOffsetXFive]
      // console.log(responseFiveCopy.K5data[currentOffsetXFive])
      refreshDraw(responseLocal,offsetX);
      currentOffsetXFive++
    }
  }
}
// genarate one day data by using 5mins data_____FUNCTION
function getKdataFromFive(currentOffsetXFive,rawDataFive){
    // kdataItem = responseLocal.Kdata[currentOffsetX-1]//引用，会改变其值
    kdataItem = JSON.parse(JSON.stringify(responseLocal.Kdata[currentOffsetX-1])); 
    // console.log(kdataItem)
    // console.log(rawDataFive)
    //                                                                                       涨跌     市盈    市净  市销    市现      
    // '2023-03-27', 3.79, 3.71, 3.79, 3.68, 3.71, 3.71, 3.73, 3.68, 3.74, 10196000, 1.071, -1.591, 43.546, 1.161, 1.399, 19.37,    0,   3.77
    // date         open close   high  low  Q1    mid    Q3    min   max   volume   turn   pctChg  peTTM   pbMRQ  psTTM pcfNcfTTM isST preclose
    //   0             1     2    3     4     5     6      7     8    9       10     11       12      13     14      15      16     17   18                        

    // date
    kdataItem[0] = rawDataFive[48]
    // open/close
    kdataItem[1] = rawDataFive[0][0]
    kdataItem[2] = rawDataFive[currentOffsetXFive][1]
    //box
    for(var i = 5;i<10;i++){
      kdataItem[i]=0
    }
    //volume turn
    volume = 0
    for(var i = 0;i<=currentOffsetXFive;i++){
      volume += rawDataFive[i][2]
    }
    kdataItem[11] = Num_round(volume/kdataItem[10]*kdataItem[11],3)
    kdataItem[10] = volume
    //high low
    low = kdataItem[1] 
    high = kdataItem[2]
    for(var i = 0;i<=currentOffsetXFive;i++){
      temp = 0
      temp = rawDataFive[i][0]
      if(temp>high){
        // console.log("high",high,temp);
        high = temp;
      }
      if(temp<low){
        // console.log("low",low,temp);
        low = temp;
      }
      temp = rawDataFive[i][1]
      if(temp>high){
        // console.log("high",high,temp);
        high = temp;
      }
      if(temp<low){
        // console.log("low",low,temp);
        low = temp;
      }
    }
    kdataItem[3] = high
    kdataItem[4] = low

    kdataItem[12] = Number(((kdataItem[2]-kdataItem[18])/kdataItem[18]*100).toFixed(3))

    // console.log(kdataItem)

    // fiveMinsLine(rawDataFive,currentOffsetXFive,high,low)
    return kdataItem
}
}


// ______indexes chart draw functions____________________________________________________________________________
{
  // IVCD(priod1,priod2,priod3,IV_Normal,dataIndex,IVCD_data)
  // Volume(width,dataIndex,averangeDraw)
  // drawAverageLineVolume(data,dataIndex,maxPV,indexStart,heightAverage,sumAverage,boxWidth,color,fiveFlag)
  // drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type)
  // BBI(sumPriod1,sumPriod2,sumPriod3,sumPriod4,dataPosition,dataIndex)
  // BTX(dataPosition,dataIndex,type)
  // BIAS_QL(dataPosition,dataIndex,MAn,color1,color2)
  // RSV(dataPosition,dataIndex,slice1,Tslice1,slice2,Tslice2,priod)
  // NKD(dataPosition,dataIndex,slice1,Tslice1,slice2,Tslice2,priod,priod2,color1,color2,color3,color4)
  // RSIS(dataPosition,dataIndex,priods,colors)
{
// draw Iv_____FUNCTION
function IVCD(priod1,priod2,priod3,IV_Normal,dataIndex,IVCD_data){
  console.log("ivcd start:+++++++++++++++++++++++")
  if(!reviewModleCheckbox.checked && IVCD_data[0].length!=basicDataLength){
    for(var ii=0;ii<=pointIndex;ii++){
      // console.log("key   ","ii",ii)
      IVCD_g_data(priod1,priod2,priod3,IV_Normal,dataIndex,ii,IVCD_data)
      // console.log("##!!!!!!!!!!!!!!!!!!!!!##############################\n\n")
    }
  }else{
    IVCD_g_data(priod1,priod2,priod3,IV_Normal,dataIndex,pointIndex,IVCD_data)
  }
  IVCD_draw(IVCD_data,0)
  // IVCD_draw(IVCD_data,9)
  console.log("ivcd end:--------------------------")
}
// IVCD_g_data_____FUNCTION
function IVCD_g_data(priod1,priod2,priod3,IV_Normal,dataIndex,IVpointIndex,IVCD_data){
    // console.log("IVpointIndex",IVpointIndex)
    if(IVpointIndex>=IVCD_data[0].length-1 && IVpointIndex>=0){
      rawData = 0
      tempData = 0
      if(!reviewModleCheckbox.checked){
        if(IV_Normal == "iv"){
          rawData = responseLocal[2][IVpointIndex][dataIndex]
        }else if(IV_Normal == "normal"){
          rawData = responseLocal[1][IVpointIndex][dataIndex]
        }
      }else{
        if(IV_Normal == "iv"){
          rawData = VisibleData[2][VisibleData[2].length-1][dataIndex]
        }else if(IV_Normal == "normal"){
          rawData = VisibleData[1][VisibleData[1].length-1][dataIndex]
        } 
      }
      // console.log("regenal rawData",rawData)
      // MA1
      IVEMA(rawData,dataIndex,priod1,priod2,IVCD_data,0,IVpointIndex,IV_Normal)
      // MA2
      IVEMA(rawData,dataIndex,priod2,priod2,IVCD_data,1,IVpointIndex,IV_Normal)
      // DIF
      {tempData = 0
        if(IVpointIndex>=priod2-1) {
          tempData = IVCD_data[0][IVpointIndex]-IVCD_data[1][IVpointIndex] 
          tempData = Num_round(tempData,5);
        }
        if(IVpointIndex==IVCD_data[2].length-1){
          IVCD_data[2][IVpointIndex] = tempData
        }else if(IVpointIndex==IVCD_data[2].length){
          IVCD_data[2].push(tempData)
        }
      }
      // DEA
      IVEMA(IVCD_data[2][IVpointIndex],dataIndex,priod3,priod2,IVCD_data,3,IVpointIndex,IV_Normal)
      // // DIF - DIF
      // {tempData = 0
      //   tempData = IVCD_data[2][IVpointIndex]-IVCD_data[3][IVpointIndex] 
      //   tempData = Num_round(tempData * 10000) / 10000;
      //   if(IVpointIndex==IVCD_data[4].length-1){
      //     IVCD_data[4][IVpointIndex] = tempData
      //   }else if(IVpointIndex==IVCD_data[4].length){
      //     IVCD_data[4].push(tempData)
      //   }
      // }
    }
    // console.log("IVCD_data",IVCD_data)
}
// IVCD_draw_____FUNCTION
function IVCD_draw(IVCD_data,delay){
  IIF = deepCopyArray(IVCD_data[2].slice(startIndex,pointIndex+1))
  IEA = deepCopyArray(IVCD_data[3].slice(startIndex,pointIndex+1))
  IDS = deepCopyArray(IVCD_data[4].slice(startIndex,pointIndex+1))

  iStart = 0
  for(var i = 0;i<IEA.length;i++){
    if(IEA[i] == 0){iStart++;}
    else{break}
  }
  max = 0
  min = 0
  effort = IIF.slice(iStart,).concat(IEA.slice(iStart,))
  if(effort.length>0){
    max = Math.max.apply(null, effort);
    min = Math.min.apply(null, effort);    
  }
  // max = Math.max.apply(null, effort);
  // min = Math.min.apply(null, effort);    
  // console.log("effort",effort,"IIF",IIF)

  dict = Math.abs(parseInt((max-min)*100000)/100000)
  // console.log("iStart",iStart,"max",max,"min",min,"dict",dict)

  lineDataIIF = []
  lineDataIEA = []
  IIF.forEach(element => {
    lineDataIIF.push((Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,3)))
  });
  IEA.forEach(element => {
    lineDataIEA.push((Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,3)))
  });

  // console.log("lineDataIIF",lineDataIIF)
  // console.log("lineDataIEA",lineDataIEA)

  // IIF
  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "white";
  SUBctx.beginPath();
  SUBctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineDataIIF[iStart])
  for(var i = iStart;i<lineDataIIF.length;i++){
      SUBctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineDataIIF[i])
  };SUBctx.stroke();
  // IDA
  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "green";
  SUBctx.beginPath();
  SUBctx.moveTo(drawGap+(iStart+delay)*(drawGap+chartItemWidth)+chartItemWidth/2,lineDataIEA[iStart])
  for(var i = iStart;i<lineDataIEA.length-delay;i++){
    SUBctx.lineTo(drawGap+(i+delay)*(drawGap+chartItemWidth)+chartItemWidth/2,lineDataIEA[i])
  };SUBctx.stroke();
  
  // SUBctx.fillStyle = "red"
  // SUBctx.fillRect(0,0,100,100);
  // IIF-IEA
  width = 8
  for(var i = (iStart+delay);i<lineDataIEA.length;i++){
    data = 2*(lineDataIIF[i]-lineDataIEA[i-delay])
    if(data<0){SUBctx.fillStyle = "blue"}
    else{SUBctx.fillStyle = "red"}
    data = Math.abs(data)
    SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,SubchartHeight-data, width,data);
  }
}
// IVEMA_____FUNCTION
function IVEMA(raw,dataIndex,priod,priodMax,IVCD_data,Position,IVpointIndex,IV_Normal){
  tempData = 0
  priodForIf = priod
  if(priod<priodMax && Position!=0){priodForIf = priodMax}
  if(IVpointIndex>priodForIf-1){
    sf = 2/(priod+1)
    tempData = raw*sf + IVCD_data[Position][IVpointIndex-1]*(1-sf)
    // console.log("jisuan---",Position,"--",raw,"*",sf,"+",IVCD_data[Position][IVpointIndex-1],"*",(1-sf),"=",tempData,"IVpointIndex-1",IVpointIndex-1)
  }else if(IVpointIndex==priodForIf-1){
    if(Position==3){
      tempData = IVCD_data[Position-1][IVpointIndex]
    }else{
      sum = 0
      for(var i=IVpointIndex-priod+1;i<=IVpointIndex;i++){
        if(IV_Normal == "iv"){
          sum += responseLocal[2][i][dataIndex]
        }else if(IV_Normal == "normal"){
          sum += responseLocal[1][i][dataIndex]
        }
      }
      tempData = sum / priod
    }
  }
  // console.log("IVpointIndex,priodForIf-1",IVpointIndex,priodForIf)

  tempData = Num_round(tempData,5);
  if(IVpointIndex==IVCD_data[Position].length-1){
    IVCD_data[Position][IVpointIndex] = tempData
  }else if(IVpointIndex==IVCD_data[Position].length){
    IVCD_data[Position].push(tempData)
  }
}
// Num_round_____FUNCTION
function Num_round(num,dgree){
  num = num*(10**dgree)
  num = Math.round(num)
  num = num/(10**dgree)
  return num
}

// draw Iv_____FUNCTION
function MACD(data,dataIndex,indexStart,sumAverage1,sumAverage2,sumAverage3,fiveFlag,lastData,boxWidth,MACD_data){
  boxWidth = boxWidth/2
  // console.log("indexStart",indexStart)

  EMA1 = EMA(data,dataIndex,indexStart,sumAverage1,fiveFlag,0,MACD_data)[0]
  // console.log("MACD_data[0]",MACD_data[0])
  console.log("EMA1",EMA1)
  EMA2 = EMA(data,dataIndex,indexStart,sumAverage2,fiveFlag,1,MACD_data)
  DIF = EMA2[1]
  DEA = EMA2[2]
  EMA2 = EMA2[0]
  console.log("EMA2",EMA2)
  console.log("DIF", DIF)
  console.log("DEA", DEA)

  iStart = 0
  for(var i = 0;i<EMA2.length;i++){
    if(EMA2[i] == 0){iStart++;}
    else{break}
  }

  max = 0
  min = 0
  max = Math.max.apply(null, DIF.concat(DEA));
  min = Math.min.apply(null, DIF.concat(DEA));
  dict = Math.abs(parseInt((max-min).toFixed(4)*100000)/100000)
  console.log("max",max,"min",min,"dict",dict)






   
  lineDataDIF = []
  lineDataDEA = []

  DIF.forEach(element => {
    lineDataDIF.push(2*(Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,2)))
  });
  console.log("lineDataDIF",lineDataDIF)

  DEA.forEach(element => {
    lineDataDEA.push(2*(Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,2)))
  });
  console.log("lineDataDEA",lineDataDEA)









  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "black";
  SUBctx.beginPath();
  dataIndex = 0
  console.log("iStart",iStart)
  SUBctx.moveTo(2*(5+iStart*20+boxWidth / 2),lineDataDIF[iStart])
  for(var i = iStart;i<lineDataDIF.length;i++){
      SUBctx.lineTo(2*(5+i*20+boxWidth / 2),lineDataDIF[i])
  };
  SUBctx.stroke();

  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "green";
  SUBctx.beginPath();
  dataIndex = 0
  SUBctx.moveTo(2*(5+iStart*20+boxWidth / 2),lineDataDEA[iStart])
  for(var i = iStart;i<lineDataDEA.length;i++){
      SUBctx.lineTo(2*(5+i*20+boxWidth / 2),lineDataDEA[i])
  };
  SUBctx.stroke();

// author: moogiegik
  // boxWidth = boxWidth*2
  SUBctx.fillStyle = "red"
  for(var i = iStart;i<lineDataDEA.length;i++){
    // SUBctx.fillStyle = volumeData[index][1];
    data = 2*(lineDataDIF[i]-lineDataDEA[i])
    // console.log("lineDataDIF",lineDataDIF[i],"lineDataDEA",lineDataDEA[i],"data",data)
    if(data<0){SUBctx.fillStyle = "red"}
    else{SUBctx.fillStyle = "blue"}
    data = Math.abs(data)
    // console.log("final",2*SubchartHeight-2*(lineDataDIF[i]-lineDataDEA[i]))
    // SUBctx.fillRect(2*(4.5+i*20), 2*SubchartHeight-data, 5,data);
    SUBctx.fillRect(2*(boxWidth-2.5+i*20), 2*SubchartHeight-data, 5,data);
    // console.log(2*(4.5+i*20), 2*SubchartHeight-data, boxWidth,data)
  }
}
// draw Iv_EMA_____FUNCTION 
// (Kdata,dataIndex=10,maxV,offsetX,average,sumAverage=5,20,"#0000FF",fiveFlag)
function EMA(data,dataIndex,indexStart,sumAverage,fiveFlag,MACDposition,MACD_data){
  // console.log(data)
  if(MACD_data[MACDposition].length<sumAverage){
    // console.log("push zeros")
    for(var i = 0;i<sumAverage-1;i++){
      MACD_data[MACDposition].push(0)
      if(MACDposition==1){
        MACD_data[2].push(0)
        MACD_data[3].push(0)
      }
    }
    MACD_data[MACDposition].push(data[sumAverage-1][dataIndex])
    if(MACDposition==1 && MACD_data[0].length >= sumAverage-1){
      // console.log("NNNNNN",MACD_data[0])
      // console.log("NNNNNN",MACD_data[0][sumAverage-1],MACD_data[1][sumAverage-1],MACD_data[0].length,MACD_data[1].length)
      // // MACD_data[2].push(100)
      // // MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      // // MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
    }
  }
  // console.log("oooo",MACD_data[0].length,sumAverage)
  // console.log("MACD_dataM",MACD_data)

  if(MACDposition==1 && MACD_data[0].length == sumAverage){
    // console.log("NNMNNN",MACD_data[0][sumAverage-1],MACD_data[1][sumAverage-1])
    MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
    MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
  }

  indexEnd = offsetX+KdataVisible.length-1
  if(indexEnd>data.length-1){indexEnd = data.length-1}
  // console.log("EMA indexEnd",indexEnd)

  if(indexEnd>MACD_data[MACDposition].length-1){
    Kbase = sumAverage+1
    K2 = 2/Kbase
    K11 = 1-K2
    EMAData = []
    // console.log("EMA Kbase",Kbase)
    if(newIndexStart=MACD_data[MACDposition].length-1){
      // console.log("the",newIndexStart,MACD_data[MACDposition].length,indexEnd)
      newIndexStart = MACD_data[MACDposition].length
    }
    // console.log("new in section",newIndexStart,indexEnd)

    for( ;newIndexStart<=indexEnd;newIndexStart++){
      // console.log("rst:",data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11,"rsc:","two",data[newIndexStart][dataIndex],"eleven",MACD_data[newIndexStart-1],"on",data[newIndexStart])
      if(MACDposition==1){
      // console.log("EM2CHECK","r",data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11,"n",data[newIndexStart][dataIndex],"p",MACD_data[MACDposition][newIndexStart-1])
      }
      MACD_data[MACDposition].push(data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11)
      //DIF
      if(MACDposition==1){
        MACD_data[2].push(MACD_data[0][newIndexStart]-MACD_data[1][newIndexStart])
        MACD_data[3].push(MACD_data[2][newIndexStart]*0.2+MACD_data[2][newIndexStart-1]*0.8)
      }
    }
  }

  EMAData = deepCopyArray(MACD_data[MACDposition].slice(indexStart,indexEnd+1))
  dif = []
  dea = []
  if(MACDposition==1){
    dif = deepCopyArray(MACD_data[2].slice(indexStart,indexEnd+1))
    dea = deepCopyArray(MACD_data[3].slice(indexStart,indexEnd+1))
  }
  return [EMAData,dif,dea]
}
// draw IV_SMA_____ITEM FUNCTION
function SMA_wasted(data,dataIndex,indexStart,sumAverage,fiveFlag,lastData){
  SMAData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<sumAverage-1){
    SMAData.push(0)
    indexStart += 1
  }
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    sum = 0
    for(var i = indexStart+1-sumAverage;i<indexStart+1;i++){
      sum += data[i][dataIndex]
    }
    SMAData.push(sum)
    indexStart+=1
  }
  if(fiveFlag && dataIndex<5){
    indexEnd++
    if(indexStart<indexEnd-1){
      sum = 0
      for(var i = indexStart+1-sumAverage;i<indexStart;i++){
        sum += data[i][dataIndex]
      }
      sum += lastData[dataIndex]
      SMAData.push(sum)
    }
  }
  return SMAData
}

// 5分钟
// draw five minutes line_____FUNCTION
function fiveMinsLine(dataRaw,index,cutoutt=true){
  data = []
  data2 = []
  data.push(dataRaw[1])
  for (i = 1; i < dataRaw.length; i+=5) {
    if(dataRaw[i+index]==0){break;}
    data.push(dataRaw[i+index])
    data2.push(dataRaw.slice(i,i+5))
    if(data.length>=subEndIndex+1 && cutoutt ){break;}
  } 
  // console.log("data,data.length,subEndIndex,subEndIndex+1",data,data.length,subEndIndex,subEndIndex+1);

  max = data[0]
  min = data[0]
  for (i = 0; i < data.length; i++) {
    if(data[i]>max){max = data[i]}
    if(data[i]<min){min = data[i]}
  }
  if(max==min){
    max = 1.5*max
    min = 0.5*min
  }
  average = Num_round((MainchartHeight) / (max - min),4)
  gap = MainchartWidth/(subDataLength-1)

  MinsLinecanvas.height = Math.ceil(MainchartHeight) 
  MinsLinecanvas.width = MainchartWidth

  MinsLinectx.lineWidth = 1.5
  MinsLinectx.strokeStyle = "white"

  MinsLinectx.fillRect(0,0,MainchartWidth,MainchartHeight)

  MinsLinectx.beginPath()
  data[0] = Num_round((MainchartHeight) - (data[0]-min)*average,1)
  MinsLinectx.moveTo(0,data[0])
  
  // console.log("fiveMinsLine data.length,data",data.length,data)
  for(var i = 1;i<data.length;i++){
    data[i] =  Num_round((MainchartHeight) - (data[i]-min)*average,1)
    MinsLinectx.lineTo(i*gap,data[i])
  }
  MinsLinectx.stroke()

  if(subEndIndex<48){
    data2.unshift(dataRaw[0])
    console.log("getStockTempIV","subEndIndex",subEndIndex,"++++++++++++++++++++++")
    $.ajax({
      url: '/getStockTempIV',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"data":[data2],"type":dayWeekChoice}),  // 打包为JSON格式
      success: function(response) {
        // console.log("response",response)
        TempIv = response
        // console.log("getStockTempIV  TempIv[0]",TempIv[0])
        // console.log(TempIv);
        // draw
        refreshDraw(IndexsSwitch);
      },
      error: function(error) {
          console.log("getStockTempIV wrong",error)
          TempIv = []
      }
    });
  }
}
// 聚焦信息
// draw focus item info_____FUNCTION
function crossInfo(crossIdx,visibleMax){
  // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  //        11,pcfNcfTTM, 12,isST, 13,preclose")
  // console.log(VisibleData[1][crossIdx])
  text = ""
  text += "<div><b>日期："+VisibleData[1][crossIdx][0]
  text += "\n开盘："+VisibleData[1][crossIdx][1]
  text += "\n最高："+VisibleData[1][crossIdx][3]
  text += "\n最低："+VisibleData[1][crossIdx][4]  

  if (crossIdx > 0) {
    if (VisibleData[1][crossIdx][2] > VisibleData[1][crossIdx - 1][2]) {
        text += '<span style="color: #FF2222;">';
    } else if (VisibleData[1][crossIdx][2] < VisibleData[1][crossIdx - 1][2]) {
        text += '<span style="color: rgb(41, 158, 12);">';
    } else {
        text += '<span style="color: grey;">';
    }
  }else{
      text += "<span>";
  }
  // console.log(((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100)
  // console.log((((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100).toFixed(3))
  // text += "\n\n涨跌："+(((VisibleData[1][crossIdx][2]-VisibleData[1][crossIdx - 1][2])/VisibleData[1][crossIdx - 1][2])*100).toFixed(3) + "%"

  text += "\n涨跌："+ VisibleData[1][crossIdx][7] + "%\n"
  text += "\n收盘："+VisibleData[1][crossIdx][2] +"</span>" + "</div>"

  text += "<div>\n\nQ  1："+VisibleData[2][crossIdx][Bx_On_Use[0]]
  text += '<span style="color: rgb(188, 146, 7);">'+"\nMDL："+VisibleData[2][crossIdx][Bx_On_Use[1]]+"</span>"
  text += "\nQ  3："+VisibleData[2][crossIdx][Bx_On_Use[2]]
  text += "\nMIN："+VisibleData[2][crossIdx][Bx_On_Use[3]]
  text += "\nMAX："+VisibleData[2][crossIdx][Bx_On_Use[4]] + "</div>"
  text += "\n成交："+VisibleData[1][crossIdx][5]
  text += "\n换手："+VisibleData[1][crossIdx][6] + "%"
  // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  //        11,pcfNcfTTM, 12,isST, 13,preclose")
  switch (true) {
    case VisibleData[1][crossIdx][13]<20:
      text += '<span style="color: red;">\n市盈：'+VisibleData[1][crossIdx][13] +"</span>"
      break
    case VisibleData[1][crossIdx][13]>20 && VisibleData[1][crossIdx][13]<40:
      text += '<span style="color: orangered;">\n市盈：'+VisibleData[1][crossIdx][13] +"</span>"
      break
    default:
      text += '<span style="color: rgb(41, 158, 12);">\n市盈：'+VisibleData[1][crossIdx][13] +"<b></span>"
  }
  text += "\n市盈："+VisibleData[1][crossIdx][8] + "%"
  text += "\n市净："+VisibleData[1][crossIdx][9] + "%"
  text += "\n市销："+VisibleData[1][crossIdx][10] + "%"

  if(crossIdx>=(windowLength/2)){
    CrossInfo.style.right = ""
    CrossInfo.style.left = "0"
    CrossInfo.innerHTML = text
  }else{
    // CrossInfo.style.whiteSpace = 'pre';
    CrossInfo.style.left = ""
    CrossInfo.style.right = "0"
    CrossInfo.innerHTML = text
  }
}
function clearMChart(){
  CrossInfo.innerHTML = ""
  MinsLinectx.fillRect(0,0,MainchartWidth,MainchartHeight)
}
// 连跌
// draw Consecutives _____FUNCTION
function Consecutive(data,KdataVisibleHeighted,dataIndex,maxPV,indexStart,boxWidth){
  indexStartCpoy = indexStart
  boxWidth = boxWidth/2
  lineData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  if(indexStart<=maxPV){
    indexStart = 1
  }else{
    indexStart=indexStart-maxPV+1
  }
  // console.log("start",indexStart,indexStartCpoy)
  fit = 0
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    if(data[indexStart][dataIndex]>data[indexStart-1][dataIndex]){
      if(fit<0){fit=0}
      fit++
    }
    else if(data[indexStart][dataIndex]<data[indexStart-1][dataIndex]){
      if(fit>0){fit=0}
      fit--
    }
    // console.log("in",indexStart,indexStartCpoy,fit)
    if(fit >=maxPV){
      // console.log("连涨",fit,indexStart)
      MAINctx.beginPath();
      MAINctx.strokeStyle = "red"
      for(var i = 0;i<fit;i++){
        MAINctx.arc(2*(4.75+(indexStart-indexStartCpoy-i)*20+boxWidth / 2), KdataVisibleHeighted[indexStart-indexStartCpoy][2], 2, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50

      }
      MAINctx.stroke();
    }
    else if(fit <=-maxPV){
      // console.log("连跌",fit,indexStart)
      MAINctx.beginPath();
      MAINctx.strokeStyle = "green"
      for(var i = 0;i<-fit;i++){
        MAINctx.arc(2*(4.75+(indexStart-indexStartCpoy-i)*20+boxWidth / 2), KdataVisibleHeighted[indexStart-indexStartCpoy][3], 2, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
      }
      MAINctx.stroke();
    }
    indexStart+=1
  }
}
// 九转
// draw Nine turns _____FUNCTION
function magic9turns(data,KdataVisibleHeighted,dataIndex,maxPV,indexStart,reference,boxWidth){
  indexStartCpoy = indexStart
  boxWidth = boxWidth/2
  lineData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<reference){
    indexStart += 1
  }
  turnProgress = 0
  // console.log("kaishi",indexStart,indexStart-indexStartCpoy)
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    // console.log("turnProgress",turnProgress,reference,data[indexStart-reference][dataIndex],data[indexStart][dataIndex])
    if(data[indexStart-reference][dataIndex]<data[indexStart][dataIndex]){
      turnProgress++
      if(turnProgress<=0){turnProgress=1}
    }
    else if(data[indexStart-reference][dataIndex]>data[indexStart][dataIndex]){
      turnProgress--
      if(turnProgress>=0){turnProgress=-1}
    }
    
    // console.log("turnProgress",turnProgress)
    if(turnProgress >=maxPV){
      // console.log("该跌",turnProgress)
      MAINctx.beginPath();
      MAINctx.strokeStyle = "blue"
      for(var i = 0;i<turnProgress;i++){
        MAINctx.arc(2*(4.75+(indexStart-indexStartCpoy-i)*20+boxWidth / 2), KdataVisibleHeighted[indexStart-indexStartCpoy][2], 4, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
      }
      MAINctx.stroke();
      // turnProgress=0
    }
    else if(turnProgress <=-maxPV){
      // console.log("该涨",turnProgress)
      MAINctx.beginPath();
      MAINctx.strokeStyle = "red"
      for(var i = 0;i<-turnProgress;i++){
        MAINctx.arc(2*(4.75+(indexStart-indexStartCpoy-i)*20+boxWidth / 2), KdataVisibleHeighted[indexStart-indexStartCpoy][3], 4, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
      }
      MAINctx.stroke();
      // turnProgress=0
    }
    indexStart+=1
  }
}
// volume成交量
// draw volume line_____FUNCTION
function Volume(width,dataIndex,averangeDraw,saveTo=Volume_G_data){
  console.log("Volume start:+++++++++++++++++++++++")
  Volume_G_data = []
  var volumeData = []
  for(var i = 0;i<VisibleData[1].length;i++){
    volumeData.push(VisibleData[1][i][dataIndex])
  }
  // console.log("volumeData",volumeData)
  max = Math.max.apply(null, volumeData);
  for(var i = 0;i<volumeData.length;i++){
    color = (function(){
      if(VisibleData[1][i][2]>=VisibleData[1][i][1])return "#DD1144"
      else return "#00FFFF"
    })()
    var heightData = Num_round((volumeData[i]/max)*SubchartHeight,2)
    // console.log("heightData",heightData,"i",i)
    SUBctx.fillStyle = color;
    SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2, SubchartHeight-heightData, width,heightData);
  }
  Volume_G_data.push(volumeData)
  if(averangeDraw == "draw"){
    Vaverage = Num_round(SubchartHeight / (max - 0),15)
    // console.log("Vaverage",Vaverage,"SubchartHeight",SubchartHeight,(max - 0),(max - 0));
    drawAverageLine(5,1,5,0,Vaverage,"#FFFF00",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
    drawAverageLine(10,1,5,0,Vaverage,"#FF00FF",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
  }
  console.log("Volume end:--------------------------")
  // console.log("Volume_G_data volumeData",volumeData)
  return max
}
// volume average line 成交量均线
// draw volume average line_____FUNCTION
function drawAverageLineVolume(data,dataIndex,maxPV,indexStart,heightAverage,sumAverage,boxWidth,color,fiveFlag){
  boxWidth = boxWidth/2
  lineData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<sumAverage-1){
    lineData.push(0)
    indexStart += 1
  }
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    sum = 0
    for(var i = indexStart+1-sumAverage;i<indexStart+1;i++){
      sum += data[i][dataIndex]
    }
    lineData.push(2*(Num_round(SubchartHeight - SubchartHeight*(sum/sumAverage)/maxPV,2)))
    indexStart+=1
  }

  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = color;
  SUBctx.beginPath();
  dataIndex = 0
  // console.log("4th",lineData)
  while(lineData[dataIndex]==0){dataIndex+=1}
  SUBctx.moveTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
  dataIndex+=1
  while(dataIndex<lineData.length){
    SUBctx.lineTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
    dataIndex+=1
  }
  SUBctx.stroke();
}
// average line 均线
// draw price average line_____FUNCTION
function drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type,saveTo=null){
  console.log("drawAverageLine "+drawFlag+"  "+type+" start:+++++++++++++++++++++++")
{
  dataRaw = []
  if(type == "normal"){
    sum = 0  
    // get raw data as array
    for(var i = startIndex;i<=pointIndex;i++){
      sum = 0
      if(i>=sumPriod-1){
        for(var ii=i-sumPriod+1;ii<=i;ii++){
          sum+=responseLocal[dataPosition][ii][dataIndex]
          // console.log("anverage plus",responseLocal[dataPosition][ii],responseLocal[dataPosition][ii][dataIndex])
        }
      }
      if(i==pointIndex && i>=sumPriod-1){
        sum -= responseLocal[dataPosition][pointIndex][dataIndex]
        sum += VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]
        // console.log("anverage replace",VisibleData[dataPosition][VisibleData[dataPosition].length-1])
      }
      // console.log("sum/sumPriod",Num_round(sum,3)/sumPriod,"sum",sum,"sumPriod",sumPriod)
      // console.log("\n!??????????????????????????????##########################\n")
      dataRaw.push(Num_round(sum,3)/sumPriod)
    }
      // lineDataIIF.push((Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,3)))
      // temp.push(Num_round(MainchartHeight - (VisibleData[1][i][j]-minPrice)*MCaverage,1))
  }
  else if(type == "bbi"){dataRaw = BBI(3,6,12,24,1,2)}
}
// select
if (!(saveTo == null)) {
  saveTo.push(dataRaw)
}
if(drawFlag=="draw"){
  // drawLineToCTX(dataRaw,Min,Ctx,CtxHeight,CAverage,color)

  // heighted
  var lineData = []
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i]!=0){
      lineData.push(Num_round(CtxHeight - (dataRaw[i]-Min)*CAverage,3))
    }else{lineData.push(0)}
  };
  // console.log("dataRaw",dataRaw,"lineData",lineData,"Min",Min,"CAverage",CAverage)
  // istart
  var iStart = 0
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i] == 0){iStart++;}
    else{break}
  }
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  dataIndex+=1
  for(var i = iStart;i<dataRaw.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
  console.log("drawAverageLine end:--------------------------")
  return dataRaw
}
// BBI used on drawAverageLine
function BBI(sumPriod1,sumPriod2,sumPriod3,sumPriod4,dataPosition,dataIndex){
  //sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag)
  MA1 = drawAverageLine(sumPriod1,dataPosition,dataIndex,null,null,null,null,null,"undraw","normal")
  MA2 = drawAverageLine(sumPriod2,dataPosition,dataIndex,null,null,null,null,null,"undraw","normal")
  MA3 = drawAverageLine(sumPriod3,dataPosition,dataIndex,null,null,null,null,null,"undraw","normal")
  MA4 = drawAverageLine(sumPriod4,dataPosition,dataIndex,null,null,null,null,null,"undraw","normal")
  // console.log("MA1,MA2,MA3,MA4",MA1,MA2,MA3,MA4);
  MA = []
  iStart = 0
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i] == 0){iStart++;MA.push(0)}
    else{break}
  }
  for(var i=iStart;i<MA1.length;i++){
    // MA.push(Num_round((MA1[i]+MA2[i]+MA3[i]+MA4[i])/4,3))
    MA.push(((MA1[i]+MA2[i]+MA3[i]+MA4[i])/4))
  }
  // console.log("MA",MA);
  return MA
}
// BTX
function BTX(dataPosition,dataIndex,type){
  Rwadata = [[],[]]
{
  // pre five
  for(var i = startIndex-5;i<=startIndex;i++){
    if(i>0){
      Rwadata[0].push(Num_round(responseLocal[dataPosition][i][dataIndex]-responseLocal[dataPosition][i-1][dataIndex],3))
    }else{
      Rwadata[0].push(0)
    }
    Rwadata[1].push(0)
  }
  console.log("BTX pre Rwadata",Rwadata)
  for(var i = 1;i<VisibleData[dataPosition].length;i++){
      Rwadata[0].push(Num_round(VisibleData[dataPosition][i][dataIndex]-VisibleData[dataPosition][i-1][dataIndex],3))
      Rwadata[1].push(0)
  }
  console.log("BTX full pre Rwadata",Rwadata)
}
{
  if(type == "increace" ){
    var max = 0
    if(Rwadata[0].length>0){
      var max1 = 0
      max = Math.max.apply(null, Rwadata[0]);
      max1 = Math.min.apply(null, Rwadata[0]);
      if(max<-max1){max=-max1}
      console.log("max",max,"max1",max1)
    }
    // width = chartItemWidth
    width = 8
    for(var i = 5;i<Rwadata[0].length;i++){
      if(Rwadata[0][i]<0){SUBctx.fillStyle = "#00FFFF"}
      else{SUBctx.fillStyle = "red"}
      SUBctx.fillRect(drawGap+(i-5)*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,0, width,Num_round(SubchartHeight*(Math.abs(Rwadata[0][i]))/max,3));
    }
  }
}
{
  if(type == "btx" ){
  {
    var v = 0
    pointOn = 0
    turnF = 0

    for(var i = 1;i<Rwadata[0].length;i++){
      turnF--
      v = Rwadata[0][i]
      // turn //condition：(pointOn==0 && v<0)to blue  (pointOn==1 && v>0)to red
      vd1 = Rwadata[pointOn][i-1]
      console.log("BTX start ++++++++++++++","pointOn",pointOn,"v",v,"vd1",vd1)//,responseLocal[dataPosition][startIndex+i-5][0])
      // red to blue
      if(pointOn==0){
        if(v<0){
          if(-v>vd1 || (function(){if(turnF>0 && v<0){turnF=0;if(-v==vd1){v=v*2};v=v-vd1;return true}else{return false}}())){
          // if(-v>vd1){
            Rwadata[0][i] = vd1
            Rwadata[1][i] = -v
            
            pointOn = 1
            // console.log("To B R",Rwadata[0][i],Rwadata[1][i])
          }else if(-v<=vd1){
            Rwadata[0][i] = -v
            // console.log("To B F",Rwadata[0][i],Rwadata[1][i])
            turnF = 2
            // console.log("next push",turnF)
          }
        }else if(v>=0){
          if(Rwadata[0][i]==0){Rwadata[0][i]=0.005}
          // console.log("Keep R",Rwadata[0][i],Rwadata[1][i])
        }
      }
      // blue to red
      else if(pointOn==1){
        if(v>0){
          // console.log("turnF",turnF,function(){if(turnF>0 && v>0){turnF=0;return true}else{return false}}(),"turnF",turnF)
          // console.log("turnF",turnF)
          if(v>vd1 || (function(){if(turnF>0 && v>0){turnF=0;if(-v==vd1){v=v*2};v=v+vd1;return true}else{return false}}())){
          // if(v>vd1 || (turnF>0 && v>0)){
          // if(v>vd1 || (turnF>0 && v>0)){
            Rwadata[0][i] = v
            Rwadata[1][i] = v+vd1
            pointOn = 0
            // console.log("To R R",Rwadata[0][i],Rwadata[1][i])
          }else if(v<=vd1){
            Rwadata[1][i] = v
            Rwadata[0][i] = 0
            // // if(i+1<Rwadata[0].length){if(Rwadata[0][i+1]>0){Rwadata[0][i+1]=Rwadata[0][i+1]+v}}
            // console.log("To R F",Rwadata[0][i],Rwadata[1][i])
            turnF = 2
            // console.log("next push",turnF)
          }
        }else if(v<=0){
          Rwadata[1][i] = -v
          Rwadata[0][i] = 0
          if(Rwadata[1][i]==0){Rwadata[1][i]=0.005}
          // console.log("Keep B",Rwadata[0][i],Rwadata[1][i])
        }
      }
      console.log("BTX end ------------------------------------------")
    }
    // console.log("BTX",Rwadata)
  }
  {
    var max = 0
    if(Rwadata[0].length>0){
      var max1 = 0
      max = Math.max.apply(null, Rwadata[0]);
      max1 = Math.max.apply(null, Rwadata[1]);
      if(max<max1){max=max1}
      console.log("max",max,"max1",max1)
    }

    Drawdata = [[],[]]
    Rwadata[0].forEach(element => {
      if (element>0) {
        Drawdata[0].push((Num_round(SubchartHeight*(element)/max,3)))
      }else{Drawdata[0].push(-1)}
    });

    Rwadata[1].forEach(element => {
      if (element>0) {
        Drawdata[1].push((Num_round(SubchartHeight*(element)/max,3)))
      }else{Drawdata[1].push(-1)}
    });
    // console.log("BTX Drawdata",Drawdata)
    width = 8

    SUBctx.fillStyle = "#00FFFF"
    for(var i = 5;i<Drawdata[0].length;i++){
      if(Drawdata[1][i]>0){
        if(Drawdata[0][i]>0){SUBctx.fillStyle = "#287f52"}else{SUBctx.fillStyle = "purple"}
        SUBctx.fillRect(drawGap+(i-5)*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,0, width,Drawdata[1][i]);}
    }    
    SUBctx.fillStyle = "red"
    for(var i = 5;i<Drawdata[0].length;i++){
      if(Drawdata[0][i]>0){
        if(Drawdata[1][i]>0){SUBctx.fillStyle = "yellow"}else{SUBctx.fillStyle = "red"}
        SUBctx.fillRect(drawGap+(i-5)*(drawGap+chartItemWidth)+chartItemWidth/2-width/2,0, width,Drawdata[0][i]);}
    }

  }
  }
}
}
// BIAS_QL_old
function BIAS_QL_old(dataPosition,dataIndex,MAn,color1,color2){
  var MANP = MANPof(dataPosition,dataIndex,dataIndex,MAn)
  var BIAS = []
  var BIASMA = []
{
  for(var i = 0;i<MANP[0].length;i++){
    BIAS.push(Num_round((MANP[1][i]-MANP[0][i])/MANP[0][i]*100,3))
  }
  var sum = 0
  for(var i = MAn;i<BIAS.length;i++){
    sum = 0
    if(i>=MAn-1){
      for(var ii=i-MAn+1;ii<=i;ii++){
        sum+=BIAS[ii]
      }
    }
    BIASMA.push(Num_round(sum/MAn,3))
    console.log("sum",sum,"BIASMA",Num_round(sum/MAn,3))
  }
  BIAS = BIAS.splice(MAn);
  console.log("MAN",MANP,"BIAS",BIAS,"BIASMA",BIASMA)
}
{
  // 
  var iStart = 0
  for(var i = 0;i<MANP[0].length;i++){
    if(MANP[0][i] == 0){iStart++;}
    else{break}
  }
  if(iStart<=MAn){iStart=0}
  else{iStart=iStart-MAn}
  {//use drawLineToCTX example
  var Min = Math.min.apply(null, BIAS);    
  var Max = Math.max.apply(null, BIAS);    
  var avrg = Num_round(SubchartHeight / (Max - Min),4)

  drawLineToCTX(BIAS,Min,iStart,SUBctx,SubchartHeight,avrg,color1)
  drawLineToCTX(BIASMA,Min,iStart,SUBctx,SubchartHeight,avrg,color2)
  }
}
}
// used in BIAS_QL_old
function MANPof(dataPosition,dataIndex,dataIndex2,MAn){
  var dataRaw = []
  var dataRaw2 = []
  var sum = 0
  var i = startIndex-MAn
  if(i<0){i = 0}
  // console.log("MANof","i",i,"startIndex",startIndex,"MAn",MAn)

  for( i ;i<=pointIndex;i++){
    sum = 0
    data2 = 0
    if(i>=MAn-1){
      for(var ii=i-MAn+1;ii<=i;ii++){
        sum+=responseLocal[dataPosition][ii][dataIndex]
        // console.log("MA",sum)
        // console.log("anverage plus",responseLocal[dataPosition][ii],responseLocal[dataPosition][ii][dataIndex])
      }
    }
    data2 = responseLocal[dataPosition][i][dataIndex2]
    if(i==pointIndex && i>=MAn-1){
      sum -= responseLocal[dataPosition][pointIndex][dataIndex]
      sum += VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]
      // console.log("MA",sum)

      data2 = VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex2]
      // console.log("anverage replace",VisibleData[dataPosition][VisibleData[dataPosition].length-1])
    }
    dataRaw.push(Num_round(sum,3)/MAn)
    dataRaw2.push(data2)
  }
  return [dataRaw,dataRaw2]
}

function drawLineToCTX_old(data,Min,iStart,Ctx,CtxHeight,CAverage,color){
    // heighted
    var lineData = []
    for(var i = 0;i<data.length;i++){
      lineData.push(Num_round(CtxHeight - (data[i]-Min)*CAverage,3))
      // console.log("lineData[i]",lineData[i],"BIAS[i]-Min",BIAS[i]-Min,"avrg",avrg)
    };
    // console.log("lineData",lineData,"Max",Max,"Min",Min,"avrg",avrg)
    Ctx.lineWidth = 2;
    Ctx.strokeStyle = color;//#FF5C5C
    Ctx.beginPath();
    Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
    for(var i = iStart;i<lineData.length;i++){
      Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
    };Ctx.stroke();
}
function drawLineToCTX(data,Min,Ctx,CtxHeight,CAverage,color){
  // heighted
  var lineData = []
  var iStart = 0
  for(var i = 0;i<data.length;i++){
    if(Number.isNaN(data[i])){lineData.push(NaN)}
    else{lineData.push(Num_round(CtxHeight - (data[i]-Min)*CAverage,3))}
  };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("lineData",lineData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;//#FF5C5C
  // console.log("Ctx",Ctx)
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  for(var i = iStart;i<lineData.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
function drawStickToCTX(data,Ctx,CtxHeight,CAverage,colors,times,width,offset){
  // heighted
  var stickData = 0
  var iStart = 0
  // for(var i = 0;i<data.length;i++){
  //   if(Number.isNaN(data[i])){stickData.push(NaN)}
  //   else{stickData.push(Num_round((CtxHeight - (data[i]-Min)*CAverage),3))}
  // };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("stickData",stickData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  // console.log("colors",colors)
  for(var i = iStart;i<data.length;i++){
    stickData = data[i]
    // color
    if(stickData>0){Ctx.fillStyle = colors[2]}
    else if(stickData==0){Ctx.fillStyle = colors[1]}
    else{Ctx.fillStyle = colors[0]}    
    stickData = Math.abs(Num_round(((data[i])*CAverage*times),3))
    // console.log("stickData",stickData)
    // ++++
    // +++-
    // ++--
    // +---
    // ----
    Ctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2+offset,CtxHeight-stickData, width,stickData);

  }

}
// RSV
function RSV(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod){
  // console.log("dataPosition",dataPosition,"InnerDataIndex",InnerDataIndex,"slice1",slice1,Tslice1,"slice2",slice2,Tslice2)
  console.log("\n\nRSV start ++++++++++++++++++++++++++++++++++++++++++++")

  var dataR = []
  for(var i = startIndex-priod-1;i<startIndex+VisibleData[dataPosition].length-1;i++){
    if(i>=0){
      dataR = dataR.concat(responseLocal[dataPosition][i].slice(slice1,Tslice1))
      dataR = dataR.concat(responseLocal[dataPosition][i].slice(slice2,Tslice2))
    }else{
      dataR = dataR.concat(responseLocal[dataPosition][0].slice(slice1,Tslice1))
      dataR = dataR.concat(responseLocal[dataPosition][0].slice(slice2,Tslice2))
    }
  }
  dataR = dataR.concat(VisibleData[dataPosition][VisibleData[dataPosition].length-1].slice(slice1,Tslice1))
  dataR = dataR.concat(VisibleData[dataPosition][VisibleData[dataPosition].length-1].slice(slice2,Tslice2))

  var RSV_ = []
  var Cn = 0
  var Ln = 0
  var Hn = 0
  var itemLength = Tslice1-slice1+Tslice2-slice2
  // console.log("dataR",dataR,"itemLength",itemLength)
  // console.log("first ------",dataR.slice((priod+1)*itemLength,(priod+1)*itemLength+4))
  for(var i = (priod+1)*itemLength;i<dataR.length;i=i+itemLength){
    // console.log("FROM i",i-40,"TO i+priod*itemLength",i,"Cn ON",i+InnerDataIndex)
    Cn = dataR[i+InnerDataIndex]
    Ln = Math.min.apply(null, dataR.slice(i-40,i));
    Hn = Math.max.apply(null, dataR.slice(i-40,i));
    // console.log("Cn",Cn,"Ln",Ln,"Hn",Hn,"(Cn-Ln)/(Hn-Ln)*100",Num_round((Cn-Ln)/(Hn-Ln)*100,3))
    RSV_.push(Num_round((Cn-Ln)/(Hn-Ln)*100,3))
    // console.log("Cn",Cn,"Hn",Hn,"Ln",Ln)

  }
  // console.log("RSV_",RSV_)

  console.log("RSV end --------------------------------------------")
  return RSV_
}
// KD
function NKD(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod,priod2,color1,color2,color3,color4){
  console.log("\n\nKD start ++++++++++++++++++++++++++++++++++++++++++++")

  var RSV_ = RSV(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod)
  // console.log("RSV_",RSV_)
  var K = [50]
  var D = [50]
  var J = [50]
  var S = [50,50,50,50,50]

  // D.push(RSV_[0])
  var seconedThree = Num_round((priod2-1)/priod2,4)
  var firstThree = 1-seconedThree
  // var seconedThree = 0.6667
  // var firstThree = 0.3333
  for(var i =1;i<RSV_.length;i++){
    K.push(Num_round(seconedThree*RSV_[i-1]+firstThree*RSV_[i],2))
    D.push(Num_round(seconedThree*D[i-1]+firstThree*K[i],2))
    J.push(Num_round((priod2)*K[i]-(priod2-1)*D[i],2))
  }
  for(var i =5;i<K.length;i++){
    Ksum = K[i-2]+K[i-1]+K[i]
    S.push(Num_round(Ksum/3,2))
  }
  // console.log("K",K)
  // console.log("D",D)
  // console.log("J",J)
  // console.log("S",S)
  {
    // K.shift()
    // D.shift()
    var Min = Math.min.apply(null, K);
    var avrg = Math.min.apply(null, D)
    if(Min>avrg){Min=avrg}
    // var avrg = Math.min.apply(null, J)
    // if(Min>avrg){Min=avrg}
    var avrg = Math.min.apply(null, S)
    if(Min>avrg){Min=avrg}

    var Max = Math.max.apply(null, K);
    avrg = Math.max.apply(null, D)
    if(Max<avrg){Max=avrg}
    // avrg = Math.max.apply(null, J)
    // if(Max<avrg){Max=avrg}
    avrg = Math.max.apply(null, S)
    if(Max<avrg){Max=avrg}

    avrg = Num_round(SubchartHeight / (Max - Min),4)

    // console.log("Min",Min,"Max",Max,"avrg",avrg)

    drawLineToCTX_old(K,Min,5,SUBctx,SubchartHeight,avrg,color1)
    drawLineToCTX_old(D,Min,5,SUBctx,SubchartHeight,avrg,color2)
    drawLineToCTX_old(J,Min,5,SUBctx,SubchartHeight,avrg,color3)
    drawLineToCTX_old(S,Min,5,SUBctx,SubchartHeight,avrg,color4)

    NKD_RSV = []
    NKD_RSV.push(K)
    NKD_RSV.push(D)
    NKD_RSV.push(J)
    NKD_RSV.push(S)
  }
  console.log("KD end --------------------------------------------")
}
// KD
function KDJ_Runner(dataPosition,dataIndex,priods,saveLibrary,indH,indL){
  console.log("XZC start ++++++++++++++++++++++++++++++++++++++++++++")  
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      // var CG = 0
      // var lastEMA = 0
      var Kn = 1/(priods[1])
      var Kl = 1-Kn
      var Kn2 = 1/(priods[2])
      var Kl2 = 1-Kn2
      // console.log("property",Kn,Kl,Kn2,Kl2);
      // var KL = 2/(priods[1]+1)
      // var KL2 = 1-KL
      // var KMID = 2/(priods[2]+1)
      // var KMID2 = 1-KMID
      //always abandon the last one
      var lh = []
      // var LLV = 1000000000
      // var HHV = 0
      // console.log("LLV",LLV,"HHV",HHV);
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // RSV
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      lh = LLVHHV(priods[0],dataPosition,indH,indL,i)
      // if (LLV>lh[0]){LLV = lh[0]}
      // if (HHV<lh[1]){HHV = lh[1]}
      // console.log("LLV",LLV,"HHV",HHV,"i",i,responseLocal[dataPosition][i][dataIndex]);
      if(i==pointIndex){
        saveLibrary[0].push(Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
      }else{
        saveLibrary[0].push(Num_round((responseLocal[dataPosition][i][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
        // console.log("LLV",LLV,"HHV",HHV);
        // console.log("responseLocal",responseLocal[dataPosition][i][dataIndex],Num_round((responseLocal[dataPosition][i][dataIndex]-LLV)/(HHV-LLV)*100,2))
      }
    }
    // LEVEL 2 loop
    // K
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[1].push(NaN)
      }else if(i==priods[1]-1){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[0][j]
          }
          // console.log("sum",sum,priods[1],saveLibrary[1]);
          saveLibrary[1].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[1].push(General_EMA(saveLibrary[1][i-1],saveLibrary[0][i],Kn,Kl))
      }
    }
    // LEVEL 3 loop
    // D
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[2].push(NaN)
      }else if(i==2*(priods[1]-1)){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[1][j]
          }
          saveLibrary[2].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[2].push(General_EMA(saveLibrary[2][i-1],saveLibrary[1][i],Kn2,Kl2))
      }
    }
    // LEVEL 4 loop
    // VAR4
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      saveLibrary[3].push(3*saveLibrary[1][i]-2*saveLibrary[2][i])
    }
    // console.log("saveLibrary",saveLibrary);
  }
  console.log("XZC end --------------------------------------------")
}
// CYR useless
function CYR(dataPosition,dataIndex,priod1,priod2,color1,color2){
  console.log("\n\nCYR start ++++++++++++++++++++++++++++++++++++++++++++")

  var CYR_ = []
  var MACYR_ = []
  var P13 = 0
  var P12 = 0
  var sumV = 0
  var sumVC = 0
  var sumCYR = 0
  var iStart = startIndex

  if(iStart+VisibleData[dataPosition].length-1>=priod1+priod2){
    if(iStart>=priod1+priod2){iStart = iStart-priod2+1}
    else{iStart = priod1}
    for(var i=iStart-priod1;i<iStart;i++){
      console.log("onchaange",responseLocal[1][i][5],responseLocal[dataPosition][i][dataIndex])
      sumV+=responseLocal[1][i][5]
      sumVC+=responseLocal[dataPosition][i][dataIndex]*responseLocal[1][i][5]
    }
    console.log("startIndex",startIndex,"iStart",iStart,sumV,sumVC)
    var j =0
    for(var i=iStart;i<startIndex+VisibleData[dataPosition].length;i++){
      P13 = sumVC/sumV
      P12 = (sumVC-responseLocal[1][i-priod1][5]*responseLocal[dataPosition][i-priod1][dataIndex])/(sumV-responseLocal[1][i-priod1][5])
      CYR_.push(Num_round((P13-P12)/P12*100,3))
      sumCYR+=CYR_[j]
      if(j>priod2-2){
        MACYR_.push(Num_round(sumCYR/priod2,3))
        sumCYR-=CYR_[j-priod2+1]
      }
      console.log("run",j,i,sumV,sumVC,P13,P12);

      j++
      sumV-=responseLocal[1][i-priod1][5]
      sumV+=responseLocal[1][i][5]
      sumVC-=responseLocal[1][i-priod1][5]*responseLocal[dataPosition][i-priod1][dataIndex]
      sumVC+=responseLocal[1][i][5]*responseLocal[dataPosition][i][dataIndex]
    }
    CYR_ = CYR_.slice(4)
  }else{CYR_ = []}
  console.log("CYR_",CYR_,"MACYR_",MACYR_)

  {
    var Min = Math.min.apply(null, CYR_);
    var avrg = Math.min.apply(null, MACYR_)
    if(Min<avrg){Min=avrg}

    var Max = Math.max.apply(null, CYR_);
    avrg = Math.max.apply(null, MACYR_)
    if(Max>avrg){Max=avrg}

    avrg = Num_round(SubchartHeight / (Max - Min),4)

    drawLineToCTX(CYR_,Min,iStart+priod2-startIndex-1,SUBctx,SubchartHeight,avrg,color1)
    drawLineToCTX(MACYR_,Min,iStart+priod2-startIndex-1,SUBctx,SubchartHeight,avrg,color2)
  }

  console.log("CYR end --------------------------------------------")
}

// RSIS
function RSIS(dataPosition,dataIndex,priods,colors){
  console.log("\n\nRSIS start ++++++++++++++++++++++++++++++++++++++++++++")
  for(var i =RSI_SMA.length;i<priods.length;i++){RSI_SMA.push([[],[],[]])}
  for(var i =0;i<priods.length;i++){
    RSI(dataPosition,dataIndex,priods[i],RSI_SMA[i])
  }

  {
    var Max = 0
    var Min = 100
    var MaxN = 0
    var MinN = 100
    var startInd = 0
    var endInd = 0

    if(pointIndex-startIndex+1>windowLength)(endInd = startIndex+windowLength)
    else{endInd = pointIndex}

    for(var i =0;i<priods.length;i++){
      startInd = startIndex
      if(startIndex<priods[i]-1){startInd=priods[i]-1}
      // console.log("find MaxN MinN",RSI_SMA[i][2].slice(startInd,endInd));
      MaxN = Math.max.apply(null, RSI_SMA[i][2].slice(startInd,endInd));
      MinN = Math.min.apply(null, RSI_SMA[i][2].slice(startInd,endInd));
      if(MaxN>Max){Max=MaxN}
      if(MinN<Min){Min=MinN}
    }

    var avrg = Num_round(SubchartHeight / (Max - Min),4)

    for(var i =0;i<RSI_SMA.length;i++){
      //console.log("final data",RSI_SMA[i][2].slice(startIndex,endInd+1),"startInd",startInd);
      drawLineToCTX(RSI_SMA[i][2].slice(startIndex,endInd+1),Min,SUBctx,SubchartHeight,avrg,colors[i])
    }
  }
  // remind lines
  // SUBctx.strokeStyle = "red"
  // SUBctx.lineWidth = 1;
  // SUBctx.beginPath();
  // SUBctx.moveTo(0, Num_round(SubchartHeight - (30-Min)*avrg,3)); // 从最高价
  // SUBctx.lineTo(MainchartWidth, Num_round(SubchartHeight - (30-Min)*avrg,3));
  // SUBctx.moveTo(0, Num_round(SubchartHeight - (70-Min)*avrg,3)); // 从最高价
  // SUBctx.lineTo(MainchartWidth, Num_round(SubchartHeight - (70-Min)*avrg,3));
  // SUBctx.stroke();
  console.log("RSIS end --------------------------------------------")
}
// RSIS resource
function RSI(dataPosition,dataIndex,priod,RSI_SMA){
  console.log("\n\nRSI start ++++++++++++++++++++++++++++++++++++++++++++")
  var MAXU = []
  var ABS = []
  var CG = 0
  var startdata = 50

  if(RSI_SMA[2].length<=pointIndex+1 && pointIndex>0){
    if(RSI_SMA[2].length>priod-1){RSI_SMA[0].pop();RSI_SMA[1].pop();RSI_SMA[2].pop()}
    {
      // if(RSI_.length<priod-2){
      //   for(var i = 0;i<priod-1;i++){
      //     RSI_.push(-1)
      //   }
      // }
      // if(RSI_.length==priod-1 && pointIndex>=priod-1){
      // }      
    }
    if(RSI_SMA[2].length<pointIndex+1){
      //init
      if(RSI_SMA[0].length==0){
        CG = Num_round(VisibleData[dataPosition][1][dataIndex]-VisibleData[dataPosition][0][dataIndex],4)
        if(CG>0){RSI_SMA[0].push(CG)}
        else(RSI_SMA[0].push(0))
        RSI_SMA[1].push(Math.abs(CG))

        for(var i = 0;i<priod-1;i++){RSI_SMA[2].push(-1)}
      }
      // console.log("RSI_SMA[2].length",RSI_SMA[2].length,"pointIndex",pointIndex);
      // console.log("RSI_SMA[0]:",RSI_SMA[0],"RSI_SMA[1]:",RSI_SMA[1],"RSI_SMA[2]:",RSI_SMA[2]);

      //update SMA
      for(var i = RSI_SMA[0].length+1;i<pointIndex;i++){
        CG = Num_round(responseLocal[dataPosition][i][dataIndex]-responseLocal[dataPosition][i-1][dataIndex],4)
        if(CG>0){MAXU.push(CG)}
        else(MAXU.push(0))
        ABS.push(Math.abs(CG))
      }
      CG = Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-responseLocal[dataPosition][pointIndex-1][dataIndex],4)
      if(CG>0){MAXU.push(CG)}
      else(MAXU.push(0))
      ABS.push(Math.abs(CG))

      startdata = RSI_SMA[0][RSI_SMA[0].length-1]
      MAXU = SMA(priod,1,MAXU,startdata)
      RSI_SMA[0].push(...MAXU)
      startdata = RSI_SMA[1][RSI_SMA[1].length-1]
      ABS = SMA(priod,1,ABS,startdata)
      RSI_SMA[1].push(...ABS)

      // console.log("MAXU",MAXU,"ABS",ABS);
      // console.log("RSI_SMA[0]",RSI_SMA[0],"RSI_SMA[1]",RSI_SMA[1]);

      //update RSI
      // console.log(RSI_SMA[2].length,priod-2,RSI_SMA[0].length,RSI_SMA[2].length);
      if(RSI_SMA[2].length>priod-2 && RSI_SMA[0].length>=RSI_SMA[2].length-1){
        for(var i = RSI_SMA[2].length-1;i<RSI_SMA[0].length;i++){
          RSI_SMA[2].push(Num_round(RSI_SMA[0][i]/RSI_SMA[1][i]*100,3))
        }      
      }
      // console.log("RSI_SMA[2]",RSI_SMA[2]);
    }
  }else{}

  console.log("RSI end --------------------------------------------")

}
// used in RSIS
function SMA(priod,weight,datas,startdata){
  SMAData = []
  for(var i = 0;i<datas.length;i++){
    startdata = Num_round((weight*datas[i]+(priod-weight)*startdata)/priod,3)
    SMAData.push(startdata)
  }
  return SMAData
}
}

// formulaRunner
function formulaRunner(kind,dataPosition,dataIndex,saveLibrary,levels,priods,colors,MaxMins,draws,MaxMin,average,Targetctx,TargetHeight){
  console.log("\n\nformulaRunner start ++++++++++++++++++++++++++++++++++++++++++++")
  // creaate new stack
  for(var i =saveLibrary.length;i<priods.length;i++){
    saveLibrary.push([])
    for(var j =0;j<levels;j++){
      saveLibrary[i].push([])
    }
  }
  // console.log("creaate new stack:",saveLibrary,saveLibrary[0]);
  // run
  for(var i =0;i<priods.length;i++){
    switch(kind){
      case "Price_Average":Price_Average_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "BIAS_QL":BIAS_QL_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "BBI":BBI_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "RSI":RSI(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "IVCD":IVCD_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "PRE":PRE_Runner(dataPosition,null,null,saveLibrary[i]);break
      case "XZC":XZC_Runner(dataPosition,dataIndex[0],priods[i],saveLibrary[i],dataIndex[1],dataIndex[2]);dataIndex = dataIndex[0];break
      case "KDJ":KDJ_Runner(dataPosition,dataIndex[0],priods[i],saveLibrary[i],dataIndex[1],dataIndex[2]);break
      case "YYX":YYX_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "UN":TST_Runner(dataPosition,null,null,saveLibrary[i]);break
    }
  }

  // console.log("after run saveLibrary:",saveLibrary)

  // draw
  {   
    var Max = 0
    var Min = NaN
    var MaxN = 0
    var MinN = 0
    var startInd = 0
    var endInd = 0
    //section indexes endpoints
    if(pointIndex-startIndex+1>windowLength)(endInd = startIndex+windowLength-1)
    else{endInd = pointIndex}

    // MaxMins  average
    if(MaxMin == null || average == null){
      // MaxMins
      for(var j =0;j<saveLibrary.length;j++){
        for(var i =0;i<MaxMins.length;i++){
          startInd = startIndex
          // if(startIndex<priods[i]-1){startInd=priods[i]-1}
          for(var k = startInd;k<=endInd;k++){
            if(!Number.isNaN(saveLibrary[j][MaxMins[i]][k])){
              // console.log("MaxMins on:",saveLibrary[j][MaxMins[i]].slice(k,endInd+1))
              MaxN = Math.max.apply(null, saveLibrary[j][MaxMins[i]].slice(k,endInd+1));
              if(Number.isNaN(Min)){Min=MaxN;}//console.log("Min init:",Min)
              MinN = Math.min.apply(null, saveLibrary[j][MaxMins[i]].slice(k,endInd+1));
              if(MaxN>Max){Max=MaxN}
              if(MinN<Min){Min=MinN}
              break
            }
          }
        }
      }
    // author: moogiegik
      // average 
      // average = 0    //var average = Num_round(SubchartHeight / (Max - Min),4)
      average = Num_round(TargetHeight / (Max - Min),4)
      // for(var i =0;i<priods.length;i++){
      //   switch(kind){
      //     case "BIAS_QL":average = Num_round(TargetHeight / (Max - Min),4);break
      //     case "RSI":console.log("RSI");break
      //     case "":
      //     case "":
      //   }
      // }
      // console.log("Max:",Max,"Min:",Min,"average:",average)
    }else{
      Min = MaxMin[0]
    }

    // start_gap and draw
    for(var j =0;j<saveLibrary.length;j++){
      for(var i =0;i<draws.length;i++){
        // console.log("gdfg:",saveLibrary[j][draws[i]].slice(startIndex,endInd+1),colors[i])
        drawLineToCTX(saveLibrary[j][draws[i]].slice(startIndex,endInd+1),Min,Targetctx,TargetHeight,average,colors[j][i])
      }
      // special
      switch(kind){
        case "IVCD":drawStickToCTX(saveLibrary[j][6].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,colors[0].slice(2,5),2,8,0);break;
        case "PRE":
            drawStickToCTX(saveLibrary[j][0].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][0],colors[0][0],colors[0][0]],1,8,0);
            // drawStickToCTX(saveLibrary[j][1].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][1],colors[0][0]],1,8);break
            drawStickToCTX(saveLibrary[j][1].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][1],colors[0][1],colors[0][1]],3,8,8);
            drawStickToCTX(saveLibrary[j][2].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][2],colors[0][2],colors[0][2]],3,8,8);
            // drawAverageLine_op(3,Min,startIndex,saveLibrary[0][0],average,"yellow",SUBctx,SubchartHeight)
            // drawAverageLine_op(6,Min,startIndex,saveLibrary[0][0],average,"blue",SUBctx,SubchartHeight)
            break;
        case "XZC":
          drawHorizontalLine(80,"yellow",Targetctx,TargetHeight,100,average,Min);
          drawHorizontalLine(90,"red",Targetctx,TargetHeight,100,average,Min);
          drawHorizontalLine(20,"green",Targetctx,TargetHeight,100,average,Min);

          break
        case "TST":break;
      }      
    }
    console.log("formulaRunner end --------------------------------------------")
  }
}
function drawAverageLine_op_wasted(sumPriod,Min,startIndex,DATA,CAverage,color,Ctx,CtxHeight){
  console.log("drawAverageLine_op start:+++++++++++++++++++++++")
  dataRaw = []
  sum = 0  
  // get raw data as array
  for(var i = startIndex;i<=pointIndex;i++){
    sum = 0
    if(i>=sumPriod-1){
      for(var ii=i-sumPriod+1;ii<=i;ii++){
        sum+=DATA[ii]
        // console.log("anverage plus",DATA[ii])
      }
      dataRaw.push(Num_round(sum/sumPriod,3))
    }
    else{
      dataRaw.push(NaN)
    }
    // console.log("sum/sumPriod",Num_round(sum,3)/sumPriod,"sum",sum,"sumPriod",sumPriod)
    // console.log("\n!??????????????????????????????##########################\n")
  }
  // console.log("dataRaw????",dataRaw)
  for(var i = 0;i<DATA.length;i++){
    if(!Number.isNaN(dataRaw[i])){iStart = i;break;}
  };
  // console.log("stickData",stickData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  // console.log("colors",colors)
  for(var i = iStart;i<dataRaw.length;i++){
    // dataRaw[i] = Num_round(((dataRaw[i])*CAverage),3)
    // console.log("stickData",stickData)
    dataRaw[i] = Num_round(CtxHeight - (dataRaw[i]-Min)*CAverage,3)
  }
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,dataRaw[iStart])
  for(var i = iStart;i<dataRaw.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,dataRaw[i])
  };Ctx.stroke();

  console.log("drawAverageLine_op end:--------------------------")
  return dataRaw
}
// Price_Average_line 均线
function Price_Average_Runner(dataPosition,dataIndex,priod,saveLibrary){
  console.log("Price_Average_Run start ++++++++++++++++++++++++++++++++++++++++++++")
  // 
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      var CG = 0
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // sum
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[0].length==0){
        if(pointIndex == 0){saveLibrary[0].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[0].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[0].length<priod){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priod][dataIndex]}

        if(i==pointIndex){
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 2 loop
    // ma
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[1].length<priod-1){
        saveLibrary[1].push(NaN)
      }
      // normal values
      else{
        saveLibrary[1].push(Num_round(saveLibrary[0][i]/priod,4))
      }
    }
  }
  console.log("Price_Average_Run end --------------------------------------------")
}
// BIAS_QL Runner  _____runner_freamwork
function BIAS_QL_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("BIAS_QL_Run start ++++++++++++++++++++++++++++++++++++++++++++")
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  // console.log("running start with aveLibrary:");
  // console.log(saveLibrary[0])
  // console.log(saveLibrary[1])
  // console.log(saveLibrary[2])
  // 
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      var CG = 0
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // console.log("poped:");
    // console.log(saveLibrary[0])
    // console.log(saveLibrary[1])
    // console.log(saveLibrary[2])
    // [2.69, 5.31, 7.87, 10.34, 12.92, 15.51, 15.42, 15.34, 15.33, 15.389999999999999, 15.42, 15.419999999999998, 15.379999999999997, 15.389999999999997, 15.269999999999996, 
    // LEVEL 1 loop
    // MA_0
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[0].length==0){
        if(pointIndex == 0){saveLibrary[0].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[0].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[0].length<priods[0]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[0]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
        // console.log("mark",CG,saveLibrary[0][i-1],(VisibleData[dataPosition][VisibleData[dataPosition].length-1]))
        // console.log("mark",(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]))

      }
    }
    // LEVEL 2 loop
    // BIAS_1
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      // former values
      // console.log("mark",saveLibrary[1]);

      if(saveLibrary[1].length<priods[0]-1){
        saveLibrary[1].push(NaN)
        // console.log("1111111push(NaN)",saveLibrary[1]);
      }

      // normal values
      else{
        CG = saveLibrary[0][i]
        if(i==pointIndex){
          // console.log("mark");
          saveLibrary[1].push(Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-CG/priods[0])/(CG/priods[0]),4))
        }else{
          saveLibrary[1].push(Num_round((responseLocal[dataPosition][i][dataIndex]-CG/priods[0])/(CG/priods[0]),4))
        }
      }
    }
    // LEVEL 3 loop
    // BIASMA_2
    // 0.1166, 0.1163, 0.1143, 0.1154, 0.1157, 0.118, 0.1154, 0.1141, 0.1143, 0.1153, 0.1228, 0.1293,
    // 0.0025, 0.0019, -0.001, -0.0074, -0.0136, -0.0136, -0.0206, -0.0246, -0.0193, -0.0109, 0.0034, 0.0119,
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[2].length<priods[0]+priods[1]-2){
        saveLibrary[2].push(NaN)
      }
      // normal values
      else{
        CG = 0
        for(var j = saveLibrary[2].length-priods[1]+1;j<saveLibrary[2].length+1;j++){
          CG += saveLibrary[1][j]
          // if(saveLibrary[2].length<15){console.log("vv",saveLibrary[1][j],CG)}
          // console.log("vv",saveLibrary[1][j],CG)
        }
        // if(saveLibrary[2].length<15){console.log("vvff",CG/priods[1],CG)}
        // console.log("vvff",CG/priods[1],CG)
        saveLibrary[2].push(Num_round(CG/priods[1],4))
      }
    }
    // console.log("final:");
    // console.log(saveLibrary[0])
    // console.log(saveLibrary[1])
    // console.log(saveLibrary[2])
  }
  console.log("BIAS_QL_Run end --------------------------------------------")
}
// BBI Runner  _____runner_freamwork
function BBI_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("BBI start ++++++++++++++++++++++++++++++++++++++++++++")
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      var CG = 0
      var Kn = 2/3
      var Kl = 1-Kn
      var temp = 0
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // MA1
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[0].length==0){
        if(pointIndex == 0){saveLibrary[0].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[0].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[0].length<priods[0]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[0]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 2 loop
    // MA2
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[1].length==0){
        // if(pointIndex == 0){saveLibrary[1].push(VisibleData[dataPosition][1][dataIndex])}
        // else{saveLibrary[1].push(responseLocal[dataPosition][1][dataIndex])}
        if(pointIndex == 0){saveLibrary[1].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[1].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[1].length<priods[1]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[1]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[1].push(Num_round(CG+saveLibrary[1][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[1].push(Num_round(CG+saveLibrary[1][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 3 loop
    // MA3
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[2].length==0){
        // if(pointIndex == 0){saveLibrary[2].push(VisibleData[dataPosition][2][dataIndex])}
        // else{saveLibrary[2].push(responseLocal[dataPosition][2][dataIndex])}
        if(pointIndex == 0){saveLibrary[2].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[2].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[2].length<priods[2]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[2]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[2].push(Num_round(CG+saveLibrary[2][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[2].push(Num_round(CG+saveLibrary[2][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 4 loop
    // MA4
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[3].length==0){
        // if(pointIndex == 0){saveLibrary[3].push(VisibleData[dataPosition][3][dataIndex])}
        // else{saveLibrary[3].push(responseLocal[dataPosition][3][dataIndex])}
        if(pointIndex == 0){saveLibrary[3].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[3].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[3].length<priods[3]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[3]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[3].push(Num_round(CG+saveLibrary[3][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[3].push(Num_round(CG+saveLibrary[3][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 5 loop
    // BBI
    for(var i = saveLibrary[4].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[4].length<priods[3]){
        saveLibrary[4].push(NaN)
      }
      // normal values
      else{
        saveLibrary[4].push(Num_round((saveLibrary[0][i]/priods[0]+saveLibrary[1][i]/priods[1]+saveLibrary[2][i]/priods[2]+saveLibrary[3][i]/priods[3])/4,4))
      }
    }
    // smooth
    // for(var i = saveLibrary[4].length;i<=pointIndex;i++){
    //   // former values
    //   if(saveLibrary[4].length<priods[3]){
    //     saveLibrary[4].push(NaN)
    //   }else if(saveLibrary[4].length==priods[3]){// normal values
    //     saveLibrary[4].push(Num_round((saveLibrary[0][i]/priods[0]+saveLibrary[1][i]/priods[1]+saveLibrary[2][i]/priods[2]+saveLibrary[3][i]/priods[3])/4,4))
    //   }else{
    //     temp = (saveLibrary[0][i]/priods[0]+saveLibrary[1][i]/priods[1]+saveLibrary[2][i]/priods[2]+saveLibrary[3][i]/priods[3])/4
    //     General_EMA(saveLibrary[4][i-1],temp)
    //     saveLibrary[4].push(General_EMA(saveLibrary[4][i-1],temp,Kn,Kl))
    //   }
    // }
  }
  console.log("BBI end --------------------------------------------")
}
// NKD Runner  _____runner_freamwork
function NKD_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("NKD start ++++++++++++++++++++++++++++++++++++++++++++")
  
  console.log("NKD end --------------------------------------------")
}
// RSI  Runner  _____runner_freamwork
function RSI_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("RSI start ++++++++++++++++++++++++++++++++++++++++++++")
  var MAXU = []
  var ABS = []
  var CG = 0
  var startdata = 50

  if(saveLibrary[2].length<=pointIndex+1 && pointIndex>0){
    if(saveLibrary[2].length>priod-1){saveLibrary[0].pop();saveLibrary[1].pop();saveLibrary[2].pop()}
    {
      // if(RSI_.length<priod-2){
      //   for(var i = 0;i<priod-1;i++){
      //     RSI_.push(-1)
      //   }
      // }
      // if(RSI_.length==priod-1 && pointIndex>=priod-1){
      // }      
    }
    if(saveLibrary[2].length<pointIndex+1){
      //init
      if(saveLibrary[0].length==0){
        CG = Num_round(VisibleData[dataPosition][1][dataIndex]-VisibleData[dataPosition][0][dataIndex],4)
        if(CG>0){saveLibrary[0].push(CG)}
        else(saveLibrary[0].push(0))
        saveLibrary[1].push(Math.abs(CG))

        for(var i = 0;i<priod-1;i++){saveLibrary[2].push(-1)}
      }
      // console.log("saveLibrary[2].length",saveLibrary[2].length,"pointIndex",pointIndex);
      // console.log("saveLibrary[0]:",saveLibrary[0],"saveLibrary[1]:",saveLibrary[1],"saveLibrary[2]:",saveLibrary[2]);

      //update SMA
      for(var i = saveLibrary[0].length+1;i<pointIndex;i++){
        CG = Num_round(responseLocal[dataPosition][i][dataIndex]-responseLocal[dataPosition][i-1][dataIndex],4)
        if(CG>0){MAXU.push(CG)}
        else(MAXU.push(0))
        ABS.push(Math.abs(CG))
      }
      CG = Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-responseLocal[dataPosition][pointIndex-1][dataIndex],4)
      if(CG>0){MAXU.push(CG)}
      else(MAXU.push(0))
      ABS.push(Math.abs(CG))

      startdata = saveLibrary[0][saveLibrary[0].length-1]
      MAXU = SMA(priod,1,MAXU,startdata)
      saveLibrary[0].push(...MAXU)
      startdata = saveLibrary[1][saveLibrary[1].length-1]
      ABS = SMA(priod,1,ABS,startdata)
      saveLibrary[1].push(...ABS)

      // console.log("MAXU",MAXU,"ABS",ABS);
      // console.log("saveLibrary[0]",saveLibrary[0],"saveLibrary[1]",saveLibrary[1]);

      //update RSI
      // console.log(saveLibrary[2].length,priod-2,saveLibrary[0].length,saveLibrary[2].length);
      if(saveLibrary[2].length>priod-2 && saveLibrary[0].length>=saveLibrary[2].length-1){
        for(var i = saveLibrary[2].length-1;i<saveLibrary[0].length;i++){
          saveLibrary[2].push(Num_round(saveLibrary[0][i]/saveLibrary[1][i]*100,3))
        }      
      }
      // console.log("saveLibrary[2]",saveLibrary[2]);
    }
  }else{}

  console.log("RSI end --------------------------------------------")
}
// IVCD  Runner  _____runner_freamwork
function IVCD_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("IVCD start ++++++++++++++++++++++++++++++++++++++++++++")
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)

  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      var CG = 0
      var lastEMA = 0
      var KS = 2/(priods[0]+1)
      var KS2 = 1-KS
      var KL = 2/(priods[1]+1)
      var KL2 = 1-KL
      var KMID = 2/(priods[2]+1)
      var KMID2 = 1-KMID
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // SMA_SHORT
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[0].length==0){
        if(pointIndex == 0){saveLibrary[0].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[0].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[0].length<priods[0]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[0]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 2 loop
    // SMA_LONG
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[1].length==0){
        // console.log("VisibleData zeroth value",VisibleData[dataPosition],dataIndex)

        if(pointIndex == 0){saveLibrary[1].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[1].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[1].length<priods[1]){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priods[1]][dataIndex]}

        if(i==pointIndex){
          saveLibrary[1].push(Num_round(CG+saveLibrary[1][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[1].push(Num_round(CG+saveLibrary[1][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 3 loop
    // EMA_SHORT
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[2].length<priods[1]-1){
        saveLibrary[2].push(NaN)
      }else{// normal values
        // for zeroth value
        lastEMA = saveLibrary[2][saveLibrary[2].length-1] 
        if(Number.isNaN(lastEMA)){
          lastEMA = responseLocal[dataPosition][saveLibrary[2].length-1][dataIndex]
        }
        // go on
        if(i==pointIndex){
          saveLibrary[2].push(General_EMA(lastEMA,VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex],KS,KS2))
        }else{
          saveLibrary[2].push(General_EMA(lastEMA,responseLocal[dataPosition][i][dataIndex],KS,KS2))
        }
      }
    }
    // LEVEL 4 loop
    // EMA_LONG
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[3].length<priods[1]-1){
        saveLibrary[3].push(NaN)
      }else{// normal values
        // for zeroth value
        lastEMA = saveLibrary[3][saveLibrary[3].length-1] 
        if(Number.isNaN(lastEMA)){
          lastEMA = responseLocal[dataPosition][saveLibrary[3].length-1][dataIndex]
        }
        // go on
        if(i==pointIndex){
          saveLibrary[3].push(General_EMA(lastEMA,VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex],KL,KL2))
        }else{
          saveLibrary[3].push(General_EMA(lastEMA,responseLocal[dataPosition][i][dataIndex],KL,KL2))
        }
      }
    }
    // LEVEL 5 loop
    // DIF
    for(var i = saveLibrary[4].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[4].length<priods[1]-1){
        saveLibrary[4].push(NaN)
      }else{// normal values
        saveLibrary[4].push(Num_round(((saveLibrary[2][i]-saveLibrary[3][i])*4),4))
      }
    }
    // LEVEL 6 loop
    // DEA
    for(var i = saveLibrary[5].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[5].length<priods[1]-1){
        saveLibrary[5].push(NaN)
      }else{// normal values
        // for zeroth value
        lastEMA = saveLibrary[5][saveLibrary[5].length-1] 
        if(Number.isNaN(lastEMA)){
          lastEMA = 0
        }
        // go on
        saveLibrary[5].push(Num_round((General_EMA(lastEMA,saveLibrary[4][i],KMID,KMID2)),4))
      }
    }
    // LEVEL 7 loop
    // DIF-DEA
    for(var i = saveLibrary[6].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[6].length<priods[1]-1){
        saveLibrary[6].push(NaN)
      }else{// normal values
        saveLibrary[6].push(Num_round(((saveLibrary[4][i]-saveLibrary[5][i])),4))
      }
    }
  }
  console.log("IVCD end --------------------------------------------")
}

// PRE  Runner  _____runner_freamwork
function PRE_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("PRE start ++++++++++++++++++++++++++++++++++++++++++++")

  if(saveLibrary[0].length<=pointIndex+1){
     // PREPARE_________________
     {
      var CG = 0
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // DISTANCE_big
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //no zeroth value
      if(i==pointIndex){
        saveLibrary[0].push(Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][15]-VisibleData[dataPosition][VisibleData[dataPosition].length-1][12],2))
        // saveLibrary[0].push(Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][10]-VisibleData[dataPosition][VisibleData[dataPosition].length-1][14],2))
        // saveLibrary[0].push(Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][11]-VisibleData[dataPosition][VisibleData[dataPosition].length-1][10],2))

      }else{
        saveLibrary[0].push(Num_round(responseLocal[dataPosition][i][15]-responseLocal[dataPosition][i][12],2))
        // saveLibrary[0].push(Num_round(responseLocal[dataPosition][i][10]-responseLocal[dataPosition][i][14],2))
        // saveLibrary[0].push(Num_round(responseLocal[dataPosition][i][11]-responseLocal[dataPosition][i][10],2))

      }
    }
    // // LEVEL 2 loop
    // // DISTANCE_small
    // for(var i = saveLibrary[1].length;i<=pointIndex;i++){
    //   //no zeroth value
    //   if(i==pointIndex){
    //     saveLibrary[1].push(Num_round(VisibleData[dataPosition][VisibleData[dataPosition].length-1][12]-VisibleData[dataPosition][VisibleData[dataPosition].length-1][11],2))
    //   }else{
        
    //     // console.log(responseLocal[dataPosition][i][12],responseLocal[dataPosition][i][11],responseLocal[dataPosition][i][12]-responseLocal[dataPosition][i][11])
    //     saveLibrary[1].push(Num_round(responseLocal[dataPosition][i][12]-responseLocal[dataPosition][i][11],2))
    //   }
    // }
    // LEVEL 3 loop
    // RATE
    var rate = 0
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      rate =(Num_round(responseLocal[dataPosition][i][12]-responseLocal[dataPosition][i][11],2))
          -(Num_round(responseLocal[dataPosition][i][11]-responseLocal[dataPosition][i][10],2))
      if(rate<=0){
        saveLibrary[1].push(rate)
        saveLibrary[2].push(0)
      }else{
        saveLibrary[1].push(0)
        saveLibrary[2].push(rate)
      }
    }
  }
  console.log("PRE end --------------------------------------------")
} 
// author: moogiegik
// XZC  Runner  _____runner_freamwork
function XZC_Runner(dataPosition,dataIndex,priods,saveLibrary,indH,indL){
  console.log("XZC start ++++++++++++++++++++++++++++++++++++++++++++")  
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________  XZC_data
    {
      // var CG = 0
      // var lastEMA = 0
      var Kn = 1/(priods[1]+1)
      var Kl = 1-Kn
      var Kn2 = 4/(priods[3]+1)
      var Kl2 = 1-Kn2
      // console.log("property",Kn,Kl,Kn2,Kl2);
      // var KL = 2/(priods[1]+1)
      // var KL2 = 1-KL
      // var KMID = 2/(priods[2]+1)
      // var KMID2 = 1-KMID
      //always abandon the last one
      var lh = []
      var lh2 = []
      var temp = 0
      // var LLV = 1000000000
      // var HHV = 0
      // console.log("LLV",LLV,"HHV",HHV);
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 5 loop
    // VAR1 股神
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      lh = LLVHHV(priods[0],dataPosition,indH,indL,i)
      // if (LLV>lh[0]){LLV = lh[0]}
      // if (HHV<lh[1]){HHV = lh[1]}
      // console.log("LLV",LLV,"HHV",HHV,"i",i,responseLocal[dataPosition][i][dataIndex]);
      if(i==pointIndex){
        saveLibrary[0].push(Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
      }else{
        saveLibrary[0].push(Num_round((responseLocal[dataPosition][i][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
        // console.log("LLV",LLV,"HHV",HHV);
        // console.log("responseLocal",responseLocal[dataPosition][i][dataIndex],Num_round((responseLocal[dataPosition][i][dataIndex]-LLV)/(HHV-LLV)*100,2))
      }
      // console.log("XZC_Runner",responseLocal[dataPosition][i][0],responseLocal[dataPosition][i][dataIndex],lh[0],lh[1])
      lh2 = LLVHHV(priods[2],dataPosition,indH,indL,i)
      //zeroth value
      if(i==0){
        saveLibrary[4].push(saveLibrary[0][0])
      }else{// normal values
        // console.log("i",i);
        temp = 0
        if(i==pointIndex){
          temp = Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-lh[0])/(lh2[1]-lh[0])*100,4)
        }else{
          temp = Num_round((responseLocal[dataPosition][i][dataIndex]-lh[0])/(lh2[1]-lh[0])*100,4)
        }
        // console.log("temp",temp,Kn2,Kl2)
        saveLibrary[4].push(General_EMA(saveLibrary[4][i-1],temp,Kn2,Kl2))
      }
    }
    // LEVEL 2 loop
    // VAR2
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[1].push(NaN)
      }else if(i==priods[1]-1){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[0][j]
          }
          // console.log("sum",sum,priods[1],saveLibrary[1]);
          saveLibrary[1].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[1].push(General_EMA(saveLibrary[1][i-1],saveLibrary[0][i],Kn,Kl))
      }
    }

    // LEVEL 3 loop
    // VAR3
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[2].push(NaN)
      }else if(i==2*(priods[1]-1)){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[1][j]
          }
          saveLibrary[2].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[2].push(General_EMA(saveLibrary[2][i-1],saveLibrary[1][i],Kn,Kl))
      }
    }
    // LEVEL 4 loop
    // VAR4
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[3].push(NaN)
      }else if(i==3*(priods[1]-1)){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[2][j]
          }
          saveLibrary[3].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[3].push(General_EMA(saveLibrary[3][i-1],saveLibrary[2][i],Kn,Kl))
      }
    }
    // LEVEL 4 loop
    // VAR4
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[3].push(NaN)
      }else if(i==3*(priods[1]-1)){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[2][j]
          }
          saveLibrary[3].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[3].push(General_EMA(saveLibrary[3][i-1],saveLibrary[2][i],Kn,Kl))
      }
    }
    // LEVEL 6 loop
    // maxminControl
    for(var i = saveLibrary[5].length;i<=pointIndex;i++){
      // Check if i is even or odd
      if (i % 2 === 0) {
        saveLibrary[5].push(100)
      } else {
        saveLibrary[5].push(0)
      }
    }

    // // LEVEL 5 loop
    // // 股神
    // for(var i = saveLibrary[4].length;i<=pointIndex;i++){
    //   lh = LLVHHV(priods[0],dataPosition,indH,indL,i)
    //   lh2 = LLVHHV(priods[2],dataPosition,indH,indL,i)

    //   //zeroth value
    //   if(i==0){
    //     saveLibrary[4].push(50)
    //   }else{// normal values
    //     // console.log("i",i);
    //     temp = 0
    //     if(i==pointIndex){
    //       temp = Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-lh[0])/(lh2[1]-lh[0])*100,4)
    //     }else{
    //       temp = Num_round((responseLocal[dataPosition][i][dataIndex]-lh[0])/(lh2[1]-lh[0])*100,4)
    //     }
    //     saveLibrary[3].push(General_EMA(saveLibrary[3][i-1],temp,Kn2,Kl2))
    //   }
    // }
    
    // console.log("saveLibrary",saveLibrary);
  }
  console.log("XZC end --------------------------------------------")
}

// YYX  Runner  _____runner_freamwork
function YYX_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("YYX start ++++++++++++++++++++++++++++++++++++++++++++")  
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________  XZC_data
    {
      var count = []
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }

    // LEVEL 1 2 3 loop
    // VAR1 red_UP green_Down gray_equal
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      count = []
      count =  UPDOWN(priods[0],dataPosition,dataIndex,i)
      saveLibrary[0].push(count[0])// LEVEL 0 loop
      saveLibrary[1].push(count[1])// LEVEL 1 loop
      saveLibrary[2].push(count[2])// LEVEL 2 loop
      // saveLibrary[3].push(priods[0]/2)
      // LEVEL 3 loop
      if(count[3]>0){
        saveLibrary[4].push(1)
      }else{
        saveLibrary[4].push(0)
      }
    }
    // LEVEL 4 loop
    // maxminControl
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      // Check if i is even or odd
      if (i % 2 === 0) {
        saveLibrary[3].push(priods[0])
      } else {
        saveLibrary[3].push(0)
      }
    }
    // LEVEL 5 loop
    // maxminControl
    for(var i = saveLibrary[5].length;i<=pointIndex;i++){
      saveLibrary[5].push(PriceOverlap(dataPosition,i,priods[1]))
    }
  }
  console.log("YYX end --------------------------------------------")
}
// TST  Runner  _____runner_freamwork
function TST_Runner(dataPosition,dataIndex,priods,saveLibrary){
  console.log("TST start ++++++++++++++++++++++++++++++++++++++++++++")

  console.log("TST end --------------------------------------------")
}

// author: moogiegik


// // General_EMA_____FUNCTION
// function General_EMA(lastEMA,newOneItem,period){
//   Kn = 2/(period+1)
//   Kl = 1-Kn
//   return Num_round((newOneItem*Kn+lastEMA*Kl),4) 
// }
// General_SMA ane EMA_____FUNCTION
// General_SMA
function General_EMA(lastEMA,newOneItem,Kn,Kl){
  return Num_round((newOneItem*Kn+lastEMA*Kl),4) 
}
// author: moogiegik
// General_MA_____FUNCTION
function General_MA(newSum,K){
  return Num_round(newSum/K,4) 
}
// get high and low in a range of data
function LLVHHV(period,dataPosition,indH,indL,onIndex){
  var LHdata = []
  var start = onIndex-period+1
  if(start<0){start = 0}
  // console.log("LLVHHV attrs",period,dataPosition,indH,indL,start,onIndex)

  for(var i = start;i<onIndex;i++){
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  if(i == pointIndex){
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indL])
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indH])    
  }else{
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  // console.log("LLVHHV",LHdata)
  return [Math.min(...LHdata),Math.max(...LHdata)]
}
// get up and down in a range of data
function UPDOWN(period,dataPosition,index,onIndex){
  var UDdata = []
  var start = onIndex-period+1
  if(start<0){start = 0}
  // console.log("LLVHHV attrs",period,dataPosition,indH,indL,start,onIndex)
  for(var i = start;i<onIndex;i++){
    UDdata.push(responseLocal[dataPosition][i][index])
  }
  if(i == pointIndex){
    UDdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][index])
  }else{
    UDdata.push(responseLocal[dataPosition][i][index])
  }
  // console.log("LLVHHV",LHdata)
  var count = [0,0,0]; // [positiveCount, negativeCount]
  for (var i = 0; i < UDdata.length; i++) {
    if (UDdata[i] > 0) {
      count[0]++;
    } else if (UDdata[i] < 0) {
      count[1]++;
    }else{
      count[2]++;
    }
  }
  count.push(UDdata[UDdata.length-1])
  // console.log("UDdata",UDdata)
  return count
  
}
// get up and down in a range of data
function PriceOverlap(dataPosition,onIndex,rateExpose){
  // var FCdata = []
  var todayH = 0
  var yesterdayC = 0
  var rate = 0
  if(onIndex == pointIndex){
    todayH = VisibleData[dataPosition][VisibleData[dataPosition].length-1][3]
  }else{
    todayH = responseLocal[dataPosition][onIndex][3]
  }
  if(onIndex<1){
    if(onIndex == 0){
      yesterdayC = todayH
    }else{
      yesterdayC = responseLocal[dataPosition][onIndex-1][2]
    }
  }else{
    yesterdayC = responseLocal[dataPosition][onIndex-1][2]
  }
  rate = Math.floor((todayH-yesterdayC)/yesterdayC*1000)/1000
  // console.log("PriceOverlap",Math.floor((todayH-yesterdayC)/yesterdayC*100)/100,Num_round((todayH-yesterdayC)/yesterdayC,4))
  // console.log("rate",rate,"todayH",todayH,"yesterdayC",yesterdayC)
  if(rate>=rateExpose){
    return 1
  }else{
    return 0
  }
}


}


// _______basic draw fun___________________________________________________________________________
{
//十字标
// draw cross Lines line_____FUNCTION
function crossLines(x,y){
  MASKcanvas.height = MaskchartHeight
  MASKcanvas.width = MainchartWidth

  MASKctx.clearRect(0,0,MASKcanvas.width,MASKcanvas.height)

  MASKctx.beginPath()
  MASKctx.strokeRect = "#000000"
  MASKctx.strokeStyle = "#FFFFFF"
  MASKctx.lineWidth = 1
  MASKctx.moveTo(x,0)
  MASKctx.lineTo(x,MASKcanvas.height)
  MASKctx.moveTo(0,y)
  MASKctx.lineTo(MASKcanvas.width,y)
  MASKctx.stroke()
  temp = Math.floor((x-(1*drawGap))/(drawGap + chartItemWidth))
  if(crossIdx!=temp && temp>=0 && responseLocal.length!=0 && temp<VisibleData[1].length){
    crossIdx = temp 
    // console.log(crossIdx,VisibleData[1][crossIdx])

    crossInfo(crossIdx)
    // }else{
    //   crossIdx = -1
    // }
  }
}
// draw IV image_____FUNCTION
//boxData = [Q1Y,medianY,Q3Y,minY,maxY]
//            0    1     2      3    4
function drawBox_old(boxYData,x,boxWidth){
  // console.log(boxYData)
  //Rectange
  MAINctx.lineWidth = 2;
  MAINctx.strokeStyle = "white";
  MAINctx.fillStyle = "#000000FF"
  // 清空

  // 画须线 (从最小值到最大值的竖线)
  MAINctx.beginPath();
  MAINctx.moveTo(x + boxWidth / 2, boxYData[4]); // 从最大值开始
  // MAINctx.lineTo(x + boxWidth / 2, boxYData[2]);  // 到Q3
  // MAINctx.moveTo(x + boxWidth / 2, boxYData[0]);  // 从Q1
  MAINctx.lineTo(x + boxWidth / 2, boxYData[3]); // 到最小值
  // MAINctx.strokeStyle = boxYData[0]; // 
  MAINctx.stroke();
  // MAINctx.clearRect(x, boxYData[2], boxWidth+1, boxYData[4]-boxYData[2]);
  // MAINctx.clearRect(x, boxYData[2], boxWidth, boxYData[0]-boxYData[2]);
  MAINctx.strokeRect(x, boxYData[2], boxWidth, boxYData[0]-boxYData[2]);
  // median
  MAINctx.lineWidth = 2;
  MAINctx.beginPath();
  MAINctx.moveTo(x, boxYData[1]);
  MAINctx.lineTo(x + boxWidth, boxYData[1]); // 中位数的水平线
  MAINctx.stroke();
  // 画最小值和最大值的小横线
  MAINctx.lineWidth = 2;
  MAINctx.beginPath();
  MAINctx.moveTo(x, boxYData[3]); // 最小值的小横线
  MAINctx.lineTo(x + boxWidth, boxYData[3]);
  MAINctx.moveTo(x, boxYData[4]); // 最大值的小横线
  MAINctx.lineTo(x + boxWidth, boxYData[4]);
  MAINctx.stroke();
}
function drawBox(boxYData,offsetx,colors){
  // console.log(boxYData)
  MAINctx.lineWidth = 1;
  // author: moogiegik
  // console.log("boxYData",boxYData)
  for( var i = 0;i<boxYData.length;i++){
    MAINctx.beginPath();
    MAINctx.strokeStyle = colors[i];
    MAINctx.arc(offsetx+chartItemWidth,boxYData[i], 4, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
    // MAINctx.moveTo(offsetx, boxYData[i]);
    // MAINctx.lineTo(offsetx + width, boxYData[i]); // 中位数的水平线
    MAINctx.stroke();
  }
  
}
// draw K image_____FUNCTION  fixed
//open,close,high,low
//0      1    2   3
function drawK(ohlcYData,offsetx,day){
  // color
  color = (function(){
    if(ohlcYData[1]>ohlcYData[0])return "#00FFFF"
    else if(ohlcYData[1]<ohlcYData[0])return "#FF5C5C"
    else return "white"
  })()

  MAINctx.fillStyle = color
  MAINctx.strokeStyle = color
  MAINctx.lineWidth = 1.5;
  // MAINctx.globalAlpha = 1;  // 确保透明度为1
  // MAINctx.globalCompositeOperation = 'source-over';  // 默认混合模式
  temp1 = 0
  temp2 = 1
  if (ohlcYData[1]<ohlcYData[0]){temp1 = 1;temp2 = 0}
  MAINctx.beginPath();
  MAINctx.moveTo(offsetx+SimChartItemWidth, ohlcYData[2]); // 从最高价
  MAINctx.lineTo(offsetx+SimChartItemWidth, ohlcYData[temp1]);
  MAINctx.moveTo(offsetx+SimChartItemWidth, ohlcYData[temp2]);
  MAINctx.lineTo(offsetx+SimChartItemWidth, ohlcYData[3]);  // 到最低价
  MAINctx.moveTo(offsetx+SimChartItemWidth, 0); // 从最高价
  if(day == 5){
    MAINctx.arc(offsetx+SimChartItemWidth,0, 4, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
  }
  MAINctx.stroke();  

  if(ohlcYData[1]>ohlcYData[0]){
    MAINctx.fillRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }else if(ohlcYData[1]<ohlcYData[0]){
    MAINctx.strokeRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }else{
  MAINctx.strokeRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }
}
// drawLines on pointed ctx and give or automatically generate maxmin_____FUNCTION  作废处理
function drawLines(ctx,data,height,width,offset,zeroIllegal,max=0,min=0){
  if(max == 0 && min == 0){
    max = data[0]
    min = data[0]
    for (i = 0; i < data.length; i++) {
      if(data[i]==0 && zeroIllegal)break
      if(data[i]>max){max = data[i]}
      if(data[i]<min){min = data[i]}
    }
  }
  if(max==min)return

  average = Num_round(height / (max - min),4)
  gap = width/(data.length-1)

  ctx.lineWidth = 6
  ctx.strokeStyle = "white"
  ctx.beginPath()
  data[0] = Num_round(height - (data[0]-min)*average,1)
  ctx.moveTo(0,data[0])
  for(var i = 1;i<data.length;i++){
    data[i] =  Num_round(height - (data[i]-min)*average,1)
    ctx.lineTo(i*(drawGap+chartItemWidth)+SimChartItemWidth,data[i])
  }
  ctx.stroke()
}

function drawHorizontalLine(level,color,Ctx,CtxHeight,width,CAverage,Min){
    // heighted
    level = Num_round(CtxHeight - (level-Min)*CAverage,3)
    Ctx.lineWidth = 2;
    Ctx.strokeStyle = color;//#FF5C5C
    // console.log("Ctx",Ctx)
    Ctx.beginPath();
    Ctx.moveTo(0,level)
    Ctx.lineTo(width,level)
    Ctx.stroke();
}


}


// ______trade machine functions____________________________________________________________________________
{
//tredemechine
//全数输入
// The inputed Num get max _____FUNCTION
function allIn(index){
  switch(index){
    case 1:
      changeNoCanBuy()
      EleWillBuy.value = (EleWillBuy.placeholder)/2
      checkOnWillBuy()
      Plus100x(1,0)
      break
      // console.log(EleWillBuy)
    case 2:
      EleWillSale.value = (UnlockedNum)/2
      checkOnWillSale()
      Plus100x(2,0)
      break
      // console.log(EleWillSale)
  }
}
//数量输入乘x
// The inputed Num times x _____FUNCTION
function Plus100x(flag,mutip){
  if(flag == 1){
    changeNoCanBuy()
    // console.log("plus")
    // console.log( Number(EleWillBuy.value))
    num = Number(EleWillBuy.value) + 100*mutip
    if(num<0 || Number.isNaN(num)){num=0}
    EleWillBuy.value = num
    checkOnWillBuy()
  }
  if(flag == 2){
    changeNoUnlockedNum()
    num = Number(EleWillSale.value) + 100*mutip
    if(num<0 || Number.isNaN(num)){num=0}
    EleWillSale.value = num

    checkOnWillSale()
  }
}


//要买检验
//检查要买数量输入的合理性
// check The inputed Num for reasonability _____FUNCTION
function onInputChange(event){
  changeNoCanBuy()
  checkOnWillBuy()
}
//检查要买数量的合理性
// check The Num for reasonability _____FUNCTION
function checkOnWillBuy(){
  willbuy = Number(EleWillBuy.value)
  placeholder = Number(EleWillBuy.placeholder)
  var money = willbuy*Number(pointPrice.textContent)
  if(money*0.0005>5){
    money = money + Number((money*0.0005).toFixed(2))
  }else if(money>0){
    money = money + 5
  }
  if (willbuy > placeholder || willbuy === 0 || ((willbuy/100) % 1) !== 0) {
    EleWillBuy.style.color = "red";
    if(willbuy === 0){EleWillBuy.style.color = "black";}
  }else{
    EleWillBuy.style.color = "black";
  }
  money = Num_round(money,2)

  EleMoneyNeed.textContent = "金额：" + money
}


//要卖检验
//检查要卖数量输入的合理性
// check The inputed Num for reasonability _____FUNCTION
function onInputChange2(event){
  checkOnWillSale()
}
//检查要卖数量的合理性
// check The Num for reasonability _____FUNCTION
function checkOnWillSale(){
  // console.log("log zhihuishu")
  changeNoUnlockedNum()
  willsale = Number(EleWillSale.value)
  var money = willsale*Number(pointPrice.textContent)
  // console.log(willsale,UnlockedNum,money)
  if(willsale > UnlockedNum){
    EleWillSale.style.color = "red";
  }else{
    EleWillSale.style.color = "black";
  }
  money = Num_round(money,2)
  EleMoneyNeed.textContent = "金额：" + money
}


//转锁定为流动
// Unlock The Num_____FUNCTION
function UnlockTheNum(flag){
  if(flag){
    TodayStartMoney = ToltalValue
    if(LockedNum>0){
      UnlockedNum = UnlockedNum + LockedNum
      LockedNum = 0
      changeNoUnlockedNum()
      changeNoLockedNum(true,0)
    }
  }

  changeNoToltalCapitalisation()
  changeOnToltalValue()

  changeOnToltalProfit()
  changeOnTodayProfit()
}
//流动数量的更新
// UnlockedNum update_____FUNCTION
function changeNoUnlockedNum(){
  // console.log("_ _changeNoUnlockedNum",UnlockedNum);
  EleWillSale.placeholder = UnlockedNum
  EleUnlockedNum.textContent = "流动数量：" + UnlockedNum
}
//锁定数量的更新
// lockedNum update_____FUNCTION
function changeNoLockedNum(flag,willbuy){
  willbuy = Number(willbuy)
  // console.log("_______willbuy",willbuy,56);
  if(flag){LockedNum = 0}
  else{LockedNum +=willbuy}
  // console.log("_ _LockedNum",LockedNum);
  EleLockedNum.textContent = "锁定数量："+ LockedNum
  // PrintLimitT_MachineVariables("changeNoLockedNum")
}

//总盈亏的更新
// Toltal's Profit update_____FUNCTION
function changeOnToltalProfit(){
  // 总盈亏
  var distace = Number((ToltalValue-RawMoney).toFixed(2))
  //colors
  if(distace<0){
    EleToltalProfitMoney.style.color = "#20f918"
    // EleToltalProfit.style.color = "#20f918"
    // EleToltalValue.style.color = "#20f918"
  }else if(distace > 0){
    EleToltalProfitMoney.style.color = "red"
    // EleToltalProfit.style.color = "red"
    // EleToltalValue.style.color = "red"
  }else{
    EleToltalProfitMoney.style.color = "white"
    // EleToltalProfit.style.color = "white"
    // EleToltalValue.style.color = "white"
  }
  var rate = '<p>总盈亏%：'+Num_round((ToltalValue-RawMoney)/RawMoney*100,3)+"%</p>"  
  EleToltalProfitMoney.innerHTML = "总盈亏：" + distace + "  " + rate

  // 当前总盈亏
  var changeRate = 0
  if(AveragePrice == 0){}
  else{changeRate = Num_round(Number(((pointPrice.textContent)-AveragePrice)/AveragePrice*100),3)}

  // console.log(distace,RawMoney,ToltalValue,ToltalValue-RawMoney)
  // EleToltalProfit.textContent = (distace/RawMoney).toFixed(3)+"%"
  if(changeRate<0){
    EleToltalProfit.style.color = "#20f918"
  }else if(distace > 0){
    EleToltalProfit.style.color = "red"
  }else{
    EleToltalProfit.style.color = "white"
  }
  EleToltalProfit.textContent = changeRate+"%"
}
//当日盈亏的更新
// Today's Profit update_____FUNCTION
function changeOnTodayProfit(){
  var distace = Number((ToltalValue-TodayStartMoney).toFixed(2))
  // console.log(distace,TodayStartMoney,ToltalValue)
  if(Number.isNaN(distace)){
    distace = 0;
  }
  if(distace<0){
    EleTodayProfitMoney.style.color = "#20f918"
  }else if(distace > 0){
    EleTodayProfitMoney.style.color = "red"
  }else{
    EleTodayProfitMoney.style.color = "white"
  }
  // console.log(distace,RawMoney,ToltalValue,TodayStartMoney-ToltalValue)

  var rate = '<p>当日盈亏%：'+0+"%</p>" 
  if(ToltalCapitalisation == 0){}
  else{rate = '<p>当日盈亏%：'+Num_round(distace/ToltalCapitalisation*100,3)+"%</p>"}

  EleTodayProfitMoney.innerHTML = "当日盈亏：" + distace +"  " + rate
  // EleTodayProfit.textContent = "当日盈亏%：" + ((ToltalValue-TodayStartMoney)/ToltalValue).toFixed(3)+"%"
}


//可用金额的更新——————充值
// Useable Money update__charge money___FUNCTION
function changeOnUseableMoney(changeNum,flag=false){
  if(flag){
    const willChange = Number(EleChangeUseableMoney.value)
    if(willChange>0){
      useableMoney = useableMoney + willChange
    }
    else if(willChange<0 && useableMoney>Math.abs(willChange)){
      useableMoney += willChange
    }
    RawMoney += willChange
    // console.log(RawMoney)
  }else{
    useableMoney += changeNum
  }
  // console.log("useableMoney",useableMoney)
  // PrintLimitT_MachineVariables("changeOnUseableMoney")
  EleUseableMoney.textContent = "可用金额："+useableMoney.toFixed(2)
  changeNoCanBuy()
  changeOnToltalValue()
// console.log(Number(pointPrice.textContent))
}


//总资产的更新
// Toltal Value update_____FUNCTION
function changeOnToltalValue(){
  // PrintLimitT_MachineVariables("changeOnToltalValue")

  ToltalValue = (useableMoney + ToltalCapitalisation)
  // console.log("_ _ooppppppooo",useableMoney,ToltalCapitalisation,ToltalValue)
  EleToltalValue.textContent = "总资产："+ToltalValue.toFixed(2)

  // PrintLimitT_MachineVariables("changeOnToltalValue")

}


//可买数量的更新
// CanBuy Num update_____FUNCTION
function changeNoCanBuy(){
  // console.log(useableMoney,Number(pointPrice.textContent))

  num = 100*(Math.floor(useableMoney/Number(pointPrice.textContent)/100))
  // console.log("marked num",num)

  if(num == Infinity){num = 0}

  var money = num*Number(pointPrice.textContent)
  var loopFlag = true

  while(loopFlag){
    if(money*0.0005>5){
      money = Num_round(money + Number((money*0.0005).toFixed(2)),2)
    }else if(money>0){
      money = money + 5
    }
    // console.log("changeNoCanBuy","money",money,"useableMoney",useableMoney)
    if(money>useableMoney){
      // console.log("useableMoney","UNenough")
      if(num>=200){
        num = num-100
        money = Num_round(money + Number((money*0.0005).toFixed(2)),2)
      }else{
        num = 0
        loopFlag = false
      }
    }else{
      // console.log("useableMoney","enough")
      loopFlag = false
    }
  }

  // console.log("EleWillBuy placeholder",num)
  EleWillBuy.placeholder = num
}


//总市值的更新
// UnlockedNum update_____FUNCTION
function changeNoToltalCapitalisation(){
  // PrintLimitT_MachineVariables("changeNoToltalCapitalisation")

  ToltalCapitalisation = (LockedNum + UnlockedNum)*Number(pointPrice.textContent)
  EleToltalCapitalisation.textContent = "总市值："+ ToltalCapitalisation
  // console.log("trade",ToltalCapitalisation,UnlockedNum,Number(pointPrice.textContent))
  changeNoAveragePrice()

  // PrintLimitT_MachineVariables("changeNoToltalCapitalisation")

}
//成本的更新
// UnlockedNum update_____FUNCTION
function changeNoAveragePrice(){
  if((LockedNum + UnlockedNum)==0){
    AveragePrice = 0
    EleAveragePrice.innerHTML = "成本："+ AveragePrice
    return
  }
  // console.log(ToltalCost)
  AveragePrice = Number((ToltalCost/(LockedNum + UnlockedNum)).toFixed(2))
  // if(Number.isNaN(AveragePrice)){AveragePrice = 0}
  // console.log(AveragePrice)
  // EleAveragePrice.textContent = "成本："+ AveragePrice
  changeRate = Number(((pointPrice.textContent)-AveragePrice)/AveragePrice*100)
  if(changeRate>0){
    EleAveragePrice.style.color = "red"
  }else if(changeRate<0){
    EleAveragePrice.style.color = "#20f918"
  }else{
    EleAveragePrice.style.color = "white"
  }
  // rate = '<p>盈ppp亏：'+changeRate.toFixed(3)+"%</p>"  
  // EleAveragePrice.innerHTML = "成本："+ AveragePrice +"  "+ rate

  EleAveragePrice.innerHTML = "成本："+ AveragePrice
  // EleToltalProfit.textContent = changeRate+"%"
}

//要买入数量变化的更新
// going to buy change update_____FUNCTION
function ToBuy(){
  changeNoCanBuy()
  // console.log("opopopopopop",EleWillBuy.value,EleWillBuy.placeholder,Number(EleWillBuy.value))
  // console.log(EleWillBuy,Number(EleWillBuy.value))
  var willbuy = Number(EleWillBuy.value)
  var willbuyPlaceholder = Number(EleWillBuy.placeholder)
  // console.log(willbuy,willbuyPlaceholder)
  if (willbuy > willbuyPlaceholder || ((willbuy/100) % 1) !== 0) {
    EleWillBuy.style.color = "red";
  }else{
    if(willbuy === 0 && willbuyPlaceholder>0){
      willbuy = willbuyPlaceholder
    }
    if(willbuy>0){
      money = willbuy*Number(pointPrice.textContent)
      if(money*0.0005>5){
        money = money + Number((money*0.0005).toFixed(2))
      }else{
        money = money + 5
      }
      changeOnUseableMoney(-money,flag=false)
      ToltalCost += money
      changeNoCanBuy()
      changeNoLockedNum(false,willbuy)
      EleWillBuy.value = ""
      changeNoToltalCapitalisation()
      changeOnToltalValue()
    }
  }
  changeOnToltalProfit()
  changeOnTodayProfit()

  checkOnWillBuy()
  // EleWillBuy.value
}
//要卖出数量变化的更新
// going to sale change update_____FUNCTION
function ToSale(){
  // console.log(EleWillSale,EleWillSale.value)
  var willsale = Number(EleWillSale.value)
  var willsalePlaceholder = Number(EleWillSale.placeholder)

  if(willsale > UnlockedNum || willsale<0){
    EleWillSale.style.color = "red";
    return
  }else{
    // console.log("pppppppppsale",willsale,willsalePlaceholder)

    if(willsale == 0 && willsalePlaceholder>0){
      willsale = willsalePlaceholder
    }
    // console.log("pppppppppsale2",willsale,willsalePlaceholder)

    if(willsale > 0 ){
      money = willsale*Number(pointPrice.textContent)
      // console.log(money,"sale")

      changeOnUseableMoney(money,flag=false)
      ToltalCost = Number((ToltalCost*((UnlockedNum-willsale)/UnlockedNum)).toFixed(2))
      changeNoCanBuy()
      UnlockedNum = UnlockedNum - willsale
      checkOnWillSale()
      EleWillSale.value = ""
      changeNoToltalCapitalisation()
      changeOnToltalValue()
    }
  }
  changeOnToltalProfit()
  changeOnTodayProfit()

  checkOnWillBuy()

  changeNoAveragePrice()
  // EleWillBuy.value
}

function initTradeZero(){
  EleToltalProfit.textContent = 0+"%"
  EleTodayProfitMoney.textContent = "当日盈亏：" + 0
  EleUnlockedNum.textContent = "流动数量：" + 0
  EleLockedNum.textContent = "锁定数量："+ 0
  EleToltalCapitalisation.textContent = "总市值："+ 0
  EleToltalValue.textContent = "总资产："+0
  EleUseableMoney.textContent = "可用金额："+0
}



//可买数量 = floor（可用金额/现价）*100
//总市值 = （锁定数量 + 流动数量）* 现价
//均价 = 总市值 /（锁定数量+流动数量）
//总盈亏 = 原资产 - 总资产
//可用金额 = 今日卖出*现价 + 原可用金额
//当日盈亏 = 总市值 - 总资产
//流动数量 = 流动数量+上一锁定数量-今日卖出
//锁定数量 = 0+今日买入
//总资产 = 总市值 + 可用金额 ######
}


// _____server get data_____________________________________________________________________________
{
// unkonwn    FUNCTION
function getStockData_Five_ForDraw(date,kdataItem,count){
// console.log(responseLocal.code,currentOffsetX-1,responseLocal.Kdata[currentOffsetX-1][0])
var data ={
      "codeShort":responseLocal.code,
      "dateOn":date
    }
$.ajax({
    url: '/getStockK5Data',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),  // 打包为JSON格式
    success: function(response) {
      // console.log(response)
      responseFiveMinsLineCopy = response
      // console.log("responseFiveMinsLineCopy",responseFiveMinsLineCopy)
      fiveMinsLine(kdataItem,count,-1)
    },
    error: function(error) {
        $('#result').text('Error:', error);
    }
  });
}
// get five data    FUNCTION
function getStockData_Five(){
// console.log(responseLocal.code,currentOffsetX-1,responseLocal.Kdata[currentOffsetX-1][0])
var data ={
      "codeShort":responseLocal.code,
      "dateOn":responseLocal.Kdata[currentOffsetX-1][0]
    }
$.ajax({
    url: '/getStockK5Data',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),  // 打包为JSON格式
    success: function(response) {
      console.log(response)
      responseFiveCopy = response
      console.log("getStockData_Five",responseFiveCopy)
      currentOffsetXFive = 0
      document.getElementById("btn_nextFive").style.background = "#F0F0F0"
      nextFive()
    },
    error: function(error) {
        $('#result').text('Error:', error);
    }
  });
}
// get day data    FUNCTION  fixed
function getStockData(){
  refreshBtn.style.border =  "1px solid rgb(214, 92, 21)"
  refreshBtn.style.color =  "rgb(214, 92, 21)"
  refreshBtn.onclick = null;
  MAINctx.clearRect(0,0,MAINcanvas.width,MAINcanvas.height)
  responseLocal = []
  VisibleData = []
$.ajax({
    url: '/getStockData',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"code":codeShort.value,"fromDate":dateFromChoice,"type":dayWeekChoice}),  // 打包为JSON格式
    success: function(response) {
      refreshBtn.style.border =  "1px solid aqua"
      refreshBtn.style.color =  "aqua"
      refreshBtn.onclick = getStockData;

      console.log("response",response)
      responseLocal = response
      console.log(responseLocal);
      windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
      basicDataLength = responseLocal[1].length
      subDataLength = (responseLocal[0][0].length-1)/5+1
      FinalSubDataLength = subDataLength
      for (let i = 0; i < subDataLength; i++) {
        FinalSubDataLength = i;
        if (responseLocal[0][responseLocal[0].length-1][i] == 0) {
          break
        }
      }
      if(basicDataLength>windowLength){
        maxStartIndex = basicDataLength-windowLength;//刚好对应下标
      }
      else{
        maxStartIndex = 0;
      }  
      if(reviewModleCheckbox.checked){
        startIndex = -1;
        subEndIndex = 0;
        pointIndex = -1;
        availableStartIndex = -1;
      }else{
        startIndex = maxStartIndex;
        pointIndex = basicDataLength-1;
        subEndIndex = subDataLength;
        availableStartIndex = maxStartIndex;
      }

      IVCD_data1 = [[],[],[],[],[]]
      IVCD_data2 = [[],[],[],[],[]]
      IVCD_data3 = [[],[],[],[],[]]
      IVCD_data4 = [[],[],[],[],[]]
      IVCD_data5 = [[],[],[],[],[]]

      RSI_SMA = []
      BIAS_QLs_S_MA = []
      Price_Average_Line = []
      BB_Index = []
      BB_Index2 = []
      NKD_RSV = []
      IVCD_data = []
      PRE_data = []
      Price_Average_Line_H = []
      XZC_data = []
      KDJ_data = []
      YYX_data = []

      //trade machine
      chatgedMoney = 0;
      CanBuy = 0;
      ToltalCapitalisation = 0;
      ToltalCost = 0;
      useableMoney = 0;
      ToltalValue = 0;
      UnlockedNum = 0;
      LockedNum = 0;
      UnlockedNum = 0;
      RawMoney = 0;
      TodayStartMoney = 0;
      //     UnlockTheNum(true)
      EleChangeUseableMoney.value = 10000
      // PrintLimitT_MachineVariables("rezero")
      initTradeZero()


      changeOnUseableMoney(0,true)

      PrintLimitPositionVariables("getStockData")
      // refreshDraw()
      selectrefreshDraw(select__,1,"green")
      limitPriceSale()
    },
    error: function(error) {
        refreshBtn.style.border =  "1px solid aqua"
        refreshBtn.style.color =  "aqua"
        refreshBtn.onclick = getStockData;
        // $('#result').text('Error:', error);
        console.log("getStockData wrong",error)
    }
  });
}
// get local ip
function exploreSimpleReqest(type,data){//pickup,open
  // console.log("exploreSimpleReqest(type,data,ele)",type,data,ele)
  $.ajax({
      url: '/explore/exploreSimpleReqest',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"agent":"explore","type":type,"data":data}),  // 打包为JSON格式
      success: function(response) {
          // console.log(response)
          if(response[0]=="successfully!"){
            var ip = "http://"+response[1]+":5000/chart"
            console.log(ip);
            local_ip.textContent = ip
            copyToClipboard(ip)
          }else{
            local_ip.textContent = "fail"
          }
      },
      error: function(error) {
      }
  })
}
async function copyToClipboard(text) {
  try {
      await navigator.clipboard.writeText(text);
      console.log("复制成功！");
  } catch (error) {
      console.error("复制失败:", error);
  }
}
}


// ______others____________________________________________________________________________
{
var socket = io();
// var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('server_response', function(data) {
    var message = data.data;
    console.log(message)
    if(message[0]=="open"){
      codeShort.type = "text"
      codeShort.value = message[1][0]
      // console.log(message[1][0])
      codeShort.type = "number"
      getStockData()
    }
});

function IndexSwitch(ind,target){
  if(IndexsSwitch[ind] == 1){
    IndexsSwitch[ind] = 0
    target.style.background = '';
    target.style.color = 'white';
  }else{
    IndexsSwitch[ind] = 1
    target.style.color = 'black';
    target.style.background = 'white';
  }
  refreshDraw(IndexsSwitch)
}
function deepCopyArray(arr) {
  // deep copy slice array
  return arr.map(item => {
    if (Array.isArray(item)) {
      return deepCopyArray(item);
    } else if (item && typeof item === 'object') {
      return JSON.parse(JSON.stringify(item));
    } else {
      return item;
    }
  });
}
// add Event listener to element    FUNCTION  fixed
// buy and sale listener
document.addEventListener('DOMContentLoaded', function() {
  // trade machine
  var inputElement1 = document.getElementById('WillBuy');
  var inputElement2 = document.getElementById('WillSale');
  inputElement1.addEventListener('input', onInputChange);
  inputElement1.addEventListener('click', onInputChange);
  inputElement2.addEventListener('input', onInputChange2);
  inputElement2.addEventListener('click', onInputChange2);

  // day week levels choce
  var dayWeekContiner = document.getElementById("dayWeekContiner")
  dayWeekContiner.addEventListener("click",function(event){
      // 检查是否点击了容器内的子元素
    if (event.target !== dayWeekContiner) {
      dayWeekContiner.querySelectorAll('*').forEach(child => {
          child.style.background = '';
          child.style.color = 'white';
      });
      event.target.style.color = 'black';
      event.target.style.background = 'white';
      dayWeekChoice = event.target.textContent
      console.log(dayWeekChoice);
    }
  })

  // date from where
  var dateFromContiner = document.getElementById("dateFromContiner")
  dateFromContiner.addEventListener("click",function(event){
      // 检查是否点击了容器内的子元素
    if (event.target !== dayWeekContiner) {
      dateFromContiner.querySelectorAll('*').forEach(child => {
          child.style.background = '';
          child.style.color = 'white';
      });
      event.target.style.color = 'black';
      event.target.style.background = 'white';
      dateFromChoice = event.target.textContent
      // var dateFrom = ["2025-01-01","2024-06-01","2024-01-01","2023-06-01","2023-01-01","2022-06-01","2022-01-01","2021-01-01","2020-06-01"]
      switch(dateFromChoice){
        case "25.1":dateFromChoice = "2025-01-01";break
        case "24.6":dateFromChoice = "2024-06-01";break
        case "24.1":dateFromChoice = "2024-01-01";break
        case "23.6":dateFromChoice = "2023-06-01";break
        case "23.1":dateFromChoice = "2023-01-01";break
        case "22.6":dateFromChoice = "2022-06-01";break
        case "22.1":dateFromChoice = "2022-01-01";break
        case "21.6":dateFromChoice = "2021-06-01";break
        case "21.1":dateFromChoice = "2021-01-01";break
        case "20.6":dateFromChoice = "2020-06-01";break
        default:dateFromChoice = "2025-01-01"
      }
      console.log(dateFromChoice);
    }
  })
});
// author: moogiegik

// run when open    FUNCTION  fixed
window.onload = function() {
  // 监听图标容器变化
  // 选择需要监听的元素
  // const element = document.getElementById('Mainchart');
  // 创建 ResizeObserver 实例
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      console.log(`Width: ${width}, Height: ${height}`);
      MainchartWidth = 2*width;
      MainchartHeight = 2*height;
      SubchartWidth = MainchartWidth
      SubchartHeight = Num_round(MainchartHeight/74*18.5,2)
      MaskchartHeight = MainchartHeight/74*97
      if(responseLocal.length!=0){
        console.log("change window size refreshDraw()");
        reinitVarialsForZoom();
        refreshDraw(IndexsSwitch)
      }
      windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
      console.log(`Width: ${width}, Height: ${height}`,"windowLength:",windowLength);
      PrintLimitPositionVariables("init",true)

      selectrefreshDraw(select__,1,"green")
      // getStockData()
    }
  });
  // 监听该元素
  resizeObserver.observe(Mainchart);
  getStockData()

}

// draw test    FUNCTION
function drawTest(x,y,X,Y){
  console.log("drawtest",x,y,X,Y)
  MAINctx.strokeRect(x,y,X,Y);
}
// console log the conmmon variable    FUNCTION
function InfoOfOffsetX(flag){
  console.log(flag)
  console.log(
    "offsetX",offsetX,"\n",
    "currentOffsetXFive",currentOffsetXFive,"\n",
    "currentOffsetXMaxForScroll",currentOffsetXMaxForScroll,"\n",
    "offsetXMaxForScroll",offsetXMaxForScroll,"\n",
    "offsetXMaxForALL",offsetXMaxForALL,"\n",
    "currentOffsetX",currentOffsetX,"\n",
    "VisibleMax",VisibleMax,"\n",
    )
}
// author: moogiegik
// console log Limi tPosition Variables    FUNCTION
function PrintLimitPositionVariables(info,shortflag=false){
  console.log(info+" start:+++++++++++++++++++++++")
  if(shortflag){
    console.log(
      "drawGap",drawGap,"\n",
      "chartItemWidth",chartItemWidth,"\n",
      "MainchartHeight",MainchartHeight,"\n",
      "MainchartWidth",MainchartWidth,"\n",
      "SubchartHeight",SubchartHeight,"",
    )
  }
  console.log(
    "windowLength",windowLength,"\n",
    "basicDataLength",basicDataLength,"\n",
    "subDataLength",subDataLength,"\n",
    "FinalSubDataLength",FinalSubDataLength,"\n",
    "maxStartIndex",maxStartIndex,"\n",
    "startIndex",startIndex,"\n",
    "subEndIndex",subEndIndex,"\n",
    "pointIndex",pointIndex,"\n",
    "availableStartIndex",availableStartIndex,"\n",
    )
    console.log(info+" end:------------------------")
}
function PrintLimitT_MachineVariables(info,shortflag=true){
  console.log(info+" start:+++++++++++++++++++++++")
  if(shortflag){
    console.log(
      "chatgedMoney",chatgedMoney,"\n",
      "CanBuy",CanBuy,"\n",
      "ToltalCapitalisation",ToltalCapitalisation,"\n",
      "ToltalCost",ToltalCost,"\n",
      "useableMoney",useableMoney,"\n",
      "ToltalValue",ToltalValue,"\n",
      "LockedNum",LockedNum,"\n",
      "UnlockedNum",UnlockedNum,"\n",
      "brokerage",brokerage,"\n",
      "RawMoney",RawMoney,"","\n",
      "TodayStartMoney",TodayStartMoney,"\n"
    )
  }
  console.log(
    )
    console.log(info+" end:------------------------")
}
}