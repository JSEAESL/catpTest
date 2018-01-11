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
    var JingChengScreen = (function (_super) {
        __extends(JingChengScreen, _super);
        function JingChengScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pssbs = [
                //{"key" : "hgld", "bg" : "hgld_png", "bx" : 40, "by" : -20},//后宫掠夺
                //{"key" : "tm", "bg" : "tm_png", "bx" : 220, "by" : 0},//太庙
                { "key": "jfs", "bg": "jfs_png", "bx": 330, "by": 0 },
                { "key": "xgsi", "bg": "xgsi_png", "bx": 25, "by": 30 },
                { "key": "jjc", "bg": "jjc_png", "bx": 210, "by": -30 },
                { "key": "jiazu", "bg": "jiazu_png", "bx": -40, "by": -40 },
            ];
            return _this;
        }
        JingChengScreen.mx_support = function () {
            return ["assets.jingcheng"];
        };
        JingChengScreen.prototype.get_guide_pos = function (gkey) {
            var view = this;
            var tar, pos;
            switch (gkey) {
                case "s_jc_tm"://太庙
                    tar = view.pssbtm;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    return { "x": pos.x + 50, "y": pos.y - 35, "width": tar.width, "height": tar.height };
                case "s_jc_jjc"://竞技场
                    tar = view.pssbjjc;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    return { "x": pos.x + 71, "y": pos.y - 15, "width": tar.width, "height": tar.height };
                case "s_jc_xgs"://相国寺
                    tar = view.pssbxgsi;
                    pos = tar.parent.localToGlobal(tar.x, tar.y);
                    return { "x": pos.x - 80, "y": pos.y - 30, "width": tar.width, "height": tar.height };
                default:
                    break;
            }
            return tar;
        };
        JingChengScreen.prototype.init_view = function () {
            mx.ChatScreen.P_NAME = JingChengScreen.S_NAME;
            var facade = mx.ApplicationFacade.getInstance();
            var tproxy = (facade.retrieveProxy(mx.TempleProxy.NAME));
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            var arr = this.pssbs;
            for (var k in arr) {
                var cd = arr[k];
                var pssb = this["pssb" + cd.key];
                if (cd.key == "tm") {
                    cd.ts = tproxy.temple_flag || pproxy.tujian_tishi ? "tishi_png" : null;
                }
                pssb.data = cd;
                pssb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.st_click, this);
                pssb.addEventListener(egret.TouchEvent.TOUCH_END, this.btn_click, this);
            }
            //滑动组
            this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.init_ani();
            this.check_time();
            var spt = mx.AppConfig.check_not_support("share");
            if (!spt) {
                this.wb_show();
                if (this.lpss_btn.visible) {
                    mx.TweenTool.getInstance().get_tween(this.lpss_btn, "btnshake", true);
                }
                this.lpss_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.sj_click, this);
            }
            var uproxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            if (uproxy.beiti) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionZWAlert.S_NAME, "param": uproxy.beiti + 4 });
                uproxy.beiti = 0;
            }
            //暂时屏蔽落魄书生.........
            this.lpss_btn.visible = false;
            facade.registerMediator(new mx.JingChengMediator(this));
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
        };
        JingChengScreen.prototype.back_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
        };
        JingChengScreen.prototype.new_tishi = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var tproxy = (facade.retrieveProxy(mx.TempleProxy.NAME));
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.pssbtm.data = { "key": "tm", "bg": "tm_png", "bx": 145, "by": 20, "ts": tproxy.temple_flag || pproxy.tujian_tishi ? "tishi_png" : null }; //太庙
        };
        JingChengScreen.prototype.wb_show = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
            if (pproxy.wb_share_sj) {
                this.lpss_btn.visible = true;
            }
            else {
                this.lpss_btn.visible = false;
            }
        };
        JingChengScreen.prototype.sj_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.lpss_btn://弹avg                    
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "wbsj",
                            "sj_id": 7
                        }
                    });
                    break;
            }
        };
        JingChengScreen.prototype.check_time = function () {
            var base;
            var time_mode = mx.AppConfig.get_time_mode();
            if (time_mode == mx.MX_COMMON.TIME_DAY) {
                base = "jcbg";
                this.init_role();
            }
            else {
                base = "njcbg";
                this.cloud.alpha = 0.3;
                this.init_night_role();
            }
            var view = this;
            for (var i = 2; i <= 9; i++) {
                view["jc_bg" + i + "_p"].source = base + i + "_png";
            }
        };
        JingChengScreen.prototype.init_night_role = function () {
            var view = this;
            //星星
            var xxmc = new mx.GeneralEffect("xxingmc");
            xxmc.x = 265;
            xxmc.y = 148;
            xxmc.scaleX = xxmc.scaleY = 1.5;
            xxmc.play_by_times(-1);
            xxmc.touchEnabled = false;
            view.bg.addChild(xxmc);
            //水波
            var shuibo = new mx.GeneralEffect("shuibo");
            shuibo.x = 270;
            shuibo.y = 141;
            shuibo.scaleX = shuibo.scaleY = 1.5;
            shuibo.play_by_times(-1);
            shuibo.touchEnabled = false;
            view.jcbg1.addChild(shuibo);
            var tweentool = mx.TweenTool.getInstance();
            var bs = 1.2;
            //医馆前小人 900->600
            var cg8 = view.mcg8;
            var dlr1 = new mx.GeneralEffect("dlren");
            dlr1.scaleX = dlr1.scaleY = bs;
            dlr1.play_by_times(-1);
            cg8.addChild(dlr1);
            tweentool.get_tween(cg8, "xunluo", { "dir": -1, "ss": 300, "st": 10, "loop": true });
            var cg14 = view.mcg14;
            cg14.top = 330;
            cg14.x = 1260;
            var dlr2 = new mx.GeneralEffect("dlren");
            dlr2.scaleX = dlr2.scaleY = bs;
            dlr2.play_by_times(-1);
            dlr2.x = 20;
            dlr2.y = -15;
            cg14.addChild(dlr2);
            var dlr3 = new mx.GeneralEffect("dlren");
            dlr3.scaleX = dlr3.scaleY = bs;
            dlr3.play_by_times(-1);
            cg14.addChild(dlr3);
            tweentool.get_tween(cg14, "xunluo", { "dir": -1, "ss": 900, "st": 10, "loop": true });
        };
        JingChengScreen.prototype.init_ani = function () {
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
        JingChengScreen.prototype.init_role = function () {
            var view = this;
            var bs = 1.2;
            for (var i = 1; i < 18; i++) {
                var cg = view["mcg" + i];
                var mc = new mx.GeneralEffect("jcr" + i);
                mc.scaleX = mc.scaleY = bs;
                mc.play_by_times(-1);
                cg.addChild(mc);
            }
            var mc18 = new mx.GeneralEffect("jcr16");
            mc18.scaleX = mc18.scaleY = bs;
            mc18.play_by_times(-1);
            view.mcg18.addChild(mc18);
            var mc19 = new mx.GeneralEffect("jcr8");
            mc19.scaleX = mc19.scaleY = bs;
            mc19.play_by_times(-1);
            view.mcg19.addChild(mc19);
            this.init_tween();
        };
        JingChengScreen.prototype.init_tween = function () {
            var view = this;
            var tweentool = mx.TweenTool.getInstance();
            //船 660->270
            tweentool.get_tween(view.mcg17, "xunluo", { "dir": -1, "ss": 400, "st": 25, "loop": true });
            //医馆前小人 900->600
            tweentool.get_tween(view.mcg8, "xunluo", { "dir": -1, "ss": 300, "st": 10, "loop": true });
            //车夫 450-1200
            tweentool.get_tween(view.mcg2, "xunluo", { "dir": 1, "ss": 750, "st": 18, "loop": true });
            //算命 1380-630
            tweentool.get_tween(view.mcg7, "xunluo", { "rdir": -1, "dir": -1, "ss": 750, "st": 9, "loop": true });
            //武夫 300-1500
            tweentool.get_tween(view.mcg19, "xunluo", { "dir": 1, "ss": 1200, "st": 10, "loop": true });
            //骑马官兵480-1200
            tweentool.get_tween(view.mcg11, "xunluo", { "dir": 1, "ss": 720, "st": 10, "loop": true });
            //骑马过客1380-480
            tweentool.get_tween(view.mcg14, "xunluo", { "dir": -1, "ss": 900, "st": 8, "loop": true });
        };
        JingChengScreen.prototype.pre_move = function (evt) {
            this.start_x = evt.stageX;
        };
        JingChengScreen.prototype.show_move = function (evt) {
            var newx = evt.stageX;
            var mv = newx - this.start_x;
            var basex = 1280; //2000 - 720;
            var newx2 = this.jcbg6.x + mv;
            if (newx2 > 0) {
                newx2 = 0;
            }
            else if (newx2 < -basex) {
                newx2 = -basex;
            }
            mv = newx2 - this.jcbg6.x;
            this.start_x += mv;
            this.jcbg6.x = newx2;
            this.jcbg5.x += mv / basex * 966; //1686 - 720;
            this.jcbg4.x += mv / basex * 774; //1494
            this.jcbg3.x += mv / basex * 600; //1320
            this.jcbg2.x += mv / basex * 386; //1106
            this.jcbg1.x += mv / basex * 192; //912
        };
        JingChengScreen.prototype.st_click = function (e) {
            this.stime = egret.getTimer();
        };
        JingChengScreen.prototype.btn_click = function (e) {
            var ss = Math.abs(e.stageX - this.start_x);
            if (ss > 20) {
                return;
            }
            var now = egret.getTimer();
            if (now > this.stime + 200) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var c_n = e.currentTarget.data.key;
            var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
            wproxy.per_scene = "jingcheng";
            var proxy = facade.retrieveProxy(mx.GameProxy.NAME);
            switch (c_n) {
                case "jfs"://教坊司
                    var c_xlv = proxy.user_xlv;
                    if (c_xlv) {
                        var net1 = [
                            {
                                "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                                "type": "11"
                            }
                        ];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.JFSScreen.S_NAME,
                            "param": { "net": net1 }
                        }, JingChengScreen.S_NAME);
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kq000 });
                    }
                    break;
                case "hgld"://后宫掠夺
                    // let c_xlv2 = proxy.user_xlv;
                    // if(c_xlv2 > 3){//天8可以參加掠夺
                    //     let net2 = [{
                    //         "t": MX_NETS.CS_LUEDUO_MINE
                    //     }];
                    //     facade.sendNotification(MX_NOTICE.SCENE_CHANGE, {
                    //         "sname" : LDMainScreen.S_NAME,
                    //         "param" : {"net" : net2}
                    //     });
                    // }else{
                    //     facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.kq001});
                    // }
                    break;
                case "hshi":
                    if (Number(proxy.user_lv) < 30) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.xq025, mx.Lang.dji + 30) });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HeiShiScreen.S_NAME);
                    }
                    break;
                case "jiazu"://家族
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_INIT,
                    });
                    break;
                case "xgsi"://相国寺
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSScreen.S_NAME);
                    break;
                case "jjc"://竞技场
                    var c_lv = proxy.user_lv;
                    if (c_lv >= 10) {
                        var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
                        jproxy.jj_flag = true;
                        var net = [{
                                "t": mx.MX_NETS.CS_QUEUE_INFO,
                                "team_id": 11
                            }];
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, {
                            "sname": mx.JJCMainScreen.S_NAME,
                            "param": { "net": net }
                        });
                    }
                    else {
                        var str = mx.Tools.format(mx.Lang.p0110, 10, mx.Lang.jjc);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                    }
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    break;
            }
        };
        JingChengScreen.prototype.on_remove = function () {
            var view = this;
            egret.Tween.removeTweens(view.cloud);
            egret.Tween.removeTweens(view.mcg2);
            egret.Tween.removeTweens(view.mcg7);
            egret.Tween.removeTweens(view.mcg8);
            egret.Tween.removeTweens(view.mcg11);
            egret.Tween.removeTweens(view.mcg14);
            egret.Tween.removeTweens(view.mcg17);
            egret.Tween.removeTweens(view.mcg19);
            egret.Tween.removeTweens(this.lpss_btn);
            for (var k in this.pssbs) {
                var pssb = view["pssb" + this.pssbs[k].key];
                pssb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.st_click, this);
                pssb.removeEventListener(egret.TouchEvent.TOUCH_END, this.btn_click, this);
            }
            view.bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            view.bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            view.lpss_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.sj_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            if (this.outid1) {
                egret.clearTimeout(this.outid1);
                this.outid1 = null;
            }
            if (this.outid2) {
                egret.clearTimeout(this.outid2);
                this.outid1 = null;
            }
            view.ef.removeChildren();
            mx.ApplicationFacade.getInstance().removeMediator(mx.JingChengMediator.NAME);
        };
        JingChengScreen.S_NAME = "JingChengScreen";
        return JingChengScreen;
    }(mx.BasicView));
    mx.JingChengScreen = JingChengScreen;
    __reflect(JingChengScreen.prototype, "mx.JingChengScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JingChengScreen.js.map