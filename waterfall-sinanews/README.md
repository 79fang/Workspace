## waterfall-sinanews
预览地址

## 实现原理



## 懒加载原理
#### 判断是否出现在视野,然后加载
```
    function checkShow() {
      if (isShow($('#load'))) {
        loadAndPlace();
      }
    }
```
#### 用isShow判断是否出现在视野
```
    function isShow($el) {
      var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = $el.offset().top;

      if (top < winH + scrollH) {
        return true;
      } else {
        return false;
      }
    }
```
#### 获取数据，并且摆放位置
```
    var curPage = 1,     //当前页
      perPageCount = 10;   //每次获取数

    function loadAndPlace() {
      $.ajax({
        url: 'https://photo.sina.cn/aj/v2/index?cate=military',
        dataType: 'jsonp',
        jsonp: "callback",
        data: {
          pagesize: perPageCount,
          page: curPage
        }
      }).done(function (ret) {
        if (ret && ret.code == 1) {
          place(ret.data);//如果数据没问题，那么生成节点并摆放好位置
          curPage++
        } else {
          console.log('get error data')
        }
      })
    }

    function place(nodeList) {
      console.log(nodeList)
      $.each(nodeList, function (index, item) {
        var $node = getNode(item)
        $node.find('img').load(function () {
          $('#pic-ct').append($node)
          waterFallPlace($node)
        })
      })


      var $nodes = renderData(nodeList);   //节点生成后添加到页面上

      var defereds = [];    //创建存储 defered 对象的数组
      $nodes.find('img').each(function () {
        var defer = $.Deferred();
        $(this).load(function () {
          defer.resolve();
        })  //当每个图片加载完成后，执行 resolve
        defereds.push(defer)
      })
      $.when.apply(null, defereds).done(function () {  //当所有的图片都执行 resolve 后，即全部图片加载后，执行下面的内容
        console.log('new images all loaded...')
        //当节点里的图片全部加载后再使用瀑布流计算，否则会因为图片未加载 item 高度计算错误导致瀑布流高度计算出问题
        waterFallPlace($nodes)
      })
    }
```
## 瀑布流原理
   

```
    var colSumHeight = []
    nodeWidth = $('.item').outerWidth(true),
      colNum = parseInt($('#pic-ct').width() / nodeWidth)

    for (var i = 0; i < colNum; i++) {
      colSumHeight.push(0)
    }

    function waterFallPlace($nodes) {
      $nodes.each(function () {
        var $cur = $(this);
        //colSumHeight = [100, 250, 80, 200]

        var idx = 0,
          minSumHeight = colSumHeight[0];

        for (var i = 0; i < colSumHeight.length; i++) {
          if (colSumHeight[i] < minSumHeight) {
            idx = i;
            minSumHeight = colSumHeight[i];
          }
        }
        $cur.css({
          left: nodeWidth * idx,
          top: minSumHeight,
          opacity: 1

        });
        colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx];
        $('#pic-ct').height(Math.max.apply(null, colSumHeight));


      })
    }

    function getNode(item) {
      var tpl = ''
      tpl += '<li class="item">';
      tpl += ' <a href="' + item.url + '" class="link"><img src="' + item.img_url + '" alt=""></a>';
      tpl += ' <h4 class="header">' + item.name + '</h4>';
      if (item.short_intro) {
        tpl += '<p class="desp">' + item.short_intro + '</p>';
      }

      tpl += '</li>';

      return $(tpl)
    }
```

   #### 拼装dom
```
    function renderData(items) {
      var tpl = '',
        $nodes;
      for (var i = 0; i < items.length; i++) {
        tpl += '<li class="item">';
        tpl += ' <a href="' + items[i].url + '" class="link"><img src="' + items[i].thumb + '" alt=""></a>';
        tpl += ' <h4 class="header">' + items[i].stitle + '</h4>';

        tpl += '<p class="desp">' + items[i].title + '</p>';


        tpl += '</li>';
      }
      $nodes = $(tpl);
      $('#pic-ct').append($nodes);
      return $nodes;
    }
```


