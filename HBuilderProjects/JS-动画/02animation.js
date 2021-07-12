// el元素, property属性, target目标
//getComputedStyle 取得当前元素正在应用的样式 IE8之前不支持
//setInterval

function getStyle(el,property){
  if(getComputedStyle){
    return getComputedStyle(el)[property];
  }else{
    return el.currentStyle[property];  //兼容ie8
  }
}

// function animate(el, property,target){
function animate(el, properties){

  clearInterval(el.timerId);  //重置速度

  el.timerId= setInterval(function(){
    // var current=parseInt(getStyle(el,property));
    for(var property in properties){
      var current;
      var target = properties[property];
      if(property==='opacity'){
        current=Math.round(parseFloat(getStyle(el,'opacity'))*100)

      }else{
        current=parseInt(getStyle(el,property));

      }
      var speed =(target-current)/30;
       //speed取整
    speed = speed>0?Math.ceil(speed):Math.floor(speed);
    if(property==='opacity'){
      el.style.opacity=(current+speed)/100;
    }else{
      el.style[property] =current+ speed+'px';

    }
    }



  },20 )
}