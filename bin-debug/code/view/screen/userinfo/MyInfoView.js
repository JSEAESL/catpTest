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
/*
 *cy、mx、daiqi-2017-7-4
 */
var mx;
(function (mx) {
    var MyInfoView = (function (_super) {
        __extends(MyInfoView, _super);
        function MyInfoView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tab2 = 0; //刚进入ed绘制行数x2
            return _this;
        }
        MyInfoView.mx_support = function () {
            return ["assets.myinfo", "api.TAIMIAO"];
        };
        MyInfoView.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.MyInfoMediator(this));
            var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            this.ok_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yinyue_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xqbl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuanfu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zhuomian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qianming_ed.addEventListener(egret.Event.CHANGE, this.check_str, this);
            this.qianming_ed.addEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.qianming_ed.addEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.cyming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.hmdan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zhanghaoId_t.text = Main.USER_ID + "";
            var qf_info;
            var serd_list = (window ? window["mx_serd"] : null) || gProxy.serd_list; //优先读取外部数据
            for (var k in serd_list) {
                qf_info = serd_list[k];
                if (Number(qf_info.id) == Number(Main.SER_ID)) {
                    this.qufu_t.text = Main.SER_ID + "-" + qf_info.name;
                    break;
                }
            }
            this.zhanghao_t.text = gProxy.user_name;
            this.publisher_t.text = mx.Lang.kftd1;
            this.version_t.text = "mx" + mx.AppConfig.VERSION;
            this.qq_t.text = window ? mx.Lang.kefu + window["mx_qq_t"] : "";
            this.exp_bar.set_res({ "up": "infoexpbar_png", "down": "infoexpbarbg_png" });
            if (mx.AppConfig.check_not_support("addtable")) {
                this.zhuomian_b.visible = false;
            }
            this.set_qianming();
            this.fresh_pop();
        };
        MyInfoView.prototype.set_qianming = function () {
            var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var data = gProxy.info;
            this.qb_p.visible = true;
            this.qianming_ed.text = data.qianming || mx.Lang.gxqm;
            this.qb_p.right = data.qianming.length ? 40 : 130;
            this.qb_p.bottom = data.qianming.length ? 295 : 348;
            var temp = this.tab2 == 0 ? 3 : 1;
            this.qianming_ed.textAlign = this.qianming_ed.numLines / temp <= 1 ? "center" : "left";
            this.tab2++;
        };
        MyInfoView.prototype.fresh_pop = function () {
            if (mx.MX_COMMON.MUSIC_PLAY) {
                this.yinyuekai_p.visible = true;
                this.yinyueguan_p.visible = false;
            }
            else {
                this.yinyuekai_p.visible = false;
                this.yinyueguan_p.visible = true;
            }
        };
        MyInfoView.prototype.btn_click = function (evt) {
            if (this.tid) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.ok_b:
                    this.close_self();
                    break;
                case view.yinyue_g://音乐开关
                    facade.sendNotification(mx.MX_NOTICE.SWITCH_MUSIC);
                    break;
                case view.xuanfu_b://返回选服界面
                    this.tid = egret.setTimeout(this.set_time_over, this, 500, "xuanfu"); //500毫秒延时
                    break;
                case view.zhuomian_b://添加游戏到桌面
                    if (window && window["addQQGameShortcut"]) {
                        window["addQQGameShortcut"]();
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.sharerror }); //当前渠道暂不支持此功能
                    }
                    break;
                case view.xqbl_b://兴趣部落
                    if (window && window["mx_open_type"]) {
                        window["mx_open_type"]("community");
                    }
                    break;
                case view.cyming_b://曾用名
                    var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                    if (gProxy.info.old_names) {
                        var point = evt.currentTarget.parent.localToGlobal(evt.currentTarget.x, evt.currentTarget.y);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                            "x": point.x,
                            "y": point.y,
                            "w": 58,
                            "h": 29,
                            "initial_name": gProxy.info.chushi_name.name,
                            "old_name": gProxy.info.old_names,
                            "type": "oldName"
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs22 });
                    }
                    break;
                case view.hmdan_b:
                    //发消息 CS_GETHMD_INFO
                    var hmdan = egret.localStorage.getItem("hmdan");
                    if (!hmdan || hmdan == "") {
                        var str = JSON.stringify([]);
                        egret.localStorage.setItem("hmdan", str);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan12 });
                        return;
                    }
                    if (hmdan == '[]') {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan12 });
                    }
                    else {
                        var cd = {
                            "user_data": hmdan,
                            "t": mx.MX_NETS.CS_GETHMD_INFO
                        };
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                    }
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
            }
        };
        MyInfoView.prototype.set_time_over = function (type) {
            egret.clearTimeout(this.tid);
            this.tid = null;
            var facade = mx.ApplicationFacade.getInstance();
            switch (type) {
                case "xuanfu"://返回选服界面
                    facade.sendNotification(mx.MX_NOTICE.GAME_LOGOUT);
                    break;
                case "zhuomian"://添加游戏到桌面
                    if (window && window["create_shortcut"]) {
                        window["create_shortcut"]();
                    }
                    break;
                case "qq"://一键添加到qq群
                    mx.Tools.add_qq();
                    break;
                default:
                    break;
            }
        };
        MyInfoView.prototype.check_str = function (e) {
            var str = this.qianming_ed.text;
            //this.qianming_ed.text = Tools.check_msg(str, "name");
            this.qianming_ed.textAlign = this.qianming_ed.numLines <= 1 ? "center" : "left";
        };
        MyInfoView.prototype.init_str = function (e) {
            this.qb_p.visible = false;
            var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var data = gProxy.info;
            if (!data.qianming.length) {
                this.qianming_ed.text = "";
            }
        };
        MyInfoView.prototype.check_end = function (e) {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var str = view.qianming_ed.text;
            mx.MGTool.get_str(2, str).then(function (value) {
                _this.qianming_ed.text = value.str;
                if (value.mg) {
                    return;
                }
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_QIANMING,
                    "qianming": _this.qianming_ed.text
                });
            }, function () {
                _this.qianming_ed.text = '';
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.wbjc002 });
            });
        };
        MyInfoView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
            this.ok_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.yinyue_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xqbl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.xuanfu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.zhuomian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.qianming_ed.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            this.qianming_ed.removeEventListener(egret.FocusEvent.FOCUS_IN, this.init_str, this);
            this.qianming_ed.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.check_end, this);
            this.hmdan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.MyInfoMediator.NAME);
        };
        MyInfoView.S_NAME = "MyInfoView";
        return MyInfoView;
    }(mx.AlertView));
    mx.MyInfoView = MyInfoView;
    __reflect(MyInfoView.prototype, "mx.MyInfoView");
})(mx || (mx = {}));
//# sourceMappingURL=MyInfoView.js.map