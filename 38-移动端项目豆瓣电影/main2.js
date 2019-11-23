
// var app = {
//   init: function () {
//     this.$tabs = $('footer>div')
//     this.$panels = $('section')
//     this.bind()
//   },
//   bind: function () {

//   }
// }



// 页面切换
$('footer>div').click(function () {
  var index = $(this).index()
  $('section').hide().eq(index).fadeIn()
  $(this).addClass('active').siblings().removeClass('active')
})

// 前端项目排行页
//ajax获取数据
$.ajax({
  url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
  data: {
    page: this.page
  },
  dataType: 'jsonp'
}).done(function (ret) {
  _this.isLoading = false;
  _this.$container.find('.loading').hide(400);
  callback(ret);
})


//生成节点,用获取到的数据对样例进行替换
function setData(subject, index) {
  var $node = $(`<div class="item">
    <a href="https://github.com/TryGhost/Ghost">
    <div class="order"><span>1</span></div>
    <div class="detail">
    <h2>Ghost</h2>
    <div class="description">Knockout makes it easier to create rich,responsive UIs with JavaScript</div>
    <div class="extra"><span class="star-count">4196</span>star</div>
    </div></a></div>`)
  $node.find('.order span').text(index)
  $node.find('a').attr('href', subject.html_url);
  $node.find('.detail h2').text(subject.name);
  $node.find('.detail .description').text(subject.description);
  $node.find('.detail .collection').text(subject.collect_count);
  $node.find('.detail .star-count').text(subject.stargazers_count);
  return $node;
}





















