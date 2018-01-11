/**
 *   @author qianjun
 *   @date 2017.8.23
 *   @desc  Mediator
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
    var ShouChongLoopAlertMediator = (function (_super) {
        __extends(ShouChongLoopAlertMediator, _super);
        function ShouChongLoopAlertMediator(viewComponent) {
            return _super.call(this, ShouChongLoopAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ShouChongLoopAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ShouChongLoopAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        ShouChongLoopAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_view();
                    break;
            }
        };
        ShouChongLoopAlertMediator.NAME = "ShouChongLoopAlertMediator";
        return ShouChongLoopAlertMediator;
    }(puremvc.Mediator));
    mx.ShouChongLoopAlertMediator = ShouChongLoopAlertMediator;
    __reflect(ShouChongLoopAlertMediator.prototype, "mx.ShouChongLoopAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ShouChongLoopAlertMediator.js.map