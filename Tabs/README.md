## 小结
虽然`hover`是`mouseenter`和`mouseleave`的集合，但由于触发`mouseover`事件的`tabItems`是绑定`hover`事件的`tab`的子元素，所以要利用`setTimeout`来解决自动切换时触发的`mouseover`和`hover`之间的冲突
