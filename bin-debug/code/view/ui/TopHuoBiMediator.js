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
 * mx
 * 2016/08/21
 */
var mx;
(function (mx) {
    var TopHuoBiMediator = (function (_super) {
        __extends(TopHuoBiMediator, _super);
        function TopHuoBiMediator(viewComponent) {
            var _this = _super.call(this, TopHuoBiMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(TopHuoBiMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        TopHuoBiMediator.prototype.onRemove = function () {
            var view = this.view;
            view.add_yb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_jb_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_tl_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TopHuoBiMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CURRENCY_CHANGED
                // MX_NOTICE.FRESH_VIP,
                // MX_NOTICE.FRESH_AVATAR,
                // MX_NOTICE.FRESH_TIME
            ];
        };
        TopHuoBiMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    var ntype = notification.getType();
                    this.set_currency_text(ntype);
                    break;
                default:
                    break;
            }
        };
        TopHuoBiMediator.prototype.set_currency_text = function (type) {
            var view = this.view;
            var dproxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (type) {
                case "ybao"://元宝
                    view.yuanbao_t.text = mx.Tools.num2str(dproxy.get_currency("ybao"));
                    break;
                case "tili"://体力
                    view.tili_t.text = dproxy.get_currency("tili") + "/" + (60 + gProxy.user_lv);
                    break;
                case "ybi":
                    view.yinbi_t.text = mx.Tools.num2str(dproxy.get_currency("ybi"));
                    break;
                default:
                    break;
            }
        };
        TopHuoBiMediator.prototype.init_view = function () {
            var view = this.view;
            this.set_currency_text("ybao");
            this.set_currency_text("ybi");
            this.set_currency_text("tili");
            this.set_currency_text("uexp");
            view.add_yb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_jb_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_tl_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TopHuoBiMediator.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var view = this.view;
            switch (evt.currentTarget) {
                case view.add_yb_b://购买元宝
                    this.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                    break;
                case view.add_jb_b://购买银币
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "ybi");
                    break;
                case view.add_tl_b://购买体力
                    this.sendNotification(mx.MX_NOTICE.SHOW_BUY_TILI, "tili");
                    break;
                default:
                    break;
            }
        };
        TopHuoBiMediator.NAME = "TopHuoBiMediator";
        return TopHuoBiMediator;
    }(puremvc.Mediator));
    mx.TopHuoBiMediator = TopHuoBiMediator;
    __reflect(TopHuoBiMediator.prototype, "mx.TopHuoBiMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TopHuoBiMediator.js.map