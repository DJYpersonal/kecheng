# audio对象身上的属性方法和事件
> 一个audio对象就是普通的dom对象
> 比其他的dom对象多出一些自己独有的属性方法和事件
```javascript
  var audio = $('audio').get(0);
```
## 属性

* audio.volume       (读/写)    音量
* audio.src          (读/写)    歌曲地址
* audio.currentTime  (读/写)    歌曲当前已播放时长
* audio.duration     (读)       歌曲的总长度

* audio.paused       (读)       布尔类型 是否处于暂停状态
* audio.ended        (读)       布尔类型 歌曲是否已经播放完毕

## 方法

* audio.play()       让歌曲开始播放
* audio.pause()      让歌曲暂停

## 事件

* audio.oncanplay = fn()       当歌曲下载完成之后调用fn
* audio.onvolumechange = fn()  当audio.volume发生变换的时候调用fn
* audio.onplay = fn()          歌曲开始播放之后调用fn
* audio.onpause = fn()         歌曲暂停之后调用fn
* audio.ontimeupdate = fn()    歌曲在播放的过程中会一直调用fn
* audio.onended = fn()         一首歌曲播放完之后调用fn