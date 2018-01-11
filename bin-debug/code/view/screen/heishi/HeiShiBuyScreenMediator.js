/**
 @author qianjun
 *   @date 2016.10.9
 *   @desc mediator
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
    var HeiShiBuyScreenMediator = (function (_super) {
        __extends(HeiShiBuyScreenMediator, _super);
        function HeiShiBuyScreenMediator(viewComponent) {
            return _super.call(this, HeiShiBuyScreenMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeiShiBuyScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HeiShiBuyScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_HEISHI_BUY_SCREEN,
                mx.MX_NOTICE.CURRENCY_CHANGED
            ];
        };
        HeiShiBuyScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_HEISHI_BUY_SCREEN:
                    view.show_items();
                    break;
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    view.fresh_hsb();
                    break;
            }
        };
        HeiShiBuyScreenMediator.NAME = "HeiShiBuyScreenMediator";
        return HeiShiBuyScreenMediator;
    }(puremvc.Mediator));
    mx.HeiShiBuyScreenMediator = HeiShiBuyScreenMediator;
    __reflect(HeiShiBuyScreenMediator.prototype, "mx.HeiShiBuyScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiBuyScreenMediator.js.map