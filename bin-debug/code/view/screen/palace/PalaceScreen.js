/**
*   @author mx
*   @date 2015.1.3
*   @desc 后宫主界面
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
    var PalaceScreen = (function (_super) {
        __extends(PalaceScreen, _super);
        function PalaceScreen(cd) {
            var _this = _super.call(this, cd) || this;
            _this.pssbs = [
                { "key": "cxg", "bg": "cxg_png", "bx": 180, "by": -20 },
                { "key": "xq", "bg": "xqby_png", "bx": 30, "by": 0 },
                { "key": "yxd", "bg": "yxd_png", "bx": 35, "by": 20 },
                { "key": "lg", "bg": "lenggong_png", "bx": 260, "by": 0 },
                { "key": "hzs", "bg": "hzs_png", "bx": 360, "by": -40 },
                { "key": "bbu", "bg": "bingbu_png", "bx": 0, "by": -40 },
            ];
            return _this;
        }
        PalaceScreen.mx_support = function () {
            return ["assets.palace", "api.HEROHOUGONG", "api.VIP", "api.EQUIP", "api.PINLI", "api.SHIQIN", "api.JINJI", "api.PINLI", "data.1701", "data.3116", "data.1715"];
        };
        PalaceScreen.prototype.get_guide_pos = function (gkey) {
            var tar, pos;
            switch (gkey) {
                case "s_hg_yxd"://养心殿
                    tar = this.pssbyxd;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    tar = { "x": pos.x - 93, "y": pos.y - 40, "width": tar.width, "height": tar.height };
                    break;
                case "s_hg_xq"://省亲别院
                    tar = this.pssbxq;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    tar = { "x": pos.x - 43, "y": pos.y - 14, "width": tar.width, "height": tar.height };
                    break;
                case "s_hg_hzs"://皇子所
                    tar = this.pssbhzs;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    tar = { "x": pos.x + 65, "y": pos.y - 20, "width": tar.width, "height": tar.height };
                    break;
                case "s_hg_zxd"://储秀宫
                    tar = this.pssbcxg;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    tar = { "x": pos.x - 10, "y": pos.y - 90, "width": tar.width, "height": tar.height };
                    break;
                case "s_m_mr"://主页-兵部
                    tar = this.pssbbbu;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    tar = { "x": pos.x - 130, "y": pos.y - 90, "width": tar.width, "height": tar.height };
                    break;
                default:
                    break;
            }
            return tar;
        };
        PalaceScreen.prototype.back_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var p_name = PalaceScreen.P_NAME;
            if (p_name) {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                PalaceScreen.P_NAME = null;
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
            }
        };
        PalaceScreen.prototype.new_tishi = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
        };
        PalaceScreen.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var arr = this.pssbs;
            if (mx.MX_COMMON.IN_GUIDE) {
                arr = [
                    { "key": "yxd", "bg": "yxd_png", "bx": 35, "by": 20 },
                ];
                var gproxy = facade.retrieveProxy(mx.GuideProxy.NAME);
                if (gproxy.check_guide_by_key("m_yxd")) {
                    arr.push({ "key": "hzs", "bg": "hzs_png", "bx": 280, "by": 0 });
                }
                if (gproxy.check_guide_by_key("m_hzszy")) {
                    arr.push({ "key": "cxg", "bg": "cxg_png", "bx": 100, "by": -20 });
                }
                if (gproxy.check_guide_by_key("m_xx")) {
                    arr.push({ "key": "bbu", "bg": "bingbu_png", "bx": 0, "by": -40 });
                }
            }
            for (var k in arr) {
                var cd = arr[k];
                var pssb = this["pssb" + cd.key];
                pssb.data = cd;
                pssb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.st_click, this);
                pssb.addEventListener(egret.TouchEvent.TOUCH_END, this.btn_click, this);
            }
            this.hzssj_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            this.yxdsj_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            this.cxgsj_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            this.init_ani();
            this.check_time();
            this.startShake();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (pproxy.shijian && pproxy.shijian.length) {
                if (mx.MX_COMMON.IN_GUIDE) {
                    var gproxy = (facade.retrieveProxy(mx.GuideProxy.NAME));
                    var guide = gproxy.get_curr_guide();
                    if (guide.jqid == "m_yxd") {
                        //ApplicationFacade.getInstance().sendNotification(MX_NOTICE.GUIDE_SHOW);
                        pproxy.check_shijian();
                    }
                    else {
                        pproxy.shijian = null;
                    }
                }
                else {
                    pproxy.check_shijian();
                }
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    this.check_p_guide();
                }
                else {
                    this.g_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
            var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            lproxy.check_fl();
            // //事件提示
            // let biaoji = pproxy.biaoji;
            this.yxdsj_btn.visible = false; // biaoji[0] == 1;
            // if (biaoji[1] == 1) {
            //     this.yxdsj_btn.visible = true;
            // }
            this.hzssj_btn.visible = false; //biaoji[2] == 1;
            this.cxgsj_btn.visible = false; //biaoji[3] == 1;
            facade.registerMediator(new mx.PalaceMediator(this));
        };
        PalaceScreen.prototype.check_p_guide = function () {
            var facade = mx.ApplicationFacade.getInstance();
            //facade.sendNotification(MX_NOTICE.GUIDE_SHOW);
            var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GuideProxy.NAME);
            var guide = gproxy.get_curr_guide();
            if (guide.jqid == 'm_yxd') {
                var curr_guide_step = gproxy.get_curr_guide_step();
                if (curr_guide_step.length == 1 && curr_guide_step[0].touchrect == 'v_hg_hzcs') {
                    //特殊逻辑，这里处理下，不处理
                    return;
                }
            }
            facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        PalaceScreen.prototype.mx_test = function (event) {
            this.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            this.check_p_guide();
        };
        PalaceScreen.prototype.ts_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            switch (e.currentTarget) {
                case view.hzssj_btn:
                case view.yxdsj_btn:
                    dproxy.shijian_type = 0;
                    break;
                case view.cxgsj_btn:
                    dproxy.shijian_type = 1;
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ShiJianScreen.S_NAME);
        };
        PalaceScreen.prototype.startShake = function () {
            if (this.hzssj_btn.visible) {
                mx.TweenTool.getInstance().get_tween(this.hzssj_btn, "btnshake", true);
            }
            if (this.yxdsj_btn.visible) {
                mx.TweenTool.getInstance().get_tween(this.yxdsj_btn, "btnshake", true);
            }
            if (this.cxgsj_btn.visible) {
                mx.TweenTool.getInstance().get_tween(this.cxgsj_btn, "btnshake", true);
            }
        };
        PalaceScreen.prototype.stopShake = function () {
            egret.Tween.removeTweens(this.hzssj_btn);
            egret.Tween.removeTweens(this.yxdsj_btn);
            egret.Tween.removeTweens(this.cxgsj_btn);
        };
        PalaceScreen.prototype.init_ani = function () {
            var _this = this;
            //垂直方向的花瓣
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.rotation = 30;
            flower_v.scaleX = 1.5;
            flower_v.scaleY = 1.5;
            flower_v.x = 120;
            flower_v.y = 270;
            flower_v.play_by_times(-1);
            this.ef.addChild(flower_v);
            this.outid1 = egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.rotation = 30;
                flower_v.scaleX = 1.5;
                flower_v.scaleY = 1.5;
                flower_v1.x = 300;
                flower_v1.y = 360;
                flower_v1.play_by_times(-1);
                _this.ef.addChild(flower_v1);
                _this.outid1 = null;
            }, this, 1000);
            this.outid2 = egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.rotation = 30;
                flower_v2.scaleX = 1.5;
                flower_v2.scaleY = 1.5;
                flower_v2.x = 540;
                flower_v2.y = 300;
                flower_v2.play_by_times(-1);
                _this.ef.addChild(flower_v2);
                _this.outid2 = null;
            }, this, 2000);
            //水平方向的花瓣
            var flower_h = new mx.GeneralEffect("flower_h");
            flower_h.scaleX = -1.5;
            flower_h.scaleY = 1.5;
            flower_h.x = 600;
            flower_h.y = 810;
            flower_h.play_by_times(-1);
            this.ef.addChild(flower_h);
            //云
            egret.Tween.get(this.cloud, { "loop": true }).to({ "x": 720 }, 72000);
        };
        PalaceScreen.prototype.check_time = function () {
            var base;
            var time_mode = mx.AppConfig.get_time_mode();
            if (time_mode == mx.MX_COMMON.TIME_DAY) {
                base = "hgbg";
                this.init_xren();
                this.init_dragon_tree("limu");
            }
            else {
                base = "nhgbg";
                this.cloud.alpha = 0.3;
                this.init_night_role();
                this.init_dragon_tree("nlimu");
            }
            var view = this;
            for (var i = 1; i <= 6; i++) {
                view["hgbg" + i].source = base + i + "_png";
            }
        };
        PalaceScreen.prototype.init_night_role = function () {
            var view = this;
            var xxmc = new mx.GeneralEffect("xxingmc"); //星星
            xxmc.x = 402;
            xxmc.y = 222;
            xxmc.scaleX = xxmc.scaleY = 1.5;
            xxmc.play_by_times(-1);
            xxmc.touchEnabled = false;
            this.bg.addChild(xxmc);
            var bs = 1.2;
            var mc4 = view.mc4;
            mc4.x = 300;
            mc4.y = 240;
            var xren3 = new mx.GeneralEffect("dlren");
            xren3.scaleX = xren3.scaleY = bs;
            xren3.play_by_times(-1);
            mc4.addChild(xren3);
            var mc12 = view.mc12;
            var xren3_2 = new mx.GeneralEffect("dlren");
            xren3_2.scaleX = xren3_2.scaleY = bs;
            xren3_2.play_by_times(-1);
            mc12.addChild(xren3_2);
            var mc13 = view.mc13;
            var xren3_3 = new mx.GeneralEffect("dlren");
            xren3_3.scaleX = xren3_3.scaleY = bs;
            xren3_3.play_by_times(-1);
            mc13.addChild(xren3_3);
            var mc3 = view.mc3;
            var xren3_4 = new mx.GeneralEffect("dlren");
            xren3_4.scaleX = xren3_4.scaleY = bs;
            xren3_4.play_by_times(-1);
            mc3.addChild(xren3_4);
            var tweentool = mx.TweenTool.getInstance();
            //巡逻士兵1 420->300
            tweentool.get_tween(mc3, "xunluo", { "dir": -1, "ss": 120, "st": 30, "loop": true });
            //巡逻士兵4 300-420
            tweentool.get_tween(mc4, "xunluo", { "dir": 1, "ss": 120, "st": 30, "loop": true });
            //巡逻士兵2 840->960
            tweentool.get_tween(view.mc12, "xunluo", { "dir": 1, "ss": 120, "st": 30, "loop": true });
            //巡逻士兵3 870->990
            tweentool.get_tween(view.mc13, "xunluo", { "dir": 1, "ss": 120, "st": 30, "loop": true });
        };
        PalaceScreen.prototype.init_xren = function () {
            var view = this;
            var bs = 1.2;
            for (var i = 1; i < 6; i++) {
                var cg = view["mc" + i];
                var mc = new mx.GeneralEffect("xren" + i);
                mc.scaleX = mc.scaleY = bs;
                mc.play_by_times(-1);
                cg.addChild(mc);
            }
            var xren1_2 = new mx.GeneralEffect("xren1");
            xren1_2.scaleX = xren1_2.scaleY = bs;
            xren1_2.play_by_times(-1);
            view.mc11.addChild(xren1_2);
            var xren3_2 = new mx.GeneralEffect("xren3");
            xren3_2.scaleX = xren3_2.scaleY = bs;
            xren3_2.play_by_times(-1);
            view.mc12.addChild(xren3_2);
            var xren3_3 = new mx.GeneralEffect("xren3");
            xren3_3.scaleX = xren3_3.scaleY = bs;
            xren3_3.play_by_times(-1);
            view.mc13.addChild(xren3_3);
            var tweentool = mx.TweenTool.getInstance();
            //巡逻士兵1 420->300
            tweentool.get_tween(view.mc3, "xunluo", { "dir": -1, "ss": 120, "st": 30, "loop": true });
            //巡逻士兵2 840->960
            tweentool.get_tween(view.mc12, "xunluo", { "dir": 1, "ss": 120, "st": 30, "loop": true });
            //巡逻士兵3 870->990
            tweentool.get_tween(view.mc13, "xunluo", { "dir": 1, "ss": 120, "st": 30, "loop": true });
        };
        PalaceScreen.prototype.init_dragon_tree = function (base) {
            var armature = mx.TweenTool.getInstance().get_dragon(base, 0, "limu");
            armature.animation.play();
            armature.display.scaleX = 1.5;
            armature.display.scaleY = 1.5;
            this.limu_g.addChild(armature.display);
            this.armature = armature;
        };
        PalaceScreen.prototype.pre_move = function (evt) {
            this.start_x = evt.stageX;
        };
        PalaceScreen.prototype.show_move = function (evt) {
            var newx = evt.stageX;
            var mv = newx - this.start_x;
            var basex = 630; //1350 - 720;
            var newx2 = this.palace1.x + mv;
            if (newx2 > 0) {
                newx2 = 0;
            }
            else if (newx2 < -basex) {
                newx2 = -basex;
            }
            mv = newx2 - this.palace1.x;
            this.start_x += mv;
            this.palace1.x = newx2;
            this.palace2.x += mv / basex * 468; //1188 - 720
            this.palace3.x += mv / basex * 308; //1028
            this.palace4.x += mv / basex * 153; //873
            this.palace5.x += mv / basex * 60; //780
        };
        PalaceScreen.prototype.st_click = function (e) {
            this.stime = egret.getTimer();
        };
        PalaceScreen.prototype.btn_click = function (e) {
            var ss = Math.abs(e.stageX - this.start_x);
            if (ss > 20) {
                return;
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var now = egret.getTimer();
            if (now > this.stime + 200) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var c_n = e.currentTarget.data.bg;
            var net;
            switch (c_n) {
                case "yxd_png"://养心殿
                    var net1 = [
                        {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "11"
                        }
                    ];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.YXDianScreen.S_NAME,
                        "param": { "net": net1 }
                    });
                    break;
                case "hzs_png"://皇子所
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
                case "cxg_png"://储秀宫
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_CXG_DATA });
                    break;
                // case "gtyjiao_png"://宫廷一角（冷宫+囚凤宫+掖庭）
                //     facade.sendNotification(MX_NOTICE.SCENE_CHANGE, HGYiJiaoScreen.S_NAME);
                //     break;
                case "lenggong_png"://冷宫
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.LGongScreen.S_NAME);
                    break;
                case "xqby_png"://省亲
                    var proxy = facade.retrieveProxy(mx.GameProxy.NAME);
                    var lv = proxy.user_lv;
                    if (lv >= 20) {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XQBYuanScreen.S_NAME);
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0098 });
                    }
                    break;
                case "hlyua_png"://翰林院
                    // net = [{
                    //     "t": MX_NETS.CS_HLY_FEIZI,
                    // }];
                    // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //     "sname": HLYScreen.S_NAME,
                    //     "param": { "net": net }
                    // });
                    break;
                case "bingbu_png"://兵部
                    mx.TeamScreen.P_NAME = PalaceScreen.S_NAME;
                    var net_1 = [
                        {
                            "t": mx.MX_NETS.CS_INIT_SKILL
                        }, {
                            "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                            "type": "1|2|3|4|5|6"
                        }
                    ];
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                        "sname": mx.TeamScreen.S_NAME,
                        "param": { "net": net_1 }
                    });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0117 });
                    break;
            }
        };
        PalaceScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            egret.Tween.removeTweens(view.cloud);
            egret.Tween.removeTweens(view.mc3);
            egret.Tween.removeTweens(view.mc4);
            egret.Tween.removeTweens(view.mc12);
            egret.Tween.removeTweens(view.mc13);
            view.yxdsj_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            view.hzssj_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            view.cxgsj_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.ts_click, this);
            view.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.g_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            for (var k in this.pssbs) {
                var pssb = view["pssb" + this.pssbs[k].key];
                pssb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.st_click, this);
                pssb.removeEventListener(egret.TouchEvent.TOUCH_END, this.btn_click, this);
            }
            if (this.outid1) {
                egret.clearTimeout(this.outid1);
                this.outid1 = null;
            }
            if (this.outid2) {
                egret.clearTimeout(this.outid2);
                this.outid1 = null;
            }
            this.stopShake();
            this.ef.removeChildren();
            dragonBones.WorldClock.clock.remove(this.armature);
            mx.ApplicationFacade.getInstance().removeMediator(mx.PalaceMediator.NAME);
        };
        PalaceScreen.S_NAME = "PalaceScreen";
        return PalaceScreen;
    }(mx.BasicView));
    mx.PalaceScreen = PalaceScreen;
    __reflect(PalaceScreen.prototype, "mx.PalaceScreen");
})(mx || (mx = {}));
//# sourceMappingURL=PalaceScreen.js.map