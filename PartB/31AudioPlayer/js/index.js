

// 用ajax 获取数据
// var xml = new XMLHttpRequest()
// xml.open('get', 'http://localhost:8080/music.json', ture)
// xml.onload = function () {
//   window.musicList = JSON.parse(xml.responseText)
// }

// f(){
//   window.musicList = JSON.parse(xml.responseText)
// }

// xml.send()
// musicList


var musicList = [];
      var currentIndex = 0; //定位,标记
      var clock;
      var audio = new Audio(); //需音乐地址
      // 开自动播放
      // audio.autoplay = true

      //getMusicList函数调用,获取数据
      getMusicList(function (list) {
        // console.log(list)
        musicList = list;
        // // 取出数据
        // var song = list[0]
        // // 创建对象
        // var audioObject = new Audio(song.src)
        // // 播放
        // audioObject.play()
        loadMusic(list[currentIndex]);

        generateList(list);
      });
      // getMusicList()
      // musicList = list
      // function start(list) {
      //   loadMusic(list[currentIndex])
      // }

      // 播放进度条和时间显示
      // audio.ontimeupdate = function () {
      //   console.log(this.currentTime)
      //   $('.musicbox .progress-now').style.width = (this.currentTime / this.duration) * 100 + '%'
      //   var min = Math.floor(this.currentTime / 60)
      //   var sec = Math.floor(this.currentTime) % 60 + ''  //加''变字符串
      //   sec = sec.length === 2 ? sec : '0' + sec
      //   $('.musicbox .time').innerText = min + ':' + sec
      // }

      audio.ontimeupdate = function () {
        // console.log(this.currentTime)
        $(".musicbox .progress-now").style.width =
          (this.currentTime / this.duration) * 100 + "%";
      };

      audio.onplay = function () {
        clock = setInterval(function () {
          var min = Math.floor(audio.currentTime / 60);
          var sec = (Math.floor(audio.currentTime) % 60) + ""; //加''变字符串
          sec = sec.length === 2 ? sec : "0" + sec;
          $(".musicbox .time").innerText = min + ":" + sec;
        }, 1000);
      };

      audio.onpause = function () {
        clearInterval(clock);
      };
      audio.onended = function () {
        currentIndex = ++currentIndex % musicList.length;
        // console.log(currentIndex)
        loadMusic(musicList[currentIndex]);
      };
      // )

      // 播放,暂停按钮
      $(".musicbox .play").onclick = function () {
        if (audio.paused) {
          audio.play();
          this.querySelector(".iconfont").classList.remove("icon-play");
          this.querySelector(".iconfont").classList.add("icon-pause1");
        } else {
          audio.pause();
          this.querySelector(".iconfont").classList.remove("icon-pause1");
          this.querySelector(".iconfont").classList.add("icon-play");
          
        }
      };

      // 下一曲按钮
      $(".musicbox .forward").onclick = function () {
        currentIndex = ++currentIndex % musicList.length;
        console.log(currentIndex);
        loadMusic(musicList[currentIndex]);
      };
      //上一曲
      $(".musicbox .back").onclick = function () {
        currentIndex = (musicList.length + --currentIndex) % musicList.length;
        console.log(currentIndex);
        loadMusic(musicList[currentIndex]);
      };
      //进度条拖动
      $(".musicbox .bar").onclick = function (e) {
        console.log(e);
        var percent = e.offsetX / parseInt(getComputedStyle(this).width);
        console.log(percent);
        audio.currentTime = audio.duration * percent;
      };
      //$
      function $(selector) {
        return document.querySelector(selector);
      }

      // 获取数据
      function getMusicList(callback) {
        //1
        // function getMusicList() { //2
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "./music.json", true);
        xhr.onload = function () {
          // console.log(this.responseText)
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            //json把字符串生成数组
            console.log(JSON.parse(this.responseText));
            // window.musicList = JSON.parse(this.responseText)
            //callback回调函数
            callback(JSON.parse(this.responseText)); //1
            // start(JSON.parse(this.responseText))  //2
          } else {
            console.log("获取数据失败");
          }
        };
        xhr.onerror = function () {
          console.log("网络异常");
        };
        xhr.send();
        // console.log(window.MusicList)
      }

      // loadMusic播放

      function loadMusic(musicObj) {
        console.log("begin play", musicObj);
        $(".musicbox .title").innerText = musicObj.title;
        $(".musicbox .auther").innerText = musicObj.auther;
        $(".cover").style.backgroundImage = "url(" + musicObj.img + ")";
        audio.src = musicObj.src; //加载音乐地址
      }
      function generateList(list) {
        //果然除了抄代码啥都不会
      }