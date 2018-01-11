/**
 *   @author cy
 *   @date 2017.11.29
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
    var ActyCYGGAwardAlertMediator = (function (_super) {
        __extends(ActyCYGGAwardAlertMediator, _super);
        function ActyCYGGAwardAlertMediator(viewComponent) {
            return _super.call(this, ActyCYGGAwardAlertMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(ActyCYGGAwardAlertMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        ActyCYGGAwardAlertMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        ActyCYGGAwardAlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var str;
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.show_ef();
                    break;
            }
        };
        ActyCYGGAwardAlertMediator.NAME = "ActyCYGGAwardAlertMediator";
        return ActyCYGGAwardAlertMediator;
    }(puremvc.Mediator));
    mx.ActyCYGGAwardAlertMediator = ActyCYGGAwardAlertMediator;
    __reflect(ActyCYGGAwardAlertMediator.prototype, "mx.ActyCYGGAwardAlertMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyCYGGAwardAlertMediator.js.map