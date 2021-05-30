PC端网页和移动端网页并没有本质上的差别
但由于屏幕大小的限制,一般在布局设计上,通常是不一样的.
物理像素(能支持的最大分辨率)
设备独立像素(出厂默认设置的分辨率)
dpr=物理像素/设备独立像素
<meta name="viewport" content="width=device-width,initial-scale=1/dpr">

initial-scale 缩放比例