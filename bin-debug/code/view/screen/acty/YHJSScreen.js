/**
 *   @author qianjun
 *   @date 2016.12.20
 *   @desc 妖狐降世
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
    var YHJSScreen = (function (_super) {
        __extends(YHJSScreen, _super);
        function YHJSScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.touch_stop = false;
            _this.first = true;
            _this.award_hunpo = [0, 30, 60, 100, 150];
            _this.armature_arr = [];
            _this.tween_arr = [];
            _this.huyao_sex = "";
            _this.event = "";
            _this.weiba_event = "";
            return _this;
        }
        YHJSScreen.mx_support = function () {
            return [
                "assets.yhjs_main", "assets.yhjs_main_mc", "assets.shenle_nan", "assets.shenle_nv", "assets.slnan_9", "assets.slnv_9",
                "api.ACTHUYAOAWARD", "api.ACTHUYAO", "data.2809"
            ];
        };
        YHJSScreen.prototype.init_view = function () {
            var view = this;
            this.proxy.huyao_final_award_type = 0;
            this.display_g.alpha = 0;
            this.touch_stop = true;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckxtong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rhjfeng_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hqfshen_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xqclose_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fsclose_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qwckan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lqhyao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            for (var i = 1; i <= 4; ++i) {
                view["ts" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.ts_click, this);
            }
            view.rect_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rect_bg.touchEnabled = false;
            view.sming_g.visible = false;
            view.fshen_g.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.YHJSScreenMediator(this));
            this.top_g.alpha = 0;
            //龙骨动画 本地存储只播放一次
            var yaohu = egret.localStorage.getItem("YAOHU_PLAY");
            if (!yaohu || yaohu == "") {
                egret.localStorage.setItem("YAOHU_PLAY", "play");
                this.first = true;
            }
            else if (yaohu == 'play') {
                this.first = false;
            }
            if (this.first) {
                this.tween_arr.push(egret.Tween.get(this.top_g).to({ alpha: 1 }, 1500).call(function () {
                    this.start_init();
                }, this));
            }
            else {
                this.top_g.alpha = 1;
                this.start_init();
            }
        };
        YHJSScreen.prototype.start_init = function () {
            mx.DataTool.getInstance().data_tool("HUYAO_OPEN"); //统计狐妖界面被打开次数
            var view = this;
            dragonBones.WorldClock.clock.clear();
            this.armature_arr = [];
            this.huyao_sex = 'nanhu';
            //狐妖动画、尾巴 男+女 
            this.init_huyao("nanhu", 382, mx.Tools.screen_height / 2 - 52);
            this.init_huyao("nvhu", 382, mx.Tools.screen_height / 2 - 52);
            this.weiba_play("nanhu" + 9, 390, mx.Tools.screen_height / 2 - 52);
            this.weiba_play("nvhu" + 9, 390, mx.Tools.screen_height / 2 - 52);
            this.movie_play();
            this.fresh_time();
            var gameProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            //调整中心按钮位置
            var height = mx.Tools.screen_height;
            view.fy3_g.top = (height - view.fy1_g.top - 147 - 147 - view.fy4_g.bottom - 24 - 147) / 2 + view.fy1_g.top + 147;
            //第几天的封印
            for (var i = 1; i <= 5; ++i) {
                if (i > 1) {
                    view["fy" + i + "_b"].set_ssres(i <= gameProxy.huyao ? ("fyin" + i + "_png") : ("fyin" + i + "wkqi_png"));
                }
                else {
                    view["fy" + i + "_b"].set_ssres("fyin" + i + "_png");
                }
                view["fy" + i + "_b"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.fyin_click, this);
                if (i <= gameProxy.huyao) {
                    // let ef = new GeneralEffect("fyzquan");
                    // ef.play_by_times(-1);//只播放一次
                    // ef.horizontalCenter = -7.5;
                    // ef.verticalCenter = 1.5;
                    // ef.name = "fyzquan";
                    // view["fy" + i + "_g"].addChild(ef);
                    // view["fy" + i + "_g"].setChildIndex(view["fy" + i + "_b"], 1);
                    // view["fy" + i + "_g"].setChildIndex(ef, 0);
                }
            }
            this.fresh_jindu();
        };
        YHJSScreen.prototype.movie_play = function () {
            var x_arr = [{ "left": 225, "bottom": 52 }, { "left": 105, "bottom": 180 }, { "right": 225, "bottom": 52 }, { "right": 105, "bottom": 172 }];
            //四处鬼火
            this.mc_g.alpha = 0;
            for (var i = 0; i < 4; ++i) {
                var ef = new mx.GeneralEffect("yhghuo");
                for (var j in x_arr[i]) {
                    ef[j] = x_arr[i][j];
                }
                ef.play_by_times(-1); //只播放一次
                this.mc_g.addChild(ef);
            }
            this.tween_arr.push(egret.Tween.get(this.mc_g).to({ alpha: 1 }, 800).call(function () {
                this.guihuo();
            }, this));
        };
        YHJSScreen.prototype.guihuo = function () {
            //先播放光圈
            this.dragon_play("guangquan", 382, mx.Tools.screen_height / 2 + 75, 0.8, 1);
            //狐妖男出
            var pos_y = mx.Tools.screen_height / 2 - 52;
            var pre_scale = 0.62 * 1.5;
            var to_scale = 0.52 * 1.5;
            this.tween_arr.push(egret.Tween.get(this.huyao_nan.display).to({ scaleX: pre_scale, scaleY: pre_scale }, 500).to({ scaleX: to_scale, scaleY: to_scale }, 200).call(function () {
                this.tween_arr.push(egret.Tween.get(this.huyao_nan.display, { loop: true }).to({ y: pos_y + 4 }, 500).to({ y: pos_y - 4 }, 500).to({ y: pos_y }, 500));
                this.tween_arr.push(egret.Tween.get(this.huyao_nv.display, { loop: true }).to({ y: pos_y + 4 }, 500).to({ y: pos_y - 4 }, 500).to({ y: pos_y }, 500));
                this.tween_arr.push(egret.Tween.get(this.weiba_nan.display, { loop: true }).to({ y: pos_y + 4 }, 500).to({ y: pos_y - 4 }, 500).to({ y: pos_y }, 500));
                this.tween_arr.push(egret.Tween.get(this.weiba_nv.display, { loop: true }).to({ y: pos_y + 4 }, 500).to({ y: pos_y - 4 }, 500).to({ y: pos_y }, 500));
                this.weiba_event = "cxian_over";
                this.weiba_nan.display.visible = true;
                this.weiba_nan.animation.play("cxian", 1);
                if (!this.first) {
                    this.fy_over();
                }
            }, this));
            this.event = "cxian_over";
            this.huyao_nan.display.visible = true;
            this.huyao_nan.animation.play("cxian", 1);
            //3s后转换
            this.timeout = egret.setTimeout(this.change_huyao, this, this.first ? 3920 : 8000, "nvhu");
            //光点
            this.dragon_play("guangdian", 360, mx.Tools.screen_height - 90);
        };
        YHJSScreen.prototype.init_huyao = function (name, pos_x, pos_y) {
            var armature = mx.TweenTool.getInstance().get_dragon(name, 2);
            this.dragon_g.addChild(armature.display);
            armature.display.x = pos_x;
            armature.display.y = pos_y;
            armature.display.scaleX = armature.display.scaleY = name == "nanhu" ? 0 : (0.52 * 1.5); //*1.5为龙骨资源暂时放大，资源到后删除
            armature.animation.timeScale = 1;
            armature.display.visible = name == "nanhu";
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.huyao_loop, this);
            armature.animation.play("zding", 0);
            this.armature_arr.push(armature);
            //armature.animation.gotoAndPlayByFrame(,);
            name == "nanhu" ? this.huyao_nan = armature : this.huyao_nv = armature;
        };
        YHJSScreen.prototype.change_huyao = function (name) {
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            //烟雾
            var ef = new mx.GeneralEffect("yhywu");
            ef.play_by_times(1); //只播放一次
            ef.horizontalCenter = 0;
            ef.verticalCenter = 400;
            this.mc_g.addChild(ef);
            //转为狐妖女
            if (name == "nvhu") {
                this.event = "xshi_over";
                this.huyao_nan.animation.play("xshi", 1);
                this.weiba_event = "xshi_over";
                this.weiba_nan.animation.play("xshi", 1);
                this.event = "cxian_over";
                this.huyao_nv.display.visible = true;
                this.huyao_nv.animation.play("cxian", 1);
                this.weiba_event = "cxian_over";
                this.weiba_nv.display.visible = true;
                this.weiba_nv.animation.play("cxian", 1);
            }
            else {
                this.event = "xshi_over";
                this.huyao_nv.animation.play("xshi", 1);
                this.weiba_event = "xshi_over";
                this.weiba_nv.animation.play("xshi", 1);
                this.event = "cxian_over";
                this.huyao_nan.display.visible = true;
                this.huyao_nan.animation.play("cxian", 1);
                this.weiba_event = "cxian_over";
                this.weiba_nan.display.visible = true;
                this.weiba_nan.animation.play("cxian", 1);
            }
            if (this.first) {
                this.timeout2 = egret.setTimeout(this.lianziplay, this, 2000);
                this.first = false;
            }
            //8s后再次转换 
            this.timeout = egret.setTimeout(this.change_huyao, this, 8000, name == 'nvhu' ? "nanhu" : "nvhu");
            this.huyao_sex = name;
        };
        YHJSScreen.prototype.fy_over = function () {
            this.tween_arr.push(egret.Tween.get(this.display_g).to({ alpha: 1 }, 600).call(function () {
                this.touch_stop = false;
            }, this));
        };
        YHJSScreen.prototype.lianziplay = function () {
            egret.clearTimeout(this.timeout2);
            this.timeout2 = null;
            var height = 0;
            if (mx.Tools.screen_height < mx.MX_COMMON.GS_HEIGHT) {
                height = mx.Tools.screen_height + 30;
            }
            else {
                height = mx.Tools.screen_height - 90;
            }
            this.dragon_play("fyin", 360, height, 1, 1);
            this.timeout3 = egret.setTimeout(this.fyplay, this, 660);
        };
        YHJSScreen.prototype.fyplay = function () {
            egret.clearTimeout(this.timeout3);
            this.timeout3 = null;
            var ef = new mx.GeneralEffect("yhfyin");
            ef.change_framerate(24, 1);
            ef.horizontalCenter = 0;
            ef.verticalCenter = 110;
            ef.set_event("fy_over");
            ef.addEventListener("fy_over", this.fy_over, this);
            this.mc_g.addChild(ef);
        };
        YHJSScreen.prototype.weiba_play = function (name, pos_x, pos_y) {
            var armature = mx.TweenTool.getInstance().get_dragon(name);
            this.dragon_g.addChild(armature.display);
            armature.display.x = pos_x;
            armature.display.y = pos_y;
            armature.display.scaleX = armature.display.scaleY = 0.52 * 1.5;
            armature.animation.timeScale = 1;
            armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.weiba_loop, this);
            armature.animation.play("zding", 0);
            armature.display.visible = false;
            name == "nanhu9" ? this.weiba_nan = armature : this.weiba_nv = armature;
            this.armature_arr.push(armature);
            var idx1 = this.dragon_g.getChildIndex(name == "nanhu9" ? this.huyao_nan.display : this.huyao_nv.display);
            var idx2 = this.dragon_g.getChildIndex(name == "nanhu9" ? this.weiba_nan.display : this.weiba_nv.display);
            if (idx1 < idx2) {
                this.dragon_g.setChildIndex(name == "nanhu9" ? this.huyao_nan.display : this.huyao_nv.display, idx2);
                this.dragon_g.setChildIndex(name == "nanhu9" ? this.weiba_nan.display : this.weiba_nv.display, idx1);
            }
        };
        YHJSScreen.prototype.dragon_play = function (name, pos_x, pos_y, speed, playtime, event, scale, playName) {
            if (speed === void 0) { speed = 1; }
            if (playtime === void 0) { playtime = 0; }
            if (event === void 0) { event = ""; }
            if (scale === void 0) { scale = 1; }
            if (playName === void 0) { playName = ""; }
            var armature = mx.TweenTool.getInstance().get_dragon(name);
            this.dragon_g.addChild(armature.display);
            armature.display.x = pos_x;
            armature.display.y = pos_y;
            armature.display.scaleX = armature.display.scaleY = scale * 1.5;
            armature.animation.timeScale = 1;
            armature.animation.play(playName, playtime);
            this.armature_arr.push(armature);
        };
        YHJSScreen.prototype.weiba_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.weiba_nan : this.weiba_nv;
            switch (this.weiba_event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    //obj.animation.stop();
                    break;
            }
            this.weiba_event = "";
        };
        YHJSScreen.prototype.huyao_loop = function (evt) {
            var obj = this.huyao_sex == 'nanhu' ? this.huyao_nan : this.huyao_nv;
            switch (this.event) {
                case "cxian_over":
                    //出现后转站定
                    obj.animation.play("zding", 0);
                    break;
                case "xshi_over":
                    obj.display.visible = false;
                    obj.animation.play("zding", 0);
                    // obj.animation.stop();
                    break;
            }
            this.event = "";
        };
        Object.defineProperty(YHJSScreen.prototype, "proxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        YHJSScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (this.touch_stop)
                return;
            switch (e.currentTarget) {
                case view.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.WxActyScreen.S_NAME);
                    break;
                case view.ckxtong_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XueTongAlert.S_NAME,
                        "param": {
                            "mid": 307,
                        },
                    });
                    break;
                case view.rhjfeng_b:
                    view.sming_g.visible = true;
                    //facade.sendNotification(MX_NOTICE.POP_VIEW, {"name": JCFYView.S_NAME});
                    break;
                case view.xqclose_b:
                    view.sming_g.visible = false;
                    break;
                case view.hqfshen_b:
                    // if(view.hqfshen_b.res_name == 'hqfshenhse_png') return;
                    // view.fshen_g.visible = true;
                    break;
                case view.fsclose_b:
                    view.fshen_g.visible = false;
                    break;
                case view.qwckan_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_INIT_SKILL,
                    });
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PACK_TYPE_ITEM,
                        "type": "1|2|3|4|5|6"
                    });
                    //去侍从培养
                    break;
                case view.lqhyao_b:
                    var gameProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                    if (gameProxy.huyao < 8) {
                        view.rect_bg.touchEnabled = true;
                        view.sming2_p.visible = !view.sming2_p.visible;
                    }
                    else {
                        this.proxy.huyao_final_award_type = 1;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HUYAO_FINAL_AWARD,
                            "type": 1 //最终
                        });
                    }
                    break;
                case view.rect_bg:
                    view.sming2_p.visible = false;
                    view.rect_bg.touchEnabled = false;
                    break;
            }
        };
        YHJSScreen.prototype.fyin_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (this.touch_stop)
                return;
            var fy_day = 0;
            if (view.sming_g.visible || view.fshen_g.visible) {
                return;
            }
            switch (e.currentTarget) {
                case view.fy1_b:
                    fy_day = 1;
                    break;
                case view.fy2_b:
                    fy_day = 2;
                    break;
                case view.fy3_b:
                    fy_day = 3;
                    break;
                case view.fy4_b:
                    fy_day = 4;
                    break;
                case view.fy5_b:
                    fy_day = 5;
                    break;
            }
            var gameProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (gameProxy.huyao == 8) {
                //hd027
                var jjue_param = {
                    "name": mx.AlertView.S_NAME,
                    "param": {
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": mx.AlertView.S_NAME,
                        "param": mx.Lang.hd043,
                    }
                };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, jjue_param);
                //facade.sendNotification(MX_NOTICE.SHOW_TOP_UI, {"text" : Lang.hd026});
                return;
            }
            if (fy_day > gameProxy.huyao) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.yhu002, fy_day) });
                return;
            }
            this.proxy.fy_day = fy_day;
            //打开avg
            var fy_avg = egret.localStorage.getItem("fy_avg" + this.proxy.fy_day);
            if (!fy_avg || fy_avg == "") {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.AVGView.S_NAME,
                    "param": {
                        "type": "huyao",
                        "day": this.proxy.fy_day
                    }
                });
            }
            else if (fy_avg = 'play') {
                if (fy_day == 2) {
                    this.proxy.huyao_final_award_type = 2;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HUYAO_FINAL_AWARD,
                        "type": 2 //分身
                    });
                }
                else {
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_HUYAO_DAY_DATA,
                        "kaiqi": fy_day
                    });
                }
            }
        };
        YHJSScreen.prototype.ts_click = function (e) {
            var view = this;
            view.rect_bg.touchEnabled = true;
            var jd = 1, left = 0;
            switch (e.currentTarget) {
                case view.ts1:
                    jd = 1;
                    left = 22.5;
                    break;
                case view.ts2:
                    jd = 2;
                    left = 135;
                    break;
                case view.ts3:
                    jd = 3;
                    left = 248;
                    break;
                case view.ts4:
                    jd = 4;
                    left = 360;
                    break;
            }
        };
        YHJSScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            egret.clearTimeout(this.timeout);
            this.timeout = null;
            egret.clearTimeout(this.timeout2);
            this.timeout2 = null;
            egret.clearTimeout(this.timeout3);
            this.timeout3 = null;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckxtong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.rhjfeng_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hqfshen_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xqclose_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fsclose_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.qwckan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.lqhyao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            for (var i = 1; i <= 4; ++i) {
                view["ts" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ts_click, this);
            }
            view.rect_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            for (var i = 1; i <= 5; ++i) {
                view["fy" + i + "_b"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fyin_click, this);
            }
            for (var i = 0; i < this.mc_g.numChildren; i++) {
                var ef = this.mc_g.getChildAt(i);
                if (ef) {
                    ef.on_remove();
                }
                ef = null;
            }
            for (var i = 1; i <= 5; i++) {
                var ef = this["fy" + i + "_g"].getChildByName("fyzquan");
                if (ef) {
                    ef.on_remove();
                }
                ef = null;
            }
            for (var i in this.tween_arr) {
                this.tween_arr[i] = null;
            }
            egret.Tween.removeTweens(this.mc_g);
            egret.Tween.removeTweens(this.top_g);
            if (this.huyao_nan) {
                egret.Tween.removeTweens(this.huyao_nan.display);
                egret.Tween.removeTweens(this.huyao_nv.display);
                egret.Tween.removeTweens(this.weiba_nan.display);
                egret.Tween.removeTweens(this.weiba_nv.display);
                egret.Tween.removeTweens(this.display_g);
                for (var i in this.armature_arr) {
                    dragonBones.WorldClock.clock.remove(this.armature_arr[i]);
                    this.armature_arr[i].animation.stop();
                    if (this.dragon_g.getChildIndex(this.armature_arr[i].display) > -1) {
                        this.dragon_g.removeChild(this.armature_arr[i].display);
                    }
                    this.armature_arr[i] = null;
                }
                dragonBones.WorldClock.clock.clear();
                this.huyao_nan = null;
                this.huyao_nv = null;
                this.weiba_nan = null;
                this.weiba_nv = null;
                mx.ApplicationFacade.getInstance().removeMediator(mx.YHJSScreenMediator.NAME);
            }
        };
        YHJSScreen.prototype.fresh_time = function () {
            var view = this;
            var cold = this.proxy.yhu_res;
            if (cold > 86400) {
                cold -= 86400;
            }
            var time = mx.Tools.format_second2(cold);
            var facade = mx.ApplicationFacade.getInstance();
            var gameProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (gameProxy.huyao < 8) {
                view.time_t.text = "解封剩余时间：" + time;
                view.time_t2.text = time + "后可领取";
            }
            else {
                view.time_t.text = "领奖剩余时间：" + time;
                view.time_t2.text = time + "后结束,请及时领取";
            }
        };
        YHJSScreen.prototype.fresh_jindu = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.ActyProxy.NAME));
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            for (var i = 1; i <= 5; ++i) {
                var ts = proxy.get_hy_huodong_ts_day(i);
                var complete = proxy.get_hy_complete("day", i);
                view["fy" + i + "_b"].set_tsres(gproxy.huyao >= Number(i) ? (ts ? "tishi_png" : (complete ? null : "tishi3_png")) : null, { "right": i == 2 ? 10 : -10, "top": 0 });
            }
            //第二天特殊处理下
            var gameProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (this.proxy.day2_lq) {
                view.hqfshen_b.visible = false;
                if (this.day2_arm) {
                    dragonBones.WorldClock.clock.remove(this.day2_arm);
                    this.day2_arm.animation.stop();
                    this.fy2_g.removeChild(this.day2_arm.display);
                    this.day2_arm = null;
                }
            }
            else {
                view.hqfshen_b.set_ssres(gameProxy.huyao >= 2 ? "hqfshen_png" : "hqfshenhse_png");
                var armature = mx.TweenTool.getInstance().get_dragon("hyfytbiao");
                this.fy2_g.addChild(armature.display);
                armature.display.x = 105;
                armature.display.y = 85;
                armature.display.name = "hyfytbiao";
                armature.display.scaleX = armature.display.scaleY = 1;
                armature.animation.timeScale = 1;
                armature.animation.play("", 0);
                this.armature_arr.push(armature);
                this.day2_arm = armature;
            }
            var ef = view.fy2_g.getChildByName("fyzquan");
            if (ef) {
                ef.horizontalCenter = -2;
            }
            //最终封印
            if (gameProxy.huyao < 8) {
                view.lqhyao_b.set_ssres("lqhyao_png");
            }
            else if (gameProxy.huyao == 8) {
                view.lqhyao_b.set_ssres(this.proxy.daylast_lq ? "lqhyao_png" : "lqhyaohse_png");
            }
            var achieve = this.proxy.fy_lq.length;
            view.jdu_t.textFlow = [
                { "text": "当前进度：", "style": { "textColor": 0xFFFFFF } },
                { "text": achieve + "/100", "style": { "textColor": 0xefce34 } }
            ];
            var id = 0;
            if (achieve < 15) {
                id = 0;
            }
            else if (achieve < 45) {
                id = 1;
            }
            else if (achieve < 75) {
                id = 2;
            }
            else if (achieve < 100) {
                id = 3;
            }
            else {
                id = 4;
            }
            view.cur_mli_t.textFlow = [
                { "text": "当前奖励魂魄数量：", "style": { "textColor": 0xffffff } },
                { "text": this.award_hunpo[id] + "", "style": { "textColor": 0xefce34 } },
                { "text": "     已到达进度：", "style": { "textColor": 0xffffff } },
                { "text": achieve + "%", "style": { "textColor": 0xF12B6D } },
            ];
            var id2 = id + 1;
            if (id2 <= 4) {
                var arr = [0, 15, 45, 75, 100];
                var per2 = arr[id2];
                view.next_mli_t.textFlow = [
                    { "text": "下档奖励魂魄数量：", "style": { "textColor": 0xffffff } },
                    { "text": this.award_hunpo[id2] + "", "style": { "textColor": 0xefce34 } },
                    { "text": "     需进度达到：", "style": { "textColor": 0xffffff } },
                    { "text": per2 + "%", "style": { "textColor": 0xF12B6D } },
                ];
            }
            else {
                view.next_mli_t.textFlow = [
                    { "text": "任务已经全部完成", "style": { "textColor": 0xffffff } },
                ];
            }
            //进度条
            view.jindu_bar.set_res({ "up": "hyjdtdtiao_png", "down": "hyjdtdchen_png" });
            view.jindu_bar.value = Math.min((achieve / 100) * 100, 100);
            //刷新提示
            // for (let i = 1; i <= 4; ++i) {
            //     if (id >= i) {
            //         //view["ts" + i].source = "slts" + i + "hong_png";
            //         view["xx" + i].source = "jddchxin_png";
            //     }
            //     else {
            //         //view["ts" + i].source = "slts" + i + "_png";
            //         view["xx" + i].source = "jdwdchxing_png";
            //     }
            // }
        };
        YHJSScreen.S_NAME = "YHJSScreen";
        return YHJSScreen;
    }(mx.BasicView));
    mx.YHJSScreen = YHJSScreen;
    __reflect(YHJSScreen.prototype, "mx.YHJSScreen");
})(mx || (mx = {}));
//# sourceMappingURL=YHJSScreen.js.map