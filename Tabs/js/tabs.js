;
(function($) {
    var Tab = function(tab) {
        var _this = this;
        this.tab = tab;
        this.config = {
            "triggerType": "click",
            "effect": "default", //动画效果
            "invoke": 2, //默认显示第几个
            "auto": 500
        }
        if (this.getConfig()) {
            $.extend(true, this.config, this.getConfig());
        }

        //保存tab标签列表及其对应内容
        this.tabItems = this.tab.find('ul.tab-nav li');
        this.contentItems = this.tab.find('div.content-wrap div.content-item');

        var config = this.config;
        //绑定事件
        if (config.triggerType === 'click') {
            this.tabItems.bind(config.triggerType, function() {
                _this.invoke($(this))
            });
        } else if (config.triggerType === 'mouseover' || config.triggerType != 'click') {
            this.tabItems.mouseover(function(e) {

                e.stopPropagation();

                var self = $(this);
                this.timer = window.setTimeout(function() {
                    _this.invoke(self);
                }, 300);

            }).mouseout(function(e) {

                e.stopPropagation();

                window.clearTimeout(this.timer);

            });
        }

        //自动播放
        if (config.auto) {
            this.timer = null;
            this.loop = 0; //计数
            this.autoPlay();
            this.tab.hover(function() {
                window.clearInterval(_this.timer);
            }, function() {
                _this.autoPlay()
            });
        }
        if (config.invoke > 1) {
            this.invoke(this.tabItems.eq(config.invoke - 1))
        }


    };
    Tab.prototype = {
        //获取参数
        getConfig: function() {
            var config = this.tab.data('config');
            if (config && config != '') {
                return config;
            } else {
                return null
            }
        },
        //事件驱动
        invoke: function(currentTab) {
            var _this = this;
            var index = currentTab.index();
            currentTab.addClass("actived").siblings().removeClass("actived");
            var effect = this.config.effect;
            var contentItems = this.contentItems;
            if (effect === 'default' || effect != 'fade') {
                contentItems.eq(index).addClass('current').siblings().removeClass('current')
            } else if (effect === 'fade') {
                contentItems.eq(index).fadeIn().siblings().fadeOut();
            }
            //如果设置了自动切换，要把当前的计数器的值与事件触发同步更新
            if (this.config.auto) {
                this.loop = index
            }
        },
        autoPlay: function() {
            var _this = this,
                tabItems = this.tabItems,
                tabLen = tabItems.length,
                config = this.config;
            this.timer = setInterval(function() {
                _this.loop++;
                if (_this.loop >= tabLen) {
                    _this.loop = 0
                };
                tabItems.eq(_this.loop).trigger(config.triggerType)
            }, config.auto);
        }
    };
    /*    Tab.init = function(tabs) {
            var _this = this;
            tabs.each(function() {
                new _this($this)
            });
        }*/
    $.fn.extend({
        tab: function() {
            this.each(function() {
                new Tab($(this))
            });
            return this;
        }
    })
    window.Tab = Tab;
})(jQuery);
