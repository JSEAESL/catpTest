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
 * @cy/2016.12.19
 *  首冲alert
 */
var mx;
(function (mx) {
    var ShouChongAlert = (function (_super) {
        __extends(ShouChongAlert, _super);
        function ShouChongAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShouChongAlert.mx_support = function () {
            return ["assets.schong_first", "assets.zn54301_d"];
        };
        ShouChongAlert.prototype.init_view_by_type = function () {
            this.qwcz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_recharge, this);
            this.ckxtong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.ckjqing_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_avg, this);
            this.cloth_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.lihui_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.avatar_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.ltp_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.syd_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            //龙骨
            if (mx.Tools.check_drgon()) {
                var armature = mx.TweenTool.getInstance().get_dragon("zn54301", 2);
                armature.display.x = 150;
                armature.display.y = 350;
                armature.display.scaleX = 0.83;
                armature.display.scaleY = 0.83;
                armature.animation.timeScale = 0.7;
                armature.animation.play();
                this.ef_g.addChild(armature.display);
                this.armature = armature;
            }
            else {
                var p = new eui.Image("scjtryu_png");
                this.ef_g.addChild(p);
            }
            this.fresh_view();
        };
        ShouChongAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            switch (Number(gproxy.user_sc)) {
                case 0:
                    this.scwa_p.source = "scwa1_png";
                    this.lbnrong_p.source = "sclbnrong_png";
                    this.qwcz_b.set_ssres("scqwczhi_png");
                    break;
                case 1:
                    this.scwa_p.source = "scwa1_png";
                    this.lbnrong_p.source = "sclbnrong_png";
                    this.qwcz_b.set_ssres("sclqjli_png");
                    break;
                case 3:
                    this.scwa_p.source = "scwa2_png";
                    this.lbnrong_p.source = "sclbnrong2_png";
                    this.qwcz_b.set_ssres("sclqjli_png");
                    break;
            }
        };
        ShouChongAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.qwcz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_recharge, this);
            this.ckxtong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.ckjqing_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_avg, this);
            this.cloth_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.lihui_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.avatar_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.ltp_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            this.syd_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_tip, this);
            if (mx.Tools.check_drgon() && this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.animation.stop();
                this.ef_g.removeChild(this.armature.display);
                this.armature = null;
            }
        };
        ShouChongAlert.prototype.show_avg = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "type": "ry"
                }
            });
        };
        ShouChongAlert.prototype.show_recharge = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            switch (Number(gproxy.user_sc)) {
                case 0://去充值
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                case 1: //伴读-玉娇龙妃子
                case 3://侍从-玉娇龙侍从
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_LINGQU_SC });
                    break;
                default:
                    break;
            }
            this.close_self();
        };
        ShouChongAlert.prototype.show_tip = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.cloth_rect:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ClothDetailView.S_NAME,
                        "param": {
                            "id": 1022
                        }
                    });
                case this.ckxtong_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.XueTongAlert.S_NAME,
                        "param": {
                            "mid": 303,
                        },
                    });
                    break;
                case this.lihui_rect:
                case this.avatar_rect:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HeroInfoView.S_NAME,
                        "param": {
                            "hero": 303,
                            "type": "not",
                        },
                    });
                    break;
                case this.ltp_rect:
                case this.syd_rect:
                    this.show_ui_tip(evt.currentTarget);
                    break;
            }
        };
        ShouChongAlert.prototype.show_ui_tip = function (view) {
            var point = this.ltp_rect.parent.localToGlobal(view.x, view.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": view.width,
                "h": view.height,
                "id": view == this.ltp_rect ? 2000 : 2018,
                "type": 4,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        ShouChongAlert.prototype.btn_click = function (evt) {
            switch (evt.currentTarget) {
                case this.exit_b:
                    this.close_self();
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CHECK_MAIN_ALERT); //主动关闭时检查下一个弹窗
                    break;
            }
        };
        ShouChongAlert.S_NAME = "ShouChongAlert";
        return ShouChongAlert;
    }(mx.AlertView));
    mx.ShouChongAlert = ShouChongAlert;
    __reflect(ShouChongAlert.prototype, "mx.ShouChongAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShouChongAlert.js.map