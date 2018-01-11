/**
*   @author cy
*   @date 2017.3.30
*   @desc 买月卡彈窗
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
    var BuyYueKaAlert = (function (_super) {
        __extends(BuyYueKaAlert, _super);
        function BuyYueKaAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BuyYueKaAlert.mx_support = function () {
            return ["assets.recharge_yk"];
        };
        BuyYueKaAlert.prototype.init_view_by_type = function () {
            this.buy_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yueka, this);
        };
        BuyYueKaAlert.prototype.buy_yueka = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, BuyYueKaAlert.S_NAME);
            if (gproxy.recharge_yueka >= 331) {
                var a_d2 = {
                    "notice_ok": mx.MX_NOTICE.CHECK_RECHARGE,
                    "sdata_ok": 1,
                    "param": mx.Lang.p0128
                };
                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CHECK_RECHARGE, 1);
            }
        };
        BuyYueKaAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.buy_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy_yueka, this);
        };
        BuyYueKaAlert.S_NAME = "BuyYueKaAlert";
        return BuyYueKaAlert;
    }(mx.AlertView));
    mx.BuyYueKaAlert = BuyYueKaAlert;
    __reflect(BuyYueKaAlert.prototype, "mx.BuyYueKaAlert");
})(mx || (mx = {}));
//# sourceMappingURL=BuyYueKaAlert.js.map