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
/**
 * @author cy
 * @date 2017.9.20
 * 百花仙子弹窗
 */
var mx;
(function (mx) {
    var ActyBaiHuaMainAlert = (function (_super) {
        __extends(ActyBaiHuaMainAlert, _super);
        function ActyBaiHuaMainAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.a_num = 1;
            return _this;
        }
        ActyBaiHuaMainAlert.mx_support = function () {
            return ["assets.acty_hero"];
        };
        ActyBaiHuaMainAlert.prototype.init_view_by_type = function () {
            var view = this;
            view.hxjq_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.xtfx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.scfx_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tg_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.ActyBaiHuaMainAlertMediator(this));
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var time1 = aproxy.acty_time[19].start;
            var time2 = aproxy.acty_time[19].end;
            view.time_t.text = mx.Tools.format_time(time1, "yrsfm", 2, true) + " - " + mx.Tools.format_time(time2, "yrsfm", 2, true);
            view.avatar1_g.alpha = view.avatar2_g.alpha = 0;
            view.avatar1_g.left = -17;
            view.avatar2_g.right = -17;
            egret.Tween.get(view.avatar1_g, { "loop": false }).wait(300).to({ "left": 10, "alpha": 1 }, 500);
            egret.Tween.get(view.avatar2_g, { "loop": false }).wait(300).to({ "right": 32, "alpha": 1 }, 500);
            mx.TweenTool.getInstance().breath_tween(this.avatar1_p);
            mx.TweenTool.getInstance().breath_tween(this.avatar2_p, false);
            var zg = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 0.8;
            zg.x = zg.y = 200;
            var zg2 = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg2);
            zg2.play_by_times(-1);
            zg2.scaleX = -0.5;
            zg2.scaleY = 0.5;
            zg2.x = 300;
            zg2.y = 200;
            var zg3 = new mx.GeneralEffect("bfudhua");
            this.ef_g.addChild(zg3);
            zg3.play_by_times(-1);
            zg3.scaleX = -0.3;
            zg3.scaleY = 0.3;
            zg3.x = 330;
            zg3.y = 230;
            var zg4 = new mx.GeneralEffect("linzhongguang");
            this.ef_g.addChild(zg4);
            zg4.play_by_times(-1);
            zg4.x = 230;
            zg4.y = 600;
            zg4.scaleX = zg4.scaleY = 2;
            mx.Tools.check_user_locals(mx.MX_COMMON.MX_XXG_LOG);
            this.check_longgu(1);
            this.fresh_view();
        };
        ActyBaiHuaMainAlert.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            var pproxy = facade.retrieveProxy(mx.PackProxy.NAME);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
        };
        ActyBaiHuaMainAlert.prototype.fun_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            switch (e.currentTarget) {
                case view.hxjq_b://剧情.
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "type": "xxg",
                        }
                    });
                    break;
                case view.xtfx_b://血统分析
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyBaiHuaXTFX.S_NAME, "param": 57 });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ActyBaiHuaMainAlert.S_NAME);
                    break;
                case view.scfx_b://侍从分析
                    var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
                    var cd = hproxy.get_hero_by_mid(57); //
                    var param = {
                        "hero": cd ? cd : 57,
                        "type": cd ? 'haveget' : 'not'
                    };
                    if (cd) {
                        param.shuxing = true;
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroInfoView.S_NAME,
                        "param": param,
                    });
                    break;
                case view.fun_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.ActyXXGScreen.S_NAME);
                    break;
                case view.tg_b:
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_TEGONG_SHOP, "act_id": 19 });
                    break;
            }
        };
        ActyBaiHuaMainAlert.prototype.check_longgu = function (flag) {
            var facade = mx.ApplicationFacade.getInstance();
            if (flag) {
                this.a_num = 0;
                var armature = mx.TweenTool.getInstance().get_dragon("xtfxtbiao");
                armature.display.x = 27;
                armature.display.y = 26;
                armature.animation.play();
                armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                this.xtfx_g.addChild(armature.display);
                armature.display.scaleX = armature.display.scaleY = 0.67;
                this.armature2 = armature;
            }
            else {
                if (this.armature2) {
                    dragonBones.WorldClock.clock.remove(this.armature2);
                    this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
                }
            }
        };
        ActyBaiHuaMainAlert.prototype.com_loop = function () {
            dragonBones.WorldClock.clock.remove(this.armature2);
            this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            this.xtfx_g.removeChildAt(this.xtfx_g.numChildren - 1);
            this.check_longgu(1);
        };
        ActyBaiHuaMainAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hxjq_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.xtfx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.scfx_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.tg_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyBaiHuaMainAlertMediator.NAME);
            if (this.armature2) {
                dragonBones.WorldClock.clock.remove(this.armature2);
                this.armature2.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.com_loop, this);
            }
            egret.Tween.removeTweens(this.avatar1_p);
            egret.Tween.removeTweens(this.avatar2_p);
            egret.Tween.removeTweens(this.avatar1_g);
            egret.Tween.removeTweens(this.avatar2_g);
        };
        ActyBaiHuaMainAlert.S_NAME = "ActyBaiHuaMainAlert";
        return ActyBaiHuaMainAlert;
    }(mx.AlertView));
    mx.ActyBaiHuaMainAlert = ActyBaiHuaMainAlert;
    __reflect(ActyBaiHuaMainAlert.prototype, "mx.ActyBaiHuaMainAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaMainAlert.js.map