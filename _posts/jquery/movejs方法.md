# MoveJs

## 说明

- 不依赖jquery，可单独应用

## 使用方法

- 下面是一个例子：我们将一个矩形移动到`(500px, 200px)`处，并将它旋转`180deg`，缩小`.5`，并倾斜它，在2秒钟内改变它的背景颜色。当上门的动画完成后，我们将它它的透明度设置为0，制作淡入淡出的效果，最后将它收缩0.1。例如：

  ```js
  move('.square')
    .to(500, 200)
    .rotate(180)
    .scale(.5)
    .set('background-color', '#888')
    .set('border-color', 'black')
    .duration('2s')
    .skew(50, -10)
    .then()
      .set('opacity', 0)
      .duration('0.3s')
      .scale(0.1)
      .pop()
    .end();
  ```

- move(param1)，参数是选择器，可以是className，也可以是css，和jquery选择器一样。

- 下面的就是各种动画方法了。

## 参数说明

- add(param1,param2)：增加属性的动画；param1是css中的属性值，param2是速度，例如：``` ddd``` 

  ```js
  move('#example-2 .box')
    .add('margin-left', 200)
    .end();
  ```


- to(1,2)
- set(1,2)
- rotate()
- skew()
- duration()
- scale()
- pop()
- end()
- ​