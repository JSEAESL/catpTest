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
 * 血统分析弹窗
 */
var mx;
(function (mx) {
    var ActyBaiHuaXTFX = (function (_super) {
        __extends(ActyBaiHuaXTFX, _super);
        function ActyBaiHuaXTFX() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 0; //0魂魄不够未获得1魂魄够未獲得2已獲得未收入3已收入
            return _this;
        }
        ActyBaiHuaXTFX.mx_support = function () {
            return ["assets.acty_xtfx", "api.XUETONGTIP"];
        };
        ActyBaiHuaXTFX.prototype.init_view_by_type = function () {
            var view = this;
            view.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.xt_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActyBaiHuaXTFXMediator(this));
            this.fresh_view();
        };
        ActyBaiHuaXTFX.prototype.fresh_view = function (data) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var hproxy = facade.retrieveProxy(mx.HeroProxy.NAME);
            var pproxy = facade.retrieveProxy(mx.PackProxy.NAME);
            view.avatar_p.source = "xtfxlhui_png";
            mx.TweenTool.getInstance().breath_tween(this.avatar_p);
            this.bg.source = "s1706_jpg";
            var have_num = pproxy.get_item_num(614);
            var need_num = 80;
            var info = hproxy.get_hero_by_mid(57); //
            var res;
            if (info) {
                this.jindu_p.visible = this.jindu_sp.visible = this.jindu_g.visible = false;
                this.type = aproxy.acty_hero_flag ? 3 : 2;
                res = "xfyrgzhong_png";
            }
            else {
                this.type = have_num >= need_num ? 1 : 0;
                res = "xxgsrgzhong_png";
            }
            view.fun_b.set_ssres(res);
            view.jindu_sp.minimum = 0; //定义最小值
            view.jindu_sp.maximum = need_num;
            var sli_obj = {
                "up": "hxjdtiao_png",
                "down": "hxjdtdchen_png",
                "middle": "",
            };
            view.jindu_sp.set_res(sli_obj);
            view.jindu_sp.init_value(have_num);
            view.has_bt.text = have_num;
            view.all_bt.text = need_num;
            var zg = new mx.GeneralEffect("bfudhua");
            this.g_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1;
            zg.x = 100;
            zg.y = 200;
            var zg2 = new mx.GeneralEffect("bfudhua");
            this.g_g.addChild(zg2);
            zg2.play_by_times(-1);
            zg2.scaleX = -0.8;
            zg2.scaleY = 0.8;
            zg2.x = 290;
            zg2.y = 150;
            var zg3 = new mx.GeneralEffect("bfudhua");
            this.g_g.addChild(zg3);
            zg3.play_by_times(-1);
            zg3.scaleX = -0.6;
            zg3.scaleY = 0.6;
            zg3.x = 320;
            zg3.y = 230;
            if (data && data == "srhg") {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyBaiHuaHD.S_NAME });
            }
        };
        ActyBaiHuaXTFX.prototype.fun_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            if (e.currentTarget == this.xt_rect) {
                var target = this.xt_rect;
                var point = target.parent.localToGlobal(target.x, target.y);
                facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                    "x": point.x,
                    "y": point.y,
                    "w": target.width,
                    "h": target.height,
                    "type": "blood",
                    "wenhua": 12,
                    "daishu": 0,
                });
                return;
            }
            switch (this.type) {
                case 0:
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SCENE_CHANGE,
                        "sdata_ok": mx.ActyXXGScreen.S_NAME,
                        "param": mx.Lang.bhxz01
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case 1:
                    aproxy.get_acty_hero();
                    break;
                case 2:
                case 3:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.h0061 });
                    break;
            }
        };
        ActyBaiHuaXTFX.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ActyBaiHuaXTFX.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ActyBaiHuaMainAlert.S_NAME });
        };
        ActyBaiHuaXTFX.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            view.xt_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.fun_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyBaiHuaXTFXMediator.NAME);
            egret.Tween.removeTweens(this.avatar_p);
        };
        ActyBaiHuaXTFX.S_NAME = "ActyBaiHuaXTFX";
        ActyBaiHuaXTFX.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return ActyBaiHuaXTFX;
    }(mx.AlertView));
    mx.ActyBaiHuaXTFX = ActyBaiHuaXTFX;
    __reflect(ActyBaiHuaXTFX.prototype, "mx.ActyBaiHuaXTFX");
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaXTFX.js.map