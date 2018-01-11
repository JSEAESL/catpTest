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
 * @date 2017.9.21
 * 百花仙子选秀
 */
var mx;
(function (mx) {
    var ActyBaiHuaXXiuAlert = (function (_super) {
        __extends(ActyBaiHuaXXiuAlert, _super);
        function ActyBaiHuaXXiuAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyBaiHuaXXiuAlert.mx_support = function () {
            return ["assets.acty_lhy_xxiu"];
        };
        ActyBaiHuaXXiuAlert.prototype.init_view_by_type = function () {
            var cd = this.adata;
            this.init_flcj();
            this.ten_t.text = "" + cd.ten;
            this.award_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this); //说明
            this.ten_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this); //十连
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ActyBaiHuaXXiuAlertMediator(this));
            mx.TweenTool.getInstance().breath_tween(this.avatar_p);
            this.center_p.visible = this.flcj_bt.visible = false;
            this.shilian_p.source = "bhtshi_png";
        };
        ActyBaiHuaXXiuAlert.prototype.init_flcj = function () {
            this.skin.currentState = "flcj";
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            var bz = Number(proxy.xxrecord.bizhong);
            this.flcj_bt.text = (9 - bz) % 10 + "";
            if (bz == 9) {
                this.center_p.source = "bcbdscong_png";
                this.flcj_bt.visible = false;
            }
            //是否半价
            if (proxy.ybcd > 0) {
                this.bj_t.visible = this.bj_ts.visible = this.bj_xian.visible = (proxy.half == 1);
            }
            this.init_ppfl();
        };
        ActyBaiHuaXXiuAlert.prototype.init_ppfl = function () {
            this.fresh_free();
            this.fresh_time();
        };
        ActyBaiHuaXXiuAlert.prototype.fresh_free = function () {
            var view = this;
            var cd = view.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            switch (cd.type) {
                case "flcj"://风流美男
                    if (hproxy.ybcd > 0) {
                        view.one_t.text = "288";
                        view.one_t.textColor = 0xffffff;
                        view.mfts_p.visible = false;
                        this.fresh_yb = true;
                    }
                    else {
                        view.one_t.text = mx.Lang.p0023;
                        view.one_t.textColor = 0x4bd43c;
                        view.mfts_p.visible = true;
                        this.fresh_yb = false;
                    }
                    break;
                default:
                    break;
            }
        };
        ActyBaiHuaXXiuAlert.prototype.fresh_time = function () {
            var view = this;
            var cd = view.adata;
            var facade = mx.ApplicationFacade.getInstance();
            var hproxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            switch (cd.type) {
                case "flcj"://风流美男//免费元宝倒计时
                    if (hproxy.ybcd > 0) {
                        view.mfts_p.visible = false;
                    }
                    else if (this.fresh_yb) {
                        this.fresh_free();
                    }
                    break;
                default:
                    break;
            }
        };
        ActyBaiHuaXXiuAlert.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case view.ok_b://买一次
                    this.check_num(true);
                    break;
                case view.ten_b://买十次
                    this.check_num(false);
                    break;
                case view.award_b://点击奖励一览/游戏说明按钮
                    if (this.adata.type != "gsws") {
                        var p_d = {
                            "name": mx.XXiuAwardAlert.S_NAME,
                            "param": {
                                "type": this.adata.type,
                                "yincang": true,
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ActyBaiHuaXXiuAlert.S_NAME);
                    break;
            }
        };
        ActyBaiHuaXXiuAlert.prototype.check_num = function (isone) {
            var facade = mx.ApplicationFacade.getInstance();
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var c_num = dproxy.get_currency(this.adata.type == "ppjz" ? "ybi" : "ybao");
            var cd = this.adata.param;
            if (isone) {
                var proxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
                if (c_num < cd.one && (proxy.ybimf <= 0 || proxy.ybicd > 0)) {
                    this.show_recharge();
                }
                else {
                    switch (this.adata.type) {
                        case "ppjz"://银币
                            cd.type = 3;
                            break;
                        case "flcj"://元宝
                            cd.type = 1;
                            break;
                        default:
                            break;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                }
            }
            else {
                if (c_num < cd.ten) {
                    this.show_recharge();
                }
                else {
                    switch (this.adata.type) {
                        case "ppjz"://银币
                            cd.type = 4;
                            break;
                        case "flcj"://元宝
                            cd.type = 2;
                            break;
                        case "gsws"://大量元宝
                            cd.type = 1;
                            break;
                        default:
                            break;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                }
            }
        };
        ActyBaiHuaXXiuAlert.prototype.show_recharge = function () {
            var a_d = {
                "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                "param": mx.Lang.a0006
            };
            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        ActyBaiHuaXXiuAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            mx.ApplicationFacade.getInstance().removeMediator(mx.ActyBaiHuaXXiuAlertMediator.NAME);
            view.ten_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view);
            view.award_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, view.btn_click, view); //说明
            egret.Tween.removeTweens(view.avatar_p);
        };
        ActyBaiHuaXXiuAlert.S_NAME = "ActyBaiHuaXXiuAlert";
        return ActyBaiHuaXXiuAlert;
    }(mx.AlertView));
    mx.ActyBaiHuaXXiuAlert = ActyBaiHuaXXiuAlert;
    __reflect(ActyBaiHuaXXiuAlert.prototype, "mx.ActyBaiHuaXXiuAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ActyBaiHuaXXiuAlert.js.map