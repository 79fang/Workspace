// console.log('js已连接')


// 1-事件中心
var EventCenter = {
  on: function (type, handler) {
    $(document).on(type, handler)
  },
  fire: function (type, data) {
    $(document).trigger(type, data)
  }
}
// EventCenter.on('hello', function (e, data) {
//   console.log(data)
// })
// EventCenter.fire('hello', '你好')
// 事件中心end


// 2-Footer区域
var Footer = {

  // 初始化
  init: function () {
    this.$footer = $('footer')
    this.$ul = this.$footer.find('ul')
    this.$box = this.$footer.find('.box')
    this.$leftBtn = this.$footer.find('.icon-left')
    this.$rightBtn = this.$footer.find('.icon-right')
    this.isToEnd = false
    this.isToStart = true
    this.isAnimate = false  //防止点击过快


    //绑定数据
    this.bind()
    //开始渲染
    this.render()
  },

  // 绑定事件
  bind: function () {
    var _this = this
    $(window).resize(function () {
      _this.setStyle()
    })

    // 滚动-右
    this.$rightBtn.on('click', function () {
      if (_this.animate) return
      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width() / itemWidth)

      if (!_this.isToEnd) {
        _this.animate = true
        _this.$ul.animate({
          left: '-=' + rowCount * itemWidth
        }, 300, function () {
          _this.animate = false
          // console.log(parseFloat(_this.$box.width()) - parseFloat(_this.$ul.css('left')))
          _this.isToStart = false
          if (parseFloat(_this.$box.width()) - parseFloat(_this.$ul.css('left')) >= parseFloat(_this.$ul.css('width'))) {
            // console.log('over')
            _this.isToEnd = true
            // _this.$rightBtn.addClass('disabled')
          }
          // console.log(_this.$ul.css('left'))
          // console.log(_this.$ul.css('width'))
        })
      }
    })

    // 滚动-左
    this.$leftBtn.on('click', function () {
      if (_this.animate) return
      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width() / itemWidth)
      if (!_this.isToStart) {
        _this.animate = true
        _this.$ul.animate({
          left: '+=' + rowCount * itemWidth
        }, 300, function () {
          _this.animate = false
          _this.isToEnd = false
          if (parseFloat(_this.$ul.css('left')) >= 0) {
            _this.isToStart = true
          }
        })
      }
    })

    //点击触发,用事件代理
    this.$footer.on('click', 'li', function () {
      $(this).addClass('active')
        .siblings().removeClass('active')
      EventCenter.fire('select-album', {
        channelId: $(this).attr('data-channel-id'),
        channelName: $(this).attr('data-channel-name')
      })
    })
  },   //// 绑定事件end


  // 获取数据
  render() {
    var _this = this
    $.getJSON('http://api.jirengu.com/fm/getChannels.php').done(function (ret) {
      console.log('拿到的数据:' + ret)
      _this.renderFooter(ret.channels)
    }).fail(function () {
      console.log('error')
    })
  },


  //渲染数据
  renderFooter: function (channels) {
    console.log(channels)
    var html = ''
    channels.forEach(function (channel) {
      //注意两个属性之间要有空格
      html += '<li data-channel-id=' + channel.channel_id + ' data-channel-name=' + channel.name + '>'
        + '   <div class="cover" style="background-image:url(' + channel.cover_small + ')"><div>'
        + '   <h3>' + channel.name + '</h3>'
        + '</li>'
    })
    this.$ul.html(html)
    this.setStyle()
  },


  setStyle: function () {
    var count = this.$footer.find('li').length
    var width = this.$footer.find('li').outerWidth(true)
    console.log(count, width)
    this.$ul.css({
      width: count * width + 'px'
    })
  },



  // 渲染
  // render: function () {

  // }

}
// 2-Footer区域end









// 播放页面
var Fm = {
  init: function () {
    this.$container = $('#page-music')
    this.audio = new Audio()
    this.audio.autoplay = true

    this.bind()
  },
  bind: function () {
    var _this = this
    EventCenter.on('select-album', function (e, channelObj) {
      _this.channelId = channelObj.channelId
      _this.channelName = channelObj.channelName
      _this.loadMusic()
      // console.log('select', channelId)
    })

    // 按键
    this.$container.find('.btn-play').on('click', function () {
      var $btn = $(this)
      if ($btn.hasClass('icon-play2')) {
        $btn.removeClass('icon-play2').addClass('icon-pause')
        _this.audio.play()
      } else {
        $btn.removeClass('icon-pause').addClass('icon-play2')
        _this.audio.pause()
      }
    })

    this.$container.find('.btn-next').on('click', function () {
      _this.loadMusic()
    })

    this.audio.addEventListener('play', function () {
      console.log('play')
      clearInterval(_this.statusClock)  //使点击下一曲开始,清理计时器
      _this.statusClock = setInterval(function () {
        _this.updateStatus()
      }, 1000)
    })

    this.audio.addEventListener('pause', function () {
      clearInterval(_this.statusClock)
      console.log('pause')
    })

  },  //bind end

  //加载音乐
  loadMusic(callback) {
    var _this = this
    // console.log('loadMusic...')
    $.getJSON('//jirenguapi.applinzi.com/fm/getSong.php', { channel: this.channelId }).done(function (ret) {
      // console.log(ret['song'][0])
      _this.song = ret['song'][0]
      _this.setMusic()
      _this.loadLyric()
    })
  },

  //加载歌词
  loadLyric() {
    var _this = this

    $.getJSON('//jirenguapi.applinzi.com/fm/getLyric.php', { sid: this.song.sid }).done(function (ret) {
      // console.log(ret.lyric)

      var lyric = ret.lyric
      var lyricObj = {}
      lyric.split('\n').forEach(function (line) {
        //[01:10.10][01:10.10]It a new day
        var times = line.match(/\d{2}:\d{2}/g)
        //times == ['01:10.10','01:10.10']
        var str = line.replace(/\[.+?\]/g, '')
        if (Array.isArray(times)) {
          times.forEach(function (time) {
            lyricObj[time] = str
          })
        }

      })
      _this.lyricObj = lyricObj
    })
  },




  setMusic() {
    console.log('set music...')
    console.log(this.song)
    this.audio.src = this.song.url   //Fm.audio.pause()
    $('.bg').css('background-image', 'url(' + this.song.picture + ')')
    this.$container.find('.aside figure').css('background-image', 'url(' + this.song.picture + ')')
    this.$container.find('.detail h1').text(this.song.title)

    this.$container.find('.detail .author').text(this.song.artist)
    this.$container.find('.tag').text(this.channelName)
    this.$container.find('.btn-play').removeClass('icon-play2').addClass('icon-pause')
  },
  //更新状态
  updateStatus() {
    var min = Math.floor(this.audio.currentTime / 60)
    var second = Math.floor(Fm.audio.currentTime % 60) + ''
    second = second.length === 2 ? second : '0' + second
    this.$container.find('.current-time').text(min + ':' + second)
    this.$container.find('.bar-progress').css('width', this.audio.currentTime / this.audio.duration * 100 + '%')
    // console.log('update...')
    var line = this.lyricObj['0' + min + ':' + second]
    if (line) {
      this.$container.find('.lyric p').text(line)
    }


    // console.log(this.lyricObj['0' + min + ':' + second])
  }
}
// 播放页面end


//Footer启动
Footer.init()
//Fm启动
Fm.init()

