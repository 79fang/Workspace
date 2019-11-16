// 1.获取数据
// 2.把数据拼装成 dom 放到页面
// 3使用瀑布流去拜访 dom 位置

// function dosomething
// 1.获取page=1 的10条数据
// 2.把十条数据拼装成 dom 放到页面
// 3.使用瀑布流去摆放 dom 位置
// 4.page++



// 当 load 出现在眼前的时候

// 1.获取 page 的 十条数据
// 2.把十条数据拼装成 dom 放到页面
// 3.使用瀑布流去摆放dom位置
// 4.page++


//懒加载
var $target = $('#lead')

$(window).on('scroll', function () {
  checkShow();
})

checkShow();

function checkShow() {
  if (isShow($target)) {
    dosth()
  }
}

function isShow($el) {
  var scrollH = $(window).scrollTop(),
    winH = $(window).height(),
    top = $el.offset().top

  if (top < winH + scrollH) {
    return true;

  } else {
    return false;
  }
}

function dosth() {
  $.ajax({
    url: `https://photo.sina.cn/aj/v2/index?cate=military&pagesize=${perPageCount}&page=${curPage}`,
    dataType: 'jsonp',
    jsonp: "callback",
  }).done(function (ret) {
    if (ret && ret.code == 1) {   ////==1,数据没问题    20.00
      place(ret.data);//如果数据没问题，那么生成节点并摆放好位置
      curPage++
    } else {
      console.log('get error data')
    }
  })
}

///////////////
var curPage = 1      //定义当前页面是1
perPageCount = 30     //每页数量是30

// 核心代码

Exposure.init($('#load'), function () {    //当#load 曝光在视野
  console.log('show')
  getData(function (data) {               //获取数据
    var $nodes = renderData(data)        //把数据渲染到页面上
    WaterFall.start($nodes)             //把新增节点用瀑布流布局重新绘制
  })
})




/*
// 封装懒加载部分
var ExposureTarget = (function () {

  function bind($target, handler) {
    //// 懒加载
    $(window).on('scroll', function () {
      checkShow();
    })

    checkShow();

    function checkShow() {
      if (isShow($target)) {
        handler()   //handler 即dosth
      }
    }

    function isShow($el) {
      var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top

      if (top < winH + scrollH) {
        return true;

      } else {
        return false;
      }
    }

  }



  return {
    bind: bind
  }
})()
//调用已封装的懒加载
//ExposureTarget.bind($('#lead'),dosth)
function dosth() {

}

var $target = $('#lead')
*/
