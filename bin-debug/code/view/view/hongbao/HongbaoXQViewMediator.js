/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var HongbaoXQViewMediator = (function (_super) {
        __extends(HongbaoXQViewMediator, _super);
        function HongbaoXQViewMediator(viewComponent) {
            return _super.call(this, HongbaoXQViewMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HongbaoXQViewMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HongbaoXQViewMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CPOP,
            ];
        };
        HongbaoXQViewMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var view = this.view;
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CPOP:
                    view.fresh_user_info(data);
                    break;
            }
        };
        HongbaoXQViewMediator.NAME = "HongbaoXQViewMediator";
        return HongbaoXQViewMediator;
    }(puremvc.Mediator));
    mx.HongbaoXQViewMediator = HongbaoXQViewMediator;
    __reflect(HongbaoXQViewMediator.prototype, "mx.HongbaoXQViewMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HongbaoXQViewMediator.js.map