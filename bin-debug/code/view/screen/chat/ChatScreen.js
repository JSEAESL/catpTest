/**
*   @author mx
*   @date 2015.1.3
*   @desc 聊天场景，可以改成弹窗。
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
    var ChatScreen = (function (_super) {
        __extends(ChatScreen, _super);
        function ChatScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.mine = false; //我发送消息后，置为true
            return _this;
        }
        ChatScreen.mx_support = function () {
            return ["assets.chat", "api.ZINVSKILL", "api.PINLI",
                "api.EQUIP", "api.HERO", "api.TAIMIAO", "api.SYSTEMLOG"];
        };
        //注销自身，必须实现
        ChatScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.send_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.znlyin_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cksl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.msg_list.dataProvider = null;
            this.type_list.dataProvider = null;
            this.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.sliao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.other_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.jbao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ChatMediator.NAME);
        };
        //初始化方法，必须实现
        ChatScreen.prototype.init_view = function () {
            this.type_list.selectedIndex = this.proxy.selected_index;
            this.init_tab(this.proxy.selected_index);
            this.show_pri_tip();
            this.bg_rect.touchEnabled = false;
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jfzp_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jfzp_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.frame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.send_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.znlyin_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.cksl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jubao_sel = null;
            this.czuo_g.visible = false;
            this.sliao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.other_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.jbao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.czuo_click, this);
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ChatMediator(this));
        };
        ChatScreen.prototype.check_str = function () {
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
                        var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
                        if (gproxy.user_lv >= mx.MX_COMMON.MX_SEND_LV) {
                            var other = void 0;
                            var type = mx.MX_WEB_CONST.MX_CHAT_TYPE;
                            if (type == mx.MX_WEB_CONST.MX_WEB_CT_FAM) {
                                var uproxy = facade.retrieveProxy(mx.UnionProxy.NAME);
                                other = ["message", Math.floor(new Date().getTime() / 1000), uproxy.union_id];
                            }
                            var crd = _this.proxy.web_rd[type];
                            if (crd) {
                                var now = egret.getTimer();
                                var cdy = crd.st ? crd.delay + crd.st - now : 0;
                                //cdy = 0;//测试用
                                if (cdy > 0) {
                                    var str = mx.Tools.format(mx.Lang.p0116, Math.ceil(cdy / 1000));
                                    var a_d2 = {
                                        "param": str
                                    };
                                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                                    return;
                                }
                                crd.st = now;
                            }
                            mx.WebTool.getInstance().web_msg(value.str, type, other);
                            _this.edit_et.text = "";
                            _this.mine = true;
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.p0129, mx.MX_COMMON.MX_SEND_LV) });
                        }
                    }
                }, function () {
                    _this.edit_et.text = '';
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
                });
            }
        };
        ChatScreen.prototype.init_tab = function (index, open) {
            if (open === void 0) { open = true; }
            switch (index) {
                case 0://世界
                    mx.MX_WEB_CONST.MX_CHAT_TYPE = mx.MX_WEB_CONST.MX_WEB_CT_PUB;
                    this.currentState = this.skin.currentState = "mx2";
                    this.msg_list.itemRenderer = mx.ChatTextRender;
                    break;
                case 1://家族
                    mx.MX_WEB_CONST.MX_CHAT_TYPE = mx.MX_WEB_CONST.MX_WEB_CT_FAM; //暂时使用家族替代
                    var facade = mx.ApplicationFacade.getInstance();
                    var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
                    if (Number(uProxy.union_id)) {
                        this.currentState = this.skin.currentState = "mx2";
                    }
                    else {
                        var msg_arr = this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0);
                        if (msg_arr.length > 0 && !msg_arr[0].user_avatar) {
                            this.proxy._shift(mx.MX_WEB_CONST.MX_CHAT_TYPE);
                        }
                        this.currentState = this.skin.currentState = "mx1";
                        this.sming.source = "ltjztshi_png";
                    }
                    this.msg_list.itemRenderer = mx.ChatJiazuRender;
                    break;
                case 2://结缘
                    mx.MX_WEB_CONST.MX_CHAT_TYPE = mx.MX_WEB_CONST.MX_WEB_CT_YIN;
                    this.currentState = this.skin.currentState = "mx3";
                    this.sming.source = "jypdtshi_png";
                    this.msg_list.itemRenderer = mx.ChatLianyinRender;
                    break;
                case 3://系统
                    mx.MX_WEB_CONST.MX_CHAT_TYPE = mx.MX_WEB_CONST.MX_WEB_CT_SYS;
                    this.currentState = this.skin.currentState = "mx1";
                    this.sming.source = "ltxttshi_png";
                    this.msg_list.itemRenderer = mx.ChatSystemRender;
                    break;
            }
            this.fresh_type_msg(open);
        };
        Object.defineProperty(ChatScreen.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ChatProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        ChatScreen.prototype.onTabChange = function (e) {
            // let item = e.item;
            var cproxy = this.proxy;
            cproxy.selected_index = e.target.selectedIndex;
            this.init_tab(cproxy.selected_index, false);
            this.edit_et.text = "";
        };
        ChatScreen.prototype.show_pri_tip = function () {
            this.priTip_p.visible = mx.Tools.obj2arr(this.proxy.unread_pri_num).length ? true : false;
        };
        ChatScreen.prototype.show_tishi = function () {
            this.tishi_g.visible = true;
            switch (this.type_list.selectedIndex) {
                case 1:
                    this.tishi_xdz.source = "xdzi-tshi_png";
                    this.tishi_t.text = mx.Lang.jz208;
                    break;
                case 2:
                    this.tishi_xdz.source = "xdzi-xiao_png";
                    this.tishi_t.text = mx.Lang.lt004;
                    break;
                case 3:
                    this.tishi_xdz.source = "xdzi-tshi_png";
                    this.tishi_t.text = mx.Lang.lt005;
                    break;
            }
        };
        //滑动到底部后sv>0,切换tab后默认滑到底部
        ChatScreen.prototype.fresh_type_msg = function (open) {
            this.fresh_list();
            //小德子提示 && 防诈骗提示
            var arr = this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0);
            if (!arr.length && this.currentState != "mx2") {
                this.show_tishi();
            }
            else {
                if (open && egret.localStorage.getItem("CAUTIOUS_FRAUD" + Main.USER_ID) != "no_warn" && !this.proxy.no_warn) {
                    this.jfzp_g.visible = true;
                    this.tick_p.visible = false;
                }
                this.tishi_g.visible = false;
            }
        };
        Object.defineProperty(ChatScreen.prototype, "scroll_height", {
            get: function () {
                var max = mx.Tools.screen_height;
                var sh;
                /*
                switch (this.currentState) {
                    case "mx1":
                        sh = max - 220;
                        break;
                    case "mx2":
                        sh = max - 245;
                        break;
                    case "mx3":
                        sh = max - 200;
                        break;
                }
                */
                sh = max - 354;
                return sh;
            },
            enumerable: true,
            configurable: true
        });
        ChatScreen.prototype.add_jubao = function (idx) {
            var view = this;
            var ui;
            for (var i in this.msg_list.$children) {
                var unit = this.msg_list.$children[i];
                if (unit.itemIndex == idx) {
                    ui = unit;
                    break;
                }
            }
            var point = ui.parent.localToGlobal(ui.x, ui.y);
            view.czuo_g.left = point.x + 115;
            view.czuo_g.top = point.y + 30;
            //let chicun = view.czuo_g.height + view.czuo_g.top;
            if (this.scroll_height < view.czuo_g.top) {
                view.czuo_g.top = this.scroll_height - 70;
            }
            view.bg_rect.touchEnabled = view.czuo_g.visible = true;
            view.jubao_sel = null;
            view.jubao_sel = {
                "idx": idx,
                "data": ui.data
            };
        };
        ChatScreen.prototype.czuo_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.sliao_b:
                    if (mx.Tools.in_hmd(this.jubao_sel.data.user_id)) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan13 });
                    }
                    else {
                        mx.Tools.open_pri_chat({
                            "user_id": this.jubao_sel.data.user_id,
                            "avatar": "tx70_" + this.jubao_sel.data.user_avatar + "_png",
                            "name": this.jubao_sel.data.user_name
                        });
                    }
                    break;
                case view.add_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FRIEND_SQING,
                        "to_id": this.jubao_sel.data.user_id
                    });
                    break;
                case view.other_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": this.jubao_sel.data.user_id,
                    });
                    break;
                case view.jbao_b:
                    if (mx.MX_WEB_CONST.MX_CHAT_TYPE == mx.MX_WEB_CONST.MX_WEB_CT_YIN) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan14 });
                    }
                    else {
                        var a_d = {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": { "t": mx.MX_NETS.CS_JUBAO_INFO, "to_id": this.jubao_sel.data.user_id, "content": this.jubao_sel.data.content, 'chat_time': this.jubao_sel.data.time },
                            "param": mx.Tools.format(mx.Lang.hmdan07, this.jubao_sel.data.user_name)
                        };
                        var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    break;
            }
        };
        ChatScreen.prototype.btn_click = function (evt) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            switch (evt.currentTarget) {
                case view.bg_rect:
                    view.jubao_sel = null;
                    view.bg_rect.touchEnabled = view.czuo_g.visible = false;
                    break;
                case view.back_b://返回上一场景
                    lproxy.setLD(false);
                    lproxy.qiuyuan_target = 0;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, ChatScreen.P_NAME); //原来跳转到main--cy
                    break;
                case view.jfzp_b://谨防诈骗
                    this.tishi_g.visible = false;
                    view.jfzp_g.visible = true;
                    if (egret.localStorage.getItem("CAUTIOUS_FRAUD" + Main.USER_ID) == "no_warn" || this.proxy.no_warn) {
                        view.tick_p.visible = true;
                    }
                    break;
                case view.jfzp_bg:
                    view.jfzp_g.visible = false;
                    if (!this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0).length && this.currentState != "mx2") {
                        this.show_tishi();
                    }
                    break;
                case view.frame://谨防诈骗勾选框
                    var no_warn = !view.tick_p.visible;
                    view.tick_p.visible = no_warn;
                    this.proxy.no_warn = no_warn;
                    egret.localStorage.setItem("CAUTIOUS_FRAUD" + Main.USER_ID, no_warn ? "no_warn" : null);
                    break;
                case view.send_b://发送
                    this.check_str();
                    // str = Tools.check_msg(str, "name");//检查敏感字
                    // str = str.substr(0, 40);
                    break;
                case view.znlyin_b:
                    var wtool = mx.WebTool.getInstance();
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHAT_ZINV,
                    });
                    break;
                case view.cksl_b:
                    mx.Tools.open_pri_chat();
                    break;
            }
        };
        ChatScreen.prototype.get_object = function (arr, key, value) {
            for (var i in arr) {
                if (arr[i][key] == value) {
                    arr[i].index = Number(i);
                    return arr[i];
                }
            }
            return null;
        };
        //刷到底部
        ChatScreen.prototype.fresh_list = function (type) {
            if (type === void 0) { type = true; }
            this.msg_scroll.stopAnimation();
            var msg_arr = this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0);
            var oldV = this.msg_list.scrollV;
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
            if (!type) {
                this.msg_list.scrollV = oldV;
            }
        };
        ChatScreen.prototype.fresh_msg = function (type) {
            if (type == mx.MX_WEB_CONST.MX_CHAT_TYPE) {
                var cproxy = this.proxy;
                var view = this.msg_scroll.viewport;
                var ovsv = view.scrollV; //原始滑动位置
                if (ovsv >= this.msg_list.measuredHeight - this.scroll_height || this.mine) {
                    this.fresh_list();
                    this.mine = false;
                    //小德子提示
                    var facade = mx.ApplicationFacade.getInstance();
                    var arr = cproxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0);
                    if (!arr.length && this.currentState != "mx2") {
                        this.show_tishi();
                    }
                    else {
                        this.tishi_g.visible = false;
                    }
                }
                else {
                    this.fresh_list(false);
                }
                if (this.jubao_sel) {
                    this.add_jubao(this.jubao_sel.idx);
                }
            }
        };
        ChatScreen.prototype.pingbi = function () {
            this.jubao_sel = null;
            this.czuo_g.visible = this.bg_rect.touchEnabled = false;
            var arr = mx.FightTools.arr_clone(this.proxy.get_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, 0));
            this.proxy.clear_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE);
            var facade = mx.ApplicationFacade.getInstance();
            if (arr.length) {
                for (var i in arr) {
                    this.proxy.set_web_type_msg(mx.MX_WEB_CONST.MX_CHAT_TYPE, arr[i]);
                }
            }
            else {
                facade.sendNotification(mx.MX_WEB_CONST.WEB_NEW_MSG, null, mx.MX_WEB_CONST.MX_CHAT_TYPE);
            }
        };
        ChatScreen.S_NAME = "ChatScreen";
        return ChatScreen;
    }(mx.BasicView));
    mx.ChatScreen = ChatScreen;
    __reflect(ChatScreen.prototype, "mx.ChatScreen");
})(mx || (mx = {}));
//# sourceMappingURL=ChatScreen.js.map