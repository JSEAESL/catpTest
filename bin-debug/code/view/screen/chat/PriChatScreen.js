/**
*   @author hxj
*   @date 2017.9.29
*   @desc 私聊场景
**/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mx;
(function (mx) {
    var PriChatScreen = (function (_super) {
        __extends(PriChatScreen, _super);
        function PriChatScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mine = false;
            return _this;
        }
        PriChatScreen.mx_support = function () {
            return ["assets.prichat"];
        };
        //注销自身，必须实现
        PriChatScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.left_b.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.left_b.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.right_b.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.right_b.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.tab_list.dataProvider = null;
            this.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            if (this.tabTimer) {
                this.tabTimer.stop();
                this.tabTimer.removeEventListener(egret.TimerEvent.TIMER, this.tabTimerFunc, this);
                this.tabTimer = null;
            }
            if (this.tab_scro.viewport) {
                egret.Tween.removeTweens(this.tab_scro.viewport);
            }
            this.msg_scroll.removeEventListener(egret.Event.CHANGE, this.onScrollvChange, this);
            this.msg_list.dataProvider = null;
            this.remove_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.send_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.PriChatMediator.NAME);
        };
        //初始化方法，必须实现
        PriChatScreen.prototype.init_view = function () {
            this.msg_list.itemRenderer = mx.ChatTextRender;
            mx.MX_WEB_CONST.MX_CHAT_TYPE = mx.MX_WEB_CONST.MX_WEB_CT_PRI;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.PriChatMediator(this));
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.left_b.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.left_b.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.right_b.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.right_b.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.tab_scro.addEventListener(egret.Event.CHANGE, this.onScrollhChange, this);
            this.tab_scro.bounces = false;
            this.tab_list.addEventListener(eui.ItemTapEvent.CHANGE, this.onTabChange, this);
            this.fresh_tab();
            this.msg_scroll.addEventListener(egret.Event.CHANGE, this.onScrollvChange, this);
            this.remove_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.send_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        PriChatScreen.prototype.check_str = function () {
            var _this = this;
            var text = this.edit_et.text;
            var facade = mx.ApplicationFacade.getInstance();
            if (text != '') {
                if (text.indexOf("mxdebug@") > -1) {
                    this.edit_et.text = "";
                    mx.Tools.debug_mode(text);
                    return;
                }
                mx.MGTool.get_str(4, text).then(function (value) {
                    _this.edit_et.text = value.str;
                    if (value.str != "") {
                        if (value.mg) {
                            return;
                        }
                        if (!_this.proxy.pri_list.length) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.lt006 });
                            return;
                        }
                        mx.WebTool.getInstance().web_msg(value.str, mx.MX_WEB_CONST.MX_WEB_CT_PRI);
                        _this.edit_et.text = "";
                        _this.mine = true;
                    }
                }, function () {
                    _this.edit_et.text = '';
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
                });
            }
        };
        PriChatScreen.prototype.check_border = function () {
            var scro_h = this.tab_scro.viewport.scrollH;
            if ((this.tabDirection == -1 && (scro_h <= 0 || this.tab_list.selectedIndex == 0)) ||
                (this.tabDirection == 1 && (this.tab_list.measuredWidth - 250 <= scro_h || this.tab_list.selectedIndex == this.tab_list.numElements - 1))) {
                if (this.tabDirection == 1) {
                    this.proxy.get_page();
                }
                return true;
            }
            else {
                return false;
            }
        };
        PriChatScreen.prototype.onTouchBegin = function (e) {
            this.oldTabIndex = this.tab_list.selectedIndex;
            this.tabDirection = e.currentTarget == this.left_b ? -1 : 1;
            if (this.check_border()) {
                return;
            }
            if (!this.tabTimer) {
                this.tabTimer = new egret.Timer(1200);
                this.tabTimer.addEventListener(egret.TimerEvent.TIMER, this.tabTimerFunc, this);
            }
            else {
                this.tabTimer.delay = 1200;
            }
            this.tabTimerFunc(); //至少移动一个
            this.tabTimer.delay = 900;
            this.tabTimer.start();
        };
        PriChatScreen.prototype.onTouchEnd = function (e) {
            if (this.tabTimer) {
                this.tabTimer.stop();
            }
            if (this.tab_list.selectedIndex != this.oldTabIndex) {
                this.onTabChange();
            }
        };
        PriChatScreen.prototype.tabTimerFunc = function () {
            if (this.tab_scro.viewport) {
                egret.Tween.removeTweens(this.tab_scro.viewport);
            }
            if (this.check_border()) {
                return;
            }
            this.tab_list.selectedIndex += this.tabDirection;
            var cur_scrollh = this.tab_scro.viewport.scrollH;
            egret.Tween.get(this.tab_scro.viewport, { "loop": false }).to({ "scrollH": cur_scrollh + 64 * this.tabDirection }, this.tabTimer.delay).call(this.onScrollhChange, this);
            this.tabTimer.delay -= this.tabTimer.delay * 0.25;
        };
        PriChatScreen.prototype.init_emptyTab = function () {
            var pri_num = this.proxy.pri_list.length;
            if (pri_num < mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE) {
                var empty_arr = [];
                for (var i = pri_num + 1; i <= mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE; i++) {
                    empty_arr.push({});
                }
                this.empty_list.dataProvider = new eui.ArrayCollection(empty_arr);
            }
        };
        PriChatScreen.prototype.onScrollhChange = function () {
            var scro_h = this.tab_scro.viewport.scrollH;
            if (scro_h <= 0) {
                this.left_b.set_ssres("sljthui_png");
                this.left_b.scaleX = -1;
            }
            else {
                this.left_b.set_ssres("slzjtou_png");
                this.left_b.scaleX = 1;
            }
            if (this.tab_list.measuredWidth - ((56 + 8) * mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE - 6) > scro_h) {
                this.right_b.set_ssres("slzjtou_png");
                this.right_b.scaleX = -1;
            }
            else {
                this.right_b.set_ssres("sljthui_png");
                this.right_b.scaleX = 1;
                this.proxy.get_page(); //右端到头时请求下一页
            }
        };
        PriChatScreen.prototype.check_location = function () {
            var scro_h = this.tab_scro.viewport.scrollH;
            var sw = (56 + 8) * mx.MX_WEB_CONST.WEB_PRI_PAGE_SIZE - 6;
            var left = (56 + 8) * this.proxy.cur_pri_index;
            ;
            var right = left + 58;
            if (right <= scro_h) {
                this.tab_scro.viewport.scrollH = left;
            }
            else if (scro_h + sw <= left) {
                this.tab_scro.viewport.scrollH = right - sw;
            }
            else if (scro_h + sw >= this.tab_list.measuredWidth) {
                this.tab_scro.viewport.scrollH = Math.max(this.tab_list.measuredWidth - sw, 0);
            }
        };
        PriChatScreen.prototype.fresh_tab = function (data) {
            if (data) {
                for (var i = 0; i < this.tab_list.numElements; i++) {
                    var item = this.tab_list.dataProvider.getItemAt(i);
                    if (item.user_id == data.user_id) {
                        //以下两项是必“更”内容
                        item.user_avatar = data.user_avatar;
                        item.user_name = data.user_name;
                        if (data.num && (!item.num || data.num > item.num)) {
                            item.tishi = true;
                            item.num = data.num;
                        }
                        else {
                            item.tishi = false;
                            item.num = 0;
                            delete this.proxy.unread_pri_num["SL" + data.user_id];
                        }
                        break;
                    }
                }
                if (typeof data.num != "undefined") {
                    this.proxy.init_msg_type(mx.MX_WEB_CONST.MX_WEB_CT_PRI);
                }
            }
            else {
                var facade = mx.ApplicationFacade.getInstance();
                if (this.proxy.cur_pri_index > -1) {
                    this.tishi_g.visible = false;
                    var cur_pri_userid = this.proxy.pri_list[this.proxy.cur_pri_index].user_id;
                    if (this.proxy.unread_pri_num["SL" + cur_pri_userid]) {
                        delete this.proxy.unread_pri_num["SL" + cur_pri_userid];
                    }
                    var tab_arr = [];
                    for (var i in this.proxy.pri_list) {
                        var target = this.proxy.pri_list[i];
                        var unread = this.proxy.unread_pri_num["SL" + target.user_id];
                        tab_arr.push({
                            "user_id": target.user_id,
                            "user_avatar": target.user_avatar,
                            "user_name": target.user_name,
                            "tishi": unread ? true : false,
                            "num": unread
                        });
                    }
                    this.tab_list.dataProvider = new eui.ArrayCollection(tab_arr);
                    this.tab_list.selectedIndex = this.proxy.cur_pri_index;
                    var old_scrollH = this.tab_scro.viewport.scrollH;
                    this.tab_list.validateNow();
                    this.tab_scro.viewport.scrollH = old_scrollH;
                    this.check_location();
                    this.proxy.init_msg_type(mx.MX_WEB_CONST.MX_WEB_CT_PRI);
                }
                else {
                    this.tab_list.dataProvider = new eui.ArrayCollection([]);
                    this.msg_list.removeChildren();
                    this.show_tishi();
                }
                this.onScrollhChange();
                this.tab_list.validateNow();
                this.init_emptyTab();
            }
        };
        Object.defineProperty(PriChatScreen.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        PriChatScreen.prototype.onTabChange = function (e) {
            this.proxy.cur_pri_index = e ? e.target.selectedIndex : this.tab_list.selectedIndex;
            this.fresh_tab(this.tab_list.selectedItem);
            this.edit_et.text = "";
        };
        PriChatScreen.prototype.show_tishi = function () {
            this.tishi_g.visible = true;
            this.tishi_xdz.source = "xdzi-xiao_png";
            this.tishi_t.text = mx.Lang.lt007;
        };
        PriChatScreen.prototype.onScrollvChange = function () {
            if (this.msg_scroll.viewport.scrollV <= 0) {
                this.proxy.syn("up");
            }
        };
        PriChatScreen.prototype.fresh_type_msg = function () {
            this.proxy.syn("bottom");
        };
        Object.defineProperty(PriChatScreen.prototype, "scroll_height", {
            get: function () {
                return mx.Tools.screen_height - 336;
            },
            enumerable: true,
            configurable: true
        });
        PriChatScreen.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.back_b://返回上一场景
                    this.proxy.cur_pri_index = -2;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, PriChatScreen.P_NAME); //原来跳转到main--cy
                    break;
                case view.send_b://发送
                    view.check_str();
                    break;
                case view.remove_b://移除私聊对象
                    if (this.proxy.cur_pri_index > -1) {
                        this.proxy.remove_pri();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.lt008 });
                    }
                    break;
            }
        };
        PriChatScreen.prototype.get_object = function (arr, key, value) {
            for (var i in arr) {
                if (arr[i][key] == value) {
                    arr[i].index = Number(i);
                    return arr[i];
                }
            }
            return null;
        };
        //刷到底部
        PriChatScreen.prototype.fresh_list = function (type) {
            this.msg_scroll.stopAnimation();
            var msg_arr = this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 1);
            var oldV = this.msg_list.scrollV;
            var oldH = this.msg_list.measuredHeight;
            this.msg_list.dataProvider = new eui.ArrayCollection(msg_arr);
            this.msg_list.validateNow();
            this.msg_list.scrollV = Math.max(this.msg_list.measuredHeight - this.scroll_height, 0);
            this.msg_list.validateNow();
            this.msg_list.scrollV = Math.max(this.msg_list.measuredHeight - this.scroll_height, 0);
            var h = this.proxy.cal_msgList_height(msg_arr);
            var h0 = this.msg_list.measuredHeight;
            if (Math.abs(h - h0) / h0 > 0.18) {
                this.msg_list.scrollV = Math.max(h - this.scroll_height, 0);
            }
            if (type == "hold") {
                this.msg_list.scrollV = oldV;
            }
            else if (type == "up") {
                this.msg_list.scrollV = this.msg_list.measuredHeight - oldH;
            }
        };
        PriChatScreen.prototype.fresh_msg = function (type) {
            if (type == mx.MX_WEB_CONST.MX_CHAT_TYPE) {
                var cproxy = this.proxy;
                cproxy.syn();
                var view = this.msg_scroll.viewport;
                var ovsv = view.scrollV; //原始滑动位置
                if (ovsv >= this.msg_list.measuredHeight - this.scroll_height || this.mine) {
                    this.fresh_list("bottom");
                    this.mine = false;
                }
                else {
                    this.fresh_list("hold");
                }
            }
        };
        PriChatScreen.S_NAME = "PriChatScreen";
        return PriChatScreen;
    }(mx.BasicView));
    mx.PriChatScreen = PriChatScreen;
    __reflect(PriChatScreen.prototype, "mx.PriChatScreen");
})(mx || (mx = {}));
//# sourceMappingURL=PriChatScreen.js.map