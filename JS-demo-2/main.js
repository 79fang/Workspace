let div1 = document.createElement('div');
div1.className = 'demo'

document.body.appendChild(div1);

// 点击移动
// document.body.onclick = function (e) {

//   div1.style.top = e.clientY + 'px'
//   div1.style.left = e.clientX + 'px'

// }


var dragging = false
var lastX
var lastY

div1.onmousedown = function (e) {
  lastX = e.clientX
  lastY = e.clientY
  dragging = true

}

// document.body.onmousemove = function (e) {
//   if (dragging === true) {
//     div1.style.top = e.clientY + 'px'
//     div1.style.left = e.clientX + 'px'
//   }
// }

document.body.onmousemove = function (e) {
  if (dragging === true) {
    console.log(lastX, lastY)
    console.log(e.clientX, e.clientY)
    var deltaX = e.clientX - lastX
    var deltaY = e.clientY - lastY
    var top = parseInt(div1.style.top) || 0
    var left = parseInt(div1.style.left) || 0
    var resultY = top + deltaY
    var resultX = left + deltaX
    if (resultY < 0) {
      resultY = 0
    }
    if (resultX < 0) {
      resultX = 0
    }
    div1.style.top = resultY + 'px'
    div1.style.left = resultX + 'px'
    lastX = e.clientX
    lastY = e.clientY
  }
}


document.onmouseup = function () {
  dragging = false
}
