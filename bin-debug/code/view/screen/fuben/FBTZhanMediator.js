/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc 副本挑战弹窗
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
    var FBTZhanMediator = (function (_super) {
        __extends(FBTZhanMediator, _super);
        function FBTZhanMediator(viewComponent) {
            return _super.call(this, FBTZhanMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(FBTZhanMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        FBTZhanMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.CURRENCY_CHANGED,
                mx.MX_NOTICE.FRESH_CPOP
            ];
        };
        FBTZhanMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var type = notification.getType();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.CURRENCY_CHANGED:
                    if (type == "tili") {
                        view.fresh_tili();
                    }
                    break;
                case mx.MX_NOTICE.FRESH_CPOP:
                    if (type == mx.FBTZhanAlert.S_NAME) {
                        view.fresh_cview();
                    }
                    break;
                default:
                    break;
            }
        };
        FBTZhanMediator.NAME = "FBTZhanMediator";
        return FBTZhanMediator;
    }(puremvc.Mediator));
    mx.FBTZhanMediator = FBTZhanMediator;
    __reflect(FBTZhanMediator.prototype, "mx.FBTZhanMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FBTZhanMediator.js.map