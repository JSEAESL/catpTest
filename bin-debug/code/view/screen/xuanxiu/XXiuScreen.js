/**
*   @author mx
*   @date 2015.1.3
*   @desc 选秀主界面
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
    var XXiuScreen = (function (_super) {
        __extends(XXiuScreen, _super);
        function XXiuScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuScreen.mx_support = function () {
            return ["assets.xuanxiu", "assets.xx_xxiu2"];
        };
        XXiuScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_xx_ppjz"://选秀-翩翩君子
                    tar = this.ybi_b;
                    break;
                case "s_xx_flmn"://选秀-风流美男
                    tar = this.ybao_b;
                    break;
                // case "s_mt_mr"://京城
                //     tar = this.tabmenu.get_guide_target("s_mt_mr");
                //     break;
                default:
                    break;
            }
            return tar;
        };
        XXiuScreen.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            this.xproxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            var zg = new mx.GeneralEffect("bgmc_2");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.x = 200;
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (gproxy.user_vip >= 11) {
                this.init_mx3();
            }
            else {
                this.init_mx2();
            }
            mx.TweenTool.getInstance().breath_tween(this.ppjz_r);
            mx.TweenTool.getInstance().breath_tween(this.flcj_r, false);
            facade.registerMediator(new mx.XXiuScreenMediator(this));
            var evt = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            switch (this.adata) {
                case "gsws":
                    this.ybs_b.dispatchEvent(evt);
                    break;
                case "flcj":
                    this.ybao_b.dispatchEvent(evt);
                    break;
                case "ppjz":
                    this.ybi_b.dispatchEvent(evt);
                    break;
            }
        };
        XXiuScreen.prototype.back_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
        };
        XXiuScreen.prototype.init_mx3 = function () {
            this.skin.currentState = "mx3";
            this.ybsjg_t.text = "400"; //价格暂定
            this.ybs_b.set_ssres("xxs_png");
            this.ybao_b.set_ssres("xxs_png");
            this.ybi_b.set_ssres("xxs_png");
            mx.TweenTool.getInstance().breath_tween(this.gsws_r);
        };
        XXiuScreen.prototype.init_mx2 = function () {
            this.skin.currentState = "mx2";
            this.ybao_b.set_ssres("lrxxaniu_png");
            this.ybi_b.set_ssres("lrxxaniu_png");
        };
        XXiuScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.ppjz_r);
            egret.Tween.removeTweens(this.flcj_r);
            if (this.gsws_r) {
                egret.Tween.removeTweens(this.gsws_r);
            }
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.XXiuScreenMediator.NAME);
        };
        XXiuScreen.prototype.fresh_view = function () {
            this.fresh_ybao();
            this.fresh_yinbi();
            this.fresh_time();
            var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
            gproxy.set_tishi('xuxiu', this.ybts_p.visible || this.ybits_p.visible);
        };
        XXiuScreen.prototype.fresh_ybao = function () {
            var view = this;
            if (this.xproxy.ybcd > 0) {
                view.ybjg_t.text = "288";
                view.ybjg_t.textColor = 0xffffff;
                view.ybts_p.visible = false;
                this.fresh_yb = true;
                this.bj_t.visible = this.bj_xian.visible = (this.xproxy.half == 1);
            }
            else {
                view.ybjg_t.text = mx.Lang.p0023;
                view.ybjg_t.textColor = 0x83FE00;
                view.ybts_p.visible = true;
                this.fresh_yb = false;
                this.bj_t.visible = this.bj_xian.visible = false;
            }
            var gproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            if (!this.xproxy.xxrecord.diamond || Number(this.xproxy.xxrecord.diamond) == 0) {
                if (gproxy.user_vip >= 11) {
                    this.shilian_p.source = "scbsscong3_png";
                }
                else {
                    this.shilian_p.source = "scbsscong2_png";
                }
            }
            else if (this.xproxy.xxrecord.Tendiamond && Number(this.xproxy.xxrecord.Tendiamond) > 0) {
                if (gproxy.user_vip >= 11) {
                    this.shilian_p.source = "slbdscsren_png";
                }
                else {
                    this.shilian_p.source = "slbssclren_png";
                }
            }
            else {
                if (gproxy.user_vip >= 11) {
                    this.shilian_p.source = "scs_png";
                }
                else {
                    this.shilian_p.source = "scssce_png";
                }
            }
        };
        XXiuScreen.prototype.fresh_yinbi = function () {
            var view = this;
            var xproxy = this.xproxy;
            view.ybimf_bt.text = xproxy.ybimf + "";
            view.ybijg_t.textColor = 0xffffff;
            if (xproxy.ybimf > 0) {
                if (xproxy.ybicd > 0) {
                    view.ybijg_t.text = "10000";
                    view.ybits_p.visible = false;
                    this.fresh_ybi = true;
                }
                else {
                    view.ybijg_t.text = mx.Lang.p0023;
                    view.ybijg_t.textColor = 0x83FE00;
                    view.ybits_p.visible = true;
                    view.ybicd_t.text = mx.Lang.xx004;
                    this.fresh_ybi = false;
                }
            }
            else {
                view.ybijg_t.text = "10000";
                view.ybits_p.visible = false;
                view.ybicd_t.text = mx.Lang.xx005;
                this.fresh_ybi = false;
            }
        };
        XXiuScreen.prototype.fresh_time = function () {
            var view = this;
            var hproxy = this.xproxy;
            //免费元宝倒计时
            if (hproxy.ybcd > 0) {
                view.ybts_p.visible = false;
            }
            else if (this.fresh_yb) {
                this.fresh_ybao();
            }
            //免费银币倒计时
            if (hproxy.ybicd > 0) {
                view.ybicd_t.textFlow = this.get_time_flow(mx.Tools.format_second(hproxy.ybicd));
                view.ybits_p.visible = false;
                if (hproxy.ybimf == 0) {
                    view.ybicd_t.text = mx.Lang.xx005;
                }
            }
            else if (this.fresh_ybi) {
                this.fresh_yinbi();
            }
        };
        XXiuScreen.prototype.get_time_flow = function (time) {
            return [
                { "text": time + mx.Lang.xx003, "style": { "textColor": 0xffffff } }
            ];
        };
        XXiuScreen.S_NAME = "XXiuScreen";
        return XXiuScreen;
    }(mx.BasicView));
    mx.XXiuScreen = XXiuScreen;
    __reflect(XXiuScreen.prototype, "mx.XXiuScreen");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuScreen.js.map