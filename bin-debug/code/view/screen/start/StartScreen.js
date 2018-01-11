/**
*   @author mx
*   @date 2015.1.3
*   @desc 选择服务器界面
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
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StartScreen.mx_support = function () {
            return ["assets.start", "api.GUIDEINFO", "api.PNAME"];
        };
        //注销自身，必须实现
        StartScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.notice_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.start_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.djxf_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ser_list.dataProvider = null;
            this.ser_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.last_list.dataProvider = null;
            this.last_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            egret.Tween.removeTweens(this.role1_p);
            egret.Tween.removeTweens(this.role2_p);
            egret.Tween.removeTweens(this.role3_p);
            egret.Tween.removeTweens(this.start_b);
            egret.Tween.removeTweens(this.server_g);
            egret.Tween.removeTweens(this.tc_g);
            if (this.armature) {
                this.armature.animation.stop();
                dragonBones.WorldClock.clock.remove(this.armature);
            }
            mx.ApplicationFacade.getInstance().removeMediator(mx.StartScreenMediator.NAME);
        };
        StartScreen.prototype.get_last_ser = function (log) {
            var res;
            var cur_time = 0;
            for (var i in log) {
                if (log[i].time > cur_time) {
                    res = log[i].sid;
                    cur_time = log[i].time;
                }
            }
            return Number(res);
        };
        StartScreen.prototype.init_view = function () {
            this.notice_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.start_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.djxf_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.ser_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.last_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.StartScreenMediator(this));
            this.ver_l.text = "mx" + mx.AppConfig.VERSION;
            this.rect.touchEnabled = false;
            var proxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var serd = (window ? window["mx_serd"] : null) || proxy.serd_list; //优先读取外部数据
            serd = serd.concat();
            var userd = (window ? window["mx_userd"] : null) || proxy.user_info;
            var last = (window ? window["mx_last"] : null) || proxy.last_ser;
            last = this.get_last_ser(last);
            var is_new = false;
            if (window && window["pubtest"]) {
                serd = [serd[2]];
                last = 3;
            }
            else {
                serd.pop();
                last = Math.min(last, serd.length);
            }
            if (is_new) {
                if (window && window["mx_share_sid"]) {
                }
                else {
                    this.c_sid = last;
                    this.btn_click({ "currentTarget": this.start_b });
                    return;
                }
            }
            var arr = [];
            for (var k in serd) {
                var cd = serd[k];
                var str = (window && window["pubtest"] ? "测试" : cd.id) + mx.Lang.st001 + " " + cd.name; //1服 木星（新服）
                var bqian = 'xfhbao_png';
                if (cd.wh) {
                    str += " (" + mx.Lang.st016 + ")";
                }
                else {
                    if (Number(cd.is_new)) {
                        bqian = 'xfxf_png';
                    }
                }
                var c_ud = userd[cd.id];
                if (c_ud) {
                    var name_1 = c_ud.name;
                    if (name_1.length > 3) {
                        name_1 = name_1.substr(0, 3);
                        name_1 += "...";
                    }
                    arr.push({ "sid": cd.id, "sname": cd.name, "bqian": bqian, "txt": str, "level": ("Lv." + c_ud.level), "name": name_1, "tuijian": false });
                }
                else {
                    arr.push({ "sid": cd.id, "sname": cd.name, "bqian": bqian, "txt": str, "level": "", "name": "", "tuijian": Number(cd.is_new) });
                }
            }
            arr.reverse();
            this.serd_arr = arr;
            this.ser_list.itemRenderer = mx.ServerListRender;
            this.ser_list.dataProvider = new eui.ArrayCollection(arr);
            this.c_sid = last ? Number(last) : arr.length;
            var c_sidx = Math.max(0, arr.length - this.c_sid);
            this.ser_list.selectedIndex = c_sidx;
            var c_s_d = arr[c_sidx];
            this.c_s_d = c_s_d; //保存当前所选
            this.c_ser_t.text = c_s_d.txt;
            this.bqian_p.source = c_s_d.bqian;
            this.last_list.itemRenderer = mx.ServerListRender;
            this.last_list.dataProvider = new eui.ArrayCollection([c_s_d]);
            this.test_g.mask = new egret.Rectangle(0, 0, 546, 417);
            var bottom = 128;
            this.start_b.y = bottom;
            egret.Tween.get(this.start_b, { "loop": true }).to({ "bottom": bottom + 15 }, 500).to({ "bottom": bottom }, 500);
            if (window && window["removeLoading"]) {
                window["removeLoading"]();
            }
            if (StartScreen.xuanfu_tip == 0) {
                StartScreen.xuanfu_tip = 1;
                this.tc_g.visible = true;
                this.tc_g.touchEnabled = true;
                this.tc_g.alpha = 1;
                egret.Tween.get(this.tc_g).to({}, 1500).to({ "alpha": 0 }, 500).to({ "visible": false }, 1).call(this.init_ani, this); //淡出
            }
            else {
                this.tc_g.visible = false;
                this.check_yaoqing();
            }
            //呼吸效果
            mx.TweenTool.getInstance().breath_tween(this.role1_p, false);
            mx.TweenTool.getInstance().breath_tween(this.role2_p);
            mx.TweenTool.getInstance().breath_tween(this.role3_p);
            // egret.setTimeout(() => {
            //     TweenTool.getInstance().breath_tween(this.role1_p);
            //     egret.setTimeout(() => {
            //         TweenTool.getInstance().breath_tween(this.role2_p);
            //         egret.setTimeout(() => {
            //             TweenTool.getInstance().breath_tween(this.role3_p);
            //         }, this, 500);
            //     }, this, 500);
            // }, this, 500);
        };
        StartScreen.prototype.check_yaoqing = function () {
            var facade = mx.ApplicationFacade.getInstance();
            if (window && window["mx_share_sid"]) {
                //if(1){
                var target_ser = window["mx_share_sid"]; //////
                var info = this.c_s_d;
                var arr = this.serd_arr;
                for (var k in arr) {
                    if (arr[k].name) {
                        return;
                    }
                    if (Number(arr[k].sid) == target_ser) {
                        info = arr[k];
                    }
                }
                var str = mx.Tools.format(mx.Lang.p0137, info.sid, info.sname); //陛下，您的好友邀请您进入xxx服，是否？
                var flow = mx.Tools.setKeywordColor2(str, [0x67a0f7, 0xf773b3]);
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.SELECT_SERD,
                    "sdata_ok": target_ser,
                    "param": flow,
                    "style": { "size": 24 },
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
        };
        StartScreen.prototype.selec_serd = function (serd) {
            var facade = mx.ApplicationFacade.getInstance();
            this.c_sid = serd;
            var serd2 = this.serd_arr;
            for (var k in serd2) {
                var cs = serd2[k];
                if (this.c_sid + "" == cs.sid + "") {
                    this.c_s_d = cs; //保存当前所选
                    this.c_ser_t.text = cs.txt;
                    break;
                }
            }
            var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
            var tar = this.start_b;
            tar.dispatchEvent(evt);
        };
        StartScreen.prototype.init_ani = function () {
            var _this = this;
            var share_flag = true; //先公告再弹窗
            if (mx.Tools.can_local_s) {
                var local_ver = egret.localStorage.getItem(mx.MX_COMMON.MX_VERSION);
                if (!local_ver || local_ver != mx.AppConfig.VERSION) {
                    egret.localStorage.setItem(mx.MX_COMMON.MX_VERSION, mx.AppConfig.VERSION);
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.NoticeView.S_NAME
                    });
                    share_flag = false;
                }
            }
            if (share_flag) {
                this.check_yaoqing();
            }
            Main.check_size();
            // let armature = TweenTool.getInstance().get_dragon("logo");
            // armature.display.x = 336;
            // armature.display.y = 300;
            // armature.animation.timeScale = 0.8;
            // armature.animation.play("",1);
            // this.ef.addChild(armature.display);
            //this.armature = armature;
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.x = 120;
            flower_v.y = 630;
            flower_v.play_by_times(-1);
            this.ef.addChild(flower_v);
            egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.x = 300;
                flower_v1.y = 360;
                flower_v1.play_by_times(-1);
                _this.ef.addChild(flower_v1);
            }, this, 1000);
            egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.x = 540;
                flower_v2.y = 540;
                flower_v2.play_by_times(-1);
                _this.ef.addChild(flower_v2);
            }, this, 2000);
            var flower_h = new mx.GeneralEffect("flower_h");
            flower_h.x = 120;
            flower_h.y = 810;
            flower_h.play_by_times(-1);
            this.ef.addChild(flower_h);
            egret.setTimeout(function () {
                var flower_h1 = new mx.GeneralEffect("flower_h");
                flower_h1.x = 300;
                flower_h1.y = 360;
                flower_h1.play_by_times(-1);
                _this.ef.addChild(flower_h1);
            }, this, 1000);
        };
        StartScreen.prototype.onTabChange = function (e) {
            this.c_s_d = e.item;
            this.c_sid = this.c_s_d.sid;
            this.c_ser_t.text = e.item.txt;
            this.bqian_p.source = e.item.bqian;
            this.close_ser_g();
        };
        StartScreen.prototype.close_ser_g = function () {
            var _this = this;
            this.rect.touchEnabled = false;
            if (!this.in_move) {
                this.in_move = true;
                var tar = 417; //Tools.screen_height - 154;
                var dis = tar - this.server_g.y;
                egret.Tween.get(this.server_g).to({ "y": tar }, dis).call(function () {
                    _this.in_move = false;
                }, this);
            }
        };
        StartScreen.prototype.btn_click = function (evt) {
            var _this = this;
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            switch (evt.currentTarget) {
                case view.djxf_b://打开关闭服务器列表
                    if (!this.in_move) {
                        if (this.rect.touchEnabled) {
                            this.close_ser_g();
                        }
                        else {
                            this.in_move = true;
                            var tar = 0; //Tools.screen_height - 154 - 288;
                            egret.Tween.get(this.server_g).to({ "y": tar }, 300).call(function () {
                                _this.rect.touchEnabled = true;
                                _this.in_move = false;
                            }, this);
                        }
                    }
                    break;
                case view.start_b://点击开始判断是否维护
                    var serd = (window ? window["mx_serd"] : null) || proxy.serd_list; //优先读取外部数据
                    for (var k in serd) {
                        var cs = serd[k];
                        if (this.c_sid + "" == cs.id + "") {
                            if (cs.wh) {
                                this.c_sid = this.c_s_d.sid;
                                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.st017 });
                                return;
                            }
                            break;
                        }
                    }
                    Main.SER_ID = Number(this.c_sid);
                    proxy.last_ser = Main.SER_ID;
                    if (window && window["mx_last"]) {
                        window["mx_last"] = Main.SER_ID;
                    }
                    var userd = (window ? window["mx_userd"] : null) || proxy.user_info;
                    var c_info = userd[this.c_sid];
                    if (c_info) {
                        Main.USER_ID = c_info.user_id;
                        if (mx.AppConfig.MXTag == "wxgame") {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_USER_INFO, "wx": true });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_USER_INFO });
                        }
                    }
                    else {
                        Main.USER_ID = null;
                        var param = {};
                        if (mx.AppConfig.MXTag == "wxgame") {
                            param = {
                                "sid": Main.SER_ID,
                                "name": mx.Tools.random_name(),
                                "avatar_id": 1,
                                "wx": true,
                                "t": mx.MX_NETS.CS_CREATE_ROLE,
                            };
                        }
                        else {
                            param = {
                                "sid": Main.SER_ID,
                                "name": mx.Tools.random_name(),
                                "avatar_id": 1,
                                "t": mx.MX_NETS.CS_CREATE_ROLE,
                            };
                        }
                        if (window && window["mx_shareid"]) {
                            param.share_id = window["mx_shareid"];
                        }
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, param);
                    }
                    facade.sendNotification(mx.MX_NOTICE.PLAY_MUSIC, { "name": "base" }); //播放背景音乐,ios点击可加载
                    break;
                case view.notice_b://打开公告。
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.NoticeView.S_NAME });
                    break;
                case view.rect:
                    this.close_ser_g();
                    break;
                default:
                    break;
            }
        };
        StartScreen.S_NAME = "StartScreen";
        StartScreen.xuanfu_tip = 0;
        return StartScreen;
    }(mx.BasicView));
    mx.StartScreen = StartScreen;
    __reflect(StartScreen.prototype, "mx.StartScreen");
})(mx || (mx = {}));
//# sourceMappingURL=StartScreen.js.map