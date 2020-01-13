function Carousel($ct) {
  this.init($ct)
  this.bind()
}

Carousel.prototype = {
  init: function ($ct) {
    this.$ct = $ct
    this.$imgCt = this.$ct.find('.img-ct')
    this.$imgs = this.$ct.find('img-ct >li')
    console.log(this.$ct.find('img-ct >li'))
    this.$preBtn = this.$ct.find('.pre')
    this.$nextBtn = this.$ct.find('.next')
    this.$bullets = this.$ct.find('.bullet li')

    this.imgWidth = this.$imgs.width()
    this.imgCount = this.$imgs.length
    console.log('before..')

    this.$imgCt.append(this.$imgs.first().clone())
    this.$imgCt.prepend(this.$imgs.last().clone())

    this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
    //     初始化偏移
    // this.$imgCt.css({ left: -this.imgWidth })
  },

  bind: function () {
    var _this = this

    this.$preBtn.on('click', function () {
      console.log('pred..')
      // _this.playPre()
    })

    this.$nextBtn.on('click', function () {
      console.log('next..')
      // _this.playNext()
    })
    this.$bullets.on('click', function () {
      console.log($(this).index())
    })
  },
  // playNext: function () {
  //   console.log('playNext..')
  //   this.$imgCt.animate({
  //     left: '-=' + this.imgWidth
  //   })
  // },
  // playPre: function () {

  // }
}



new Carousel($('.carousel').eq(0))
new Carousel($('.carousel').eq(1))