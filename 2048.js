//创建4*4的数组并用其存放16个div元素
var boxes= document.querySelectorAll("#box>div");
var arr=[[],[],[],[]];
var num=0;
for(var i = 0;i <4;i++){
    for(var j = 0;j <4;j++){
        arr[i][j] = boxes[num];
        num++;
    }
}

//在4*4的随机位置产生数字2或4 ，出现可能的比例是1：4
function rand(){
    var x=Math.floor(Math.random()*4);
    var y=Math.floor(Math.random()*4);
    if(arr[x][y].innerHTML == ""){
        arr[x][y].innerHTML = Math.random() > 0.2 ? 2 : 4;  
    }else{
        rand();
    }
}

//设置数字背景颜色
function backcolor(){
    for(var i = 0;i <4;i++){
        for(var j = 0;j <4;j++){
            switch(arr[i][j].innerHTML){
                case '2': arr[i][j].style.backgroundColor = "#EEE4DA" ;break;
                case '4': arr[i][j].style.backgroundColor = "#EDE0C8" ;break;
                case '8': arr[i][j].style.backgroundColor = "#F2B179" ;break;
                case '16': arr[i][j].style.backgroundColor = "#F59563" ;break;
                case '32': arr[i][j].style.backgroundColor = "#F67C5F" ;break;
                case '64': arr[i][j].style.backgroundColor = "#F65E3B" ;break;
                case '128': arr[i][j].style.backgroundColor = "#EDCF72" ;break;
                case '256': arr[i][j].style.backgroundColor = "#EDCC61" ;break;
                case '512': arr[i][j].style.backgroundColor = "#EDC850" ;break;
                case '1024': arr[i][j].style.backgroundColor = "yellowgreen" ;break;
                case '2048': arr[i][j].style.backgroundColor = "perple" ;break;
                default:  arr[i][j].style.backgroundColor = "whitesmoke" ;break;

            }
        }
    }
}

//判断游戏是否结束
//1.是否填满16个方格
function ifgg(){
    var ifgg=true;
    for(var i = 0;i <4;i++){
        for(var j = 0;j <4;j++){
            if(arr[i][j].innerHTML==""){
                ifgg=false;
            }
        }
    }
    if(!ifgg){
        rand();
    }
//2.若填满，判断每一格周围是否有相同数字
    if(ifgg){
        for(var i = 0;i <3;i++){
            for(var j = 0;j <3;j++){
                if(arr[i][j].innerHTML==arr[i+1][j].innerHTML||arr[i][j].innerHTML==arr[i][j+1].innerHTML||arr[i+1][j+1].innerHTML==arr[i+1][j].innerHTML||arr[i+1][j+1].innerHTML==arr[i][j+1].innerHTML){
                    ifgg=false;
                }
            }
        }
    }
//3.如果游戏结束弹出Game Over！
    if(ifgg){
        alert("Game Over!")
    }
}

//游戏重新开始
function restart(){
    for(var i = 0;i <arr.length;i++){
        for(var j = 0;j <arr.length;j++){
            arr[i][j].innerHTML = ""; 
        }
    }
    backcolor();
    rand();
    rand();
}

//上移数字
function downup(){
    for(var i = 1;i <4;i++){
        for(var j = 0;j <4;j++){
            if( arr[i][j].innerHTML !=""&& arr[i-1][j].innerHTML==""){
                arr[i-1][j].innerHTML = arr[i][j].innerHTML;
                arr[i][j].innerHTML="";
                downup();
            }else if(arr[i][j].innerHTML !=""&& arr[i][j].innerHTML == arr[i-1][j].innerHTML){
                arr[i-1][j].innerHTML *=2;
                arr[i][j].innerHTML ="";
            } 
        
        }
    }
}

//下移数字
function downfoot(){
    for(var i = 0;i <3;i++){
        for(var j = 0;j <4;j++){
            if( arr[i][j].innerHTML !=""&& arr[i+1][j].innerHTML==""){
                arr[i+1][j].innerHTML = arr[i][j].innerHTML;
                arr[i][j].innerHTML="";
                downfoot();
            }else if(arr[i][j].innerHTML !=""&& arr[i][j].innerHTML == arr[i+1][j].innerHTML){
                arr[i+1][j].innerHTML *=2;
                arr[i][j].innerHTML ="";
            } 
        
        }
    }
}

//左移数字
function downleft(){
    for(var i = 0;i <4;i++){
        for(var j = 1;j <4;j++){
            if( arr[i][j].innerHTML !=""&& arr[i][j-1].innerHTML==""){
                arr[i][j-1].innerHTML = arr[i][j].innerHTML;
                arr[i][j].innerHTML="";
                downleft();
            }else if(arr[i][j].innerHTML !=""&& arr[i][j].innerHTML == arr[i][j-1].innerHTML){
                arr[i][j-1].innerHTML *=2;
                arr[i][j].innerHTML ="";
            } 
        
        }
    }
}

//右移数字
function downright(){
    for(var i = 0;i <4;i++){
        for(var j = 0;j <3;j++){
            if( arr[i][j].innerHTML !=""&& arr[i][j+1].innerHTML==""){
                arr[i][j+1].innerHTML = arr[i][j].innerHTML;
                arr[i][j].innerHTML="";
                downright();
            }else if( arr[i][j].innerHTML !=""&& arr[i][j].innerHTML == arr[i][j+1].innerHTML){
                arr[i][j+1].innerHTML *=2;
                arr[i][j].innerHTML ="";
            } 
        
        }
    }
}

//游戏开始前随机生成2个数
rand();
rand();
backcolor();

//上下左右的监听事件
window.onkeydown = function(e){ 
    switch(e.keyCode){
        case 37 :  ifgg(); downleft();backcolor();     break;//左
        case 38 :  ifgg(); downup();backcolor();     break;//上
        case 39 :  ifgg(); downright();backcolor();     break;//右
        case 40 :  ifgg(); downfoot(); backcolor();     break;//下
    } 
}